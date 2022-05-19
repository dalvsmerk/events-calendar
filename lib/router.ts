import Router from 'koa-router';
import { validateRequest } from './middlewares/validation';
import usersController from './users/users.controller';

const register = (router, controller) => {
    controller.forEach(ctrl => {
        router[ctrl.method](ctrl.path, validateRequest(ctrl.options.validation), ctrl.handler);
    });
};

export const registerRoutes = () => {
    const router = new Router().prefix('/api/v1');

    register(router, usersController);

    return router;
};
