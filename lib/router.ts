import compose from 'koa-compose';
import Router from 'koa-router';
import authController from './auth/auth.controller';
import authorise from './middlewares/authorise';
import sugar from './middlewares/sugar';
import validateRequest from './middlewares/validate-request';
import { Controller } from './types';
import usersController from './users/users.controller';

const protectedMiddleware = ctrl => compose([sugar, authorise, validateRequest(ctrl.options?.validation)]);
const publicMiddleware    = ctrl => compose([sugar, validateRequest(ctrl.options?.validation)]);

const makeMiddleware = (ctrl: Controller) =>
    ctrl.visibility === 'protected'
    ? protectedMiddleware(ctrl)
    : publicMiddleware(ctrl);

const register = (router, controller) => {
    controller.forEach(ctrl => {
        router[ctrl.method](ctrl.path, makeMiddleware(ctrl), ctrl.handler);
    });
};

export const registerRoutes = () => {
    const router = new Router().prefix('/api/v1');

    register(router, usersController);
    register(router, authController);

    return router;
};
