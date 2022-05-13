import { db } from '../../services/database';
import { CreateUserDto } from '../dto';
import { User } from '../types';

export const insertUser = (userDto: CreateUserDto): Promise<User> =>
    db('users').insert(userDto).then();

export const findUserById = (uuid: string): Promise<User> =>
    db('users').select().where('id', uuid).first().then();
