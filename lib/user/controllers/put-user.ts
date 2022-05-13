import Joi from 'joi';
import { UserSchema } from '../schemas/user';
import updateUser from '../services/update-user';

export default {
    method: 'put',
    path: '/user/:id',
    validate: {
        type: 'json',
        params: {
            id: Joi.number().required(),
        },
        body: UserSchema,
    },
    handler: async (ctx: any) => {
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: await updateUser(ctx.params.id, ctx.req.body),
        };
    },
};
