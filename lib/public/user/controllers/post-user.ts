import * as Boom from '@hapi/boom';
import { Request } from '@hapi/hapi';
import Joi from 'joi';
import { CreateUserDto } from '../dto';
import { UserSchema } from '../schemas/user';
import createUser from '../services/create-user';

export default {
    method: 'POST',
    path: '/user',
    options: {
        validate: {
            payload: Joi.object(UserSchema),
        },
    },
    handler: async (req: Request, h: any) => {        
        const user = await createUser(req.payload as CreateUserDto);

        if (!user) {
            throw Boom.notFound('User not found');
        }
        
        return h.response(user).code(201);
    },
};
