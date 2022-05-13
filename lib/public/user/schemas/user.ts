import { Joi } from 'koa-joi-router';

export const UserSchema = {
    email: Joi.string().max(254).required(),
    password: Joi.string().required(),
    full_name: Joi.string().max(100),
    id: Joi.string().uuid(),
};
