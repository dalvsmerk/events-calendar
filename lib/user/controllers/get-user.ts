import { notFound } from '@hapi/boom';
import { Request } from '@hapi/hapi';
import Joi from 'joi';
import { ReadUserDto } from '../dto';
import findUser from '../services/find-user';

export default {
    method: 'GET',
    path: '/user/{uuid}',
    options: {
        validate: {
            params: Joi.object({
                uuid: Joi.string().length(36).required(),
            }),
        },
    },
    handler: async (req: Request): Promise<ReadUserDto> => {  
        const user = await findUser({ id: req.params.uuid });
        
        if (!user) {
            throw notFound('User not found');
        }
        
        return user;
    },
};
