import Joi from 'joi';

export const UserSchema = {
    email: Joi.string().min(3).max(254).required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().min(1).max(100),
    id: Joi.string().uuid(),
};
