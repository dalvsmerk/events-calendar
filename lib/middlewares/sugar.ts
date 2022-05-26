export default async (ctx, next) => {
    ctx.send = (status: number, payload: any) => {
        ctx.status = status;
        ctx.body = payload;
    };

    ctx.error = (status: number, error: Error) => {
        ctx.send(status, {
            success: false,
            reason: error.constructor.name,
            message: error.message,
        });
    };

    await next();
};
