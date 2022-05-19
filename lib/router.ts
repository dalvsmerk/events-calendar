import Router from 'koa-router';
import sugar from './middlewares/sugar';
import validateRequest from './middlewares/validate-request';
import usersController from './users/users.controller';

const register = (router, controller) => {
    controller.forEach(ctrl => {
        router[ctrl.method](ctrl.path, validateRequest(ctrl.options.validation), sugar, ctrl.handler);
    });
};

export const registerRoutes = () => {
    const router = new Router().prefix('/api/v1');

    register(router, usersController);

    return router;
};
