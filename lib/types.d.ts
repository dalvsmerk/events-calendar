import { Schema } from 'joi';
import { Context, Next } from 'koa';

interface RequestValidation {
    params?: Schema;
    payload?: Schema;
}

interface Controller {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    path: string;
    handler: <R>(ctx: Context, next: Next) => R;
    options?: {
        description?: string;
        validation?: RequestValidation;
    };
}
