import { Request } from '@hapi/hapi';
import { v4 } from 'uuid';
import { CreateUserDto, ReadUserDto } from '../dto';
import { CreateUserSchema } from '../schemas/user';
import createUser from '../services/create-user';

export default {
    method: 'POST',
    path: '/user',
    options: {
        validate: {
            payload: CreateUserSchema,
        },
    },
    handler: async (req: Request, h: any): Promise<ReadUserDto> => {
        const userDto: CreateUserDto = {
            ...req.payload as CreateUserDto,
            id: v4(),
        }
        const user = await createUser(userDto);
        
        return h.response(user).code(201);
    },
};
