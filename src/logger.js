// logger.js
import fs from 'fs';
import path from 'path';
import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, colorize, timestamp, printf } = format;

// Define logs directory
const logsDir = 'logs';

// Ensure the logs directory exists BEFORE creating the logger
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Define a custom format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logsDir, 'combined.log') }),
  ],
});

// Handle uncaught exceptions
process.on('unhandledRejection', (ex) => {
  logger.error(`Unhandled Rejection: ${ex.message || ex}`);
  process.exit(1);
});


export default logger;
