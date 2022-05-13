import Koa from 'koa';
import Router from 'koa-joi-router';
import bodyParser from 'koa-body-parser';
import postUser from './public/user/controllers/post-user';

export const init = (app: Koa) => {
    app.use(bodyParser);

    const router = Router();
    router.prefix('/api');

    const publicRouter = Router();

    publicRouter.route(postUser);

    router.use(
        publicRouter.middleware(),
    );

    app.use(publicRouter.middleware());
};
