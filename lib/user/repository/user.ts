import { db } from '../../services/database';
import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dto';
import { User } from '../types';
import { protect } from '../util';

export const findUserById = async (id: string): Promise<ReadUserDto> => {
    const user: User = await db('users').select().where('id', id).first().then();

    return protect(user);
}

export const insertUser = (userDto: CreateUserDto): Promise<ReadUserDto> =>
    db('users').insert(userDto).then(() => findUserById(userDto.id));

export const updateUserById = (id: string, userDto: UpdateUserDto): Promise<ReadUserDto> =>
    db('users').update(userDto).where('id', id).then(() => findUserById(id));
