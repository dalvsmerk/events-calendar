import { internal } from '@hapi/boom';
import { Request } from '@hapi/hapi';
import Joi from 'joi';
import { v4 } from 'uuid';
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
        try {

            const userDto: CreateUserDto = {
                ...req.payload as CreateUserDto,
                id: v4(),
            }
            const user = await createUser(userDto);
            
            return h.response(user).code(201);
        } catch (error) {
            throw internal('Oopsie, we have problem :(', error);
        }
    },
};
