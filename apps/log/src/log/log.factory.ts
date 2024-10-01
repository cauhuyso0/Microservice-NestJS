import { transports, format } from 'winston';
import { WinstonModule } from 'nest-winston';

import 'winston-daily-rotate-file';
import { FormatLogger } from './types';

export const LoggerFactory = () => {
  const formatPrint = format.printf(
    ({
      level,
      message,
      context,
      requestId,
      timestamp,
      metadata,
      appName,
    }: FormatLogger) => {
      return `${appName}:::${timestamp}:::${level}:::${context}:::${requestId}:::${message}:::${JSON.stringify(metadata)}`;
    },
  );

  return WinstonModule.createLogger({
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      formatPrint,
    ),
    transports: [
      new transports.Console(),
      new transports.DailyRotateFile({
        dirname: 'logs',
        filename: 'application-%DATE%.error.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        format: format.combine(format.ms(), format.timestamp(), format.json()),
        level: 'error',
      }),
      new transports.DailyRotateFile({
        dirname: 'logs',
        filename: 'application-%DATE%.info.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          formatPrint,
        ),
        level: 'info',
      }),
    ],
  });
};
