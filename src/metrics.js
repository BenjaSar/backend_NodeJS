// metrics.js
import client from 'prom-client';
import express from 'express';
import logger from './logger.js';

// Create metrics
const requestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'status'],
});

const activeRequests = new client.Gauge({
  name: 'active_requests',
  help: 'Number of active requests',
});

// Middleware to record metrics
export function metricsMiddleware(req, res, next) {
  const end = requestDuration.startTimer();
  activeRequests.inc();

  res.on('finish', () => {
    end({ method: req.method, status: res.statusCode });
    activeRequests.dec();
  });

  next();
}

// expose /metrics endpoint
export const metricsRouter = express.Router();

metricsRouter.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
    logger.error(`Error collecting metrics: ${err.message}`);
  }
});

export default client;
