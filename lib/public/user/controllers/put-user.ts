import { UserSchema } from '../schemas/user';
import updateUser from '../services/update-user';

export default {
    method: 'put',
    path: '/user/:id',
    validate: {
        type: 'json',
        params: {
            id: Joi.string().uuid(),
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
