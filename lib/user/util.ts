import { omit } from 'lodash';
import { ReadUserDto } from './dto';
import { User } from './types';

export const protect = (user: User): ReadUserDto => omit(user, ['password']);
