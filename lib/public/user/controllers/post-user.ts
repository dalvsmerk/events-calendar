import { UserSchema } from '../schemas/user';
import createUser from '../services/create-user';

export default {
    method: 'post',
    path: '/user',
    validate: {
        body: UserSchema,
    },
    handler: async (ctx: any) => {
        ctx.status = 201;
        ctx.body = {
            success: true,
            data: await createUser(ctx.req.body),
        };
    },
};
