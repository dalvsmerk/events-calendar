import { find, insert } from '../clients/database';
import { User } from './users.service';

export const findUser = find<User>('users');

export const findUserById = findUser<'id'>('id');
export const findUserByEmail = findUser<'email'>('email');

export const insertUser = insert<User>('users');
