import { db } from '../../services/database';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../types';

export const insertUser = (userDto: CreateUserDto): Promise<User> =>
    db('users').insert(userDto).then();

export const findUserById = (id: string): Promise<User> =>
    db('users').select().where('id', id).first().then();

export const updateUserById = (id: string, userDto: UpdateUserDto): Promise<User> =>
    db('users').update(userDto).where('id', id).then(() => findUserById(id));
