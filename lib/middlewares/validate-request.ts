import { Schema, ValidationError } from 'joi';
import { isEmpty } from 'lodash';
import { RequestValidation } from '../types';

const validate = (value: any, schema?: Schema) => {
    if (!schema) return;

    const result = schema.validate(value);

    if (!isEmpty(result.error)) {
        throw result.error;
    }
};

export default (validation?: RequestValidation) => async (ctx, next) => {
    if (!validation) {
        await next();
        return;
    }

    try {
        validate(ctx.request.query, validation.query);
        validate(ctx.request.params, validation.params);
        validate(ctx.request.body, validation.payload);

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
