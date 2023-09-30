import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

//uncaughtException
process.on('uncaughtException', error => {
  errorLogger.error('uncaughtException detected', error);
  process.exit(1);
});
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    logger.info('🎆😍 database connection successfully');
    server = app.listen(config.port, () => {
      logger.info(`listening port on ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('😒 database connection error', error);
  }
  //unhandled rejection error handler
  process.on('unhandledRejection', error => {
    errorLogger.error(error);
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();
//sigterm terminated
process.on('SIGTERM', () => {
  errorLogger.info('sigterm terminated received');
  if (server) {
    server.close();
  }
});
