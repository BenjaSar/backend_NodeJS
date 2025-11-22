// metrics.js
import client from "prom-client";
import express from "express";
import logger from "./utils/logger.js";

// Create a dedicated registry
const register = new client.Registry();

// Enable default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
const requestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5], // recommended buckets
  registers: [register],
});

const activeRequests = new client.Gauge({
  name: "active_requests",
  help: "Number of active HTTP requests",
  registers: [register],
});

// Middleware
export function metricsMiddleware(req, res, next) {
  const endTimer = requestDuration.startTimer();
  activeRequests.inc();

  res.on("finish", () => {
    endTimer({
      method: req.method,
      route: req.route?.path || req.originalUrl || "unknown",
      status: res.statusCode,
    });
    activeRequests.dec();
  });

  res.on("close", () => {
    if (!res.writableEnded) {
      activeRequests.dec();
    }
  });

  next();
}

// /metrics route
export const metricsRouter = express.Router();

metricsRouter.get("/", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
    logger.info("Metrics collected successfully");
  } catch (err) {
    logger.error(`Error collecting metrics: ${err.message}`);
    res.status(500).end(err.message);
  }
});

// Export registry & metrics (optional)
export { register, requestDuration, activeRequests };
