import Joi from 'joi';
import { Controller } from '../types';
import { createUser, ReadUserDto, UserEmailExistsError } from './users.service';

export default [
    {
        visibility: 'public',
        method: 'post',
        path: '/user',
        handler: async (ctx) => {
            try {
                const user: ReadUserDto = await createUser(ctx.request.body);
                
                ctx.send(201, {
                    success: true,
                    data: user,
                });
            }
            catch (error) {
                if (error instanceof UserEmailExistsError) {
                    ctx.error(400, error);
                }
                else {
                    ctx.error(500, error);
                }
            }
        },
        options: {
            description: 'Register new user',
            validation: {
                payload: Joi.object({
                    email: Joi.string().email().min(3).required(),
                    password: Joi.string().min(6).required(),
                }),
            },
        },
    },
] as Controller[];
