import { notFound } from '@hapi/boom';
import { Request } from '@hapi/hapi';
import Joi from 'joi';
import { ReadUserDto, UpdateUserDto } from '../dto';
import { UpdateUserSchema } from '../schemas/user';
import updateUser from '../services/update-user';

export default {
    method: 'PATCH',
    path: '/user/{uuid}',
    options: {
        validate: {
            params: Joi.object({
                uuid: Joi.string().length(36).required(),
            }),
            payload: UpdateUserSchema,
        },
    },
    handler: async (req: Request): Promise<ReadUserDto> => {
        const updated = await updateUser(req.params.uuid, req.payload as UpdateUserDto);

        if (!updated) {
            throw notFound('User not found');
        }

        return updated;
    },
};
