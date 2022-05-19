import Joi from 'joi';
import { v4 } from 'uuid';
import { Controller } from '../types';

export default [
    {
        method: 'post',
        path: '/users',
        handler: (ctx) => {
            ctx.status = 201;
            ctx.body = {
                success: true,
                data: {
                    id: v4(),
                    ...ctx.request.body,
                },
            };
        },
        options: {
            description: 'Register new user',
            validation: {
                payload: Joi.object({
                    email: Joi.string().email().min(3).required(),
                    password: Joi.string().min(6).required(),
                }),
            }
        }
    },
] as Controller[];
