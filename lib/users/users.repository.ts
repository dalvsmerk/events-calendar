import { db } from '../clients/database';
import { User } from './users.service';

export const find = <T extends Record<string, any>>(table: string) => <C extends keyof T>(column: keyof T) => (value: T[C]): Promise<T> =>
    db(table).select().where(column, value).first().then();

export const findUser = find<User>('users');

export const findUserById = findUser<'id'>('id');
export const findUserByEmail = findUser<'email'>('email');

export const insertUser = async (user: User): Promise<User> =>
    await db('users').insert(user).returning('*').then(() => findUserById(user.id));
