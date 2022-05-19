import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from './clients/logger';
import { config } from './config';
import { registerRoutes } from './router';

export const initialize = async () => {
    const app = new Koa();
    const router = registerRoutes();

    app.use(bodyParser());
    app.use(router.routes());
    app.listen(config.server.port);

    logger.info('Server running on ', config.server.port);
};
