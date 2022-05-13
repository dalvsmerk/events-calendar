import { UserSchema } from '../schemas/user';
import updateUser from '../services/update-user';

export default {
    method: 'put',
    path: '/user/:id',
    validate: {
        body: UserSchema,
    },
    handler: async (ctx: any) => {
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: await updateUser(ctx.req.body),
        };
    },
};
