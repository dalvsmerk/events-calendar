import { ValidationError } from 'joi';
import { isEmpty } from 'lodash';
import { RequestValidation } from '../types';

export default (validation?: RequestValidation) => async (ctx, next) => {
    try {
        if (validation?.params) {
            const result = validation.params.validate(ctx.request.params);

            if (!isEmpty(result.error)) {
                throw result.error;
            }
        }

        if (validation?.payload) {
            const result = validation.payload.validate(ctx.request.body);

            if (!isEmpty(result.error)) {
                throw result.error;
            }
        }

        await next();
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                reason: error.name,
                message: error.message.replace(/"/g, '\''),
            };
        }
        else {
            ctx.status = 500;
            ctx.body = {
                success: false,
                reason: 'InternalError',
                message: (error as Error).message,
            };
        }
    }
};
