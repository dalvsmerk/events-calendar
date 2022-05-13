import findUser from '../services/find-user';

export default {
    method: 'get',
    path: '/user/:id',
    handler: async (ctx: any) => {
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: await findUser({ id: ctx.params.id }),
        }
    },
};
