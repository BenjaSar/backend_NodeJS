// logger.js
import fs from 'fs';
import path from 'path';
import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, colorize, timestamp, printf } = format;

// Logs directory - /tmp in production (Vercel serverless)
const logsDir = process.env.NODE_ENV === 'production' ? '/tmp/logs' : 'logs';

// Check if the logs directory exists BEFORE creating the logger
try {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
} catch (err) {
  console.error('Failed to create logs directory:', err.message);

}

// Custom format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const loggerTransports = [new transports.Console()];

//File transports only if directory is writable
try {
  if (fs.existsSync(logsDir)) {
    loggerTransports.push(
      new transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
      new transports.File({ filename: path.join(logsDir, 'combined.log') })
    );
  }
} catch (err) {
  console.error('Failed to initialize file transports:', err.message);
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: loggerTransports,
});

// Handle uncaught exceptions
process.on('unhandledRejection', (ex) => {
  logger.error(`Unhandled Rejection: ${ex.message || ex}`);
  process.exit(1);
});


export default logger;
