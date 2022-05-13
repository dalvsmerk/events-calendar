import { internal, notFound } from '@hapi/boom';
import { Request } from '@hapi/hapi';
import Joi from 'joi';
import findUser from '../services/find-user';

export default {
    method: 'GET',
    path: '/user/{uuid}',
    options: {
        validate: {
            params: Joi.object({
                uuid: Joi.string().required(),
            }),
        },
    },
    handler: async (req: Request, h: any) => {  
        try {
            const user = await findUser({ id: req.params.uuid });
            
            if (!user) {
                throw notFound('User not found');
            }
            
            return user;
        } catch (error) {
            throw internal('Oops, :(', error);
        }
    },
};
