import path from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import DailyRotateFile from 'winston-daily-rotate-file';

const myFormat = printf(({ level, message, label, timestamp }) => {
  //date hours minutes seconds calculations
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});
//logger
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'server successfully running!' }),
    timestamp(),
    myFormat,
    // prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'success-%DATE%.log',
      ),
      datePattern: 'YYYY-DD-HH-MM',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
//error logger
const errorLogger = createLogger({
  level: 'warn',
  format: combine(
    label({ label: 'oh sorry baby!try to next time' }),
    timestamp(),
    myFormat,
    // prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'errors-%DATE%.log',
      ),
      datePattern: 'YYYY-DD-HH-MM',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };
