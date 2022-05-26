import logger from './lib/clients/logger';
import { initialize } from './lib/initialize';

process.on('unhandledRejection', (err: Error) => {
    logger.error({
        ...err,
        message: err.message,
        stack: err.stack,
    });

    process.exit(1);
});

initialize();
