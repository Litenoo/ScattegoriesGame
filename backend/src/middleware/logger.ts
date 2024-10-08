import { createLogger, format, transports } from 'winston';
import path from "path";

const logDirectory = path.join(__dirname, "..", "..", 'logs');
const errorLogPath = path.join(logDirectory, 'error.log');
const combinedLogPath = path.join(logDirectory, 'combined.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: errorLogPath, level: 'error' }),
    new transports.File({ filename: combinedLogPath }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
