import Joi from 'joi';
import logger from '../clients/logger';
import { authenticate, UserNotFoundError, UserPasswordIncorrectError } from './auth.service';

export default [
    {
        visibility: 'public',
        method: 'post',
        path: '/token',
        handler: async (ctx) => {
            try {
                const { email, password } = ctx.request.body;

                ctx.send(200, {
                    success: true,
                    data: {
                        access_token: await authenticate(email, password),
                    },
                });
            }
            catch (error) {
                if (error instanceof UserNotFoundError) {
                    ctx.error(404, error);
                    return;
                }
                if (error instanceof UserPasswordIncorrectError) {
                    ctx.error(401, error);
                    return;
                }

                logger.error(error);

                ctx.error(500, error);
            }
        },
        options: {
            description: 'Create authentication token by email & password',
            validation: {
                payload: Joi.object({
                    email: Joi.string().email().min(3).required(),
                    password: Joi.string().min(6).required(),
                }),
            },
        },
    },
]
