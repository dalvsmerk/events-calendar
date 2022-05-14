import Joi from 'joi';

export const CreateUserSchema = Joi.object({
    email: Joi.string().min(3).max(254).required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().min(1).max(100),
});

export const UpdateUserSchema = Joi.object({
    email: Joi.string().min(3).max(254),
    password: Joi.string().min(6),
    full_name: Joi.string().min(1).max(100),
});
