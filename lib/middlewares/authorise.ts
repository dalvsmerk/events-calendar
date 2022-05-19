import { Context } from 'koa';
import { authorise } from '../auth/auth.service';

export default async (ctx: Context, next) => {
    const auth = ctx.request.headers.authorization;
    const empty = !auth?.length;
    
    if (empty) {
        ctx.status = 401;
        return;
    }

    const bearer = auth.indexOf('Bearer') > -1;

    if (!bearer) {
        ctx.status = 401;
        return;
    }

    const accessToken = auth.split(/\s/)[1];

    if (!accessToken) {
        ctx.status = 401;
        return;
    }

    const canAuthorise = await authorise(accessToken);

    if (!canAuthorise) {
        ctx.status = 401;
        return;
    }

    await next();
};
