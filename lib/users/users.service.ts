import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { UserNotFoundError } from '../auth/auth.service';
import { CalendarCreationDTO, CalendarReadDTO, createCalendar } from '../calendars/calendars.service';
import logger from '../clients/logger';
import { config } from '../config';
import {  InternalError, protect, SqliteError, SQLITE_CONSTRAINT, tryHandleSQLError } from '../utils';
import { findUserByEmail, findUserById, insertUser } from './users.repository';

export interface CreateUserDto {
    email: string;
    password: string;
}

export interface ReadUserDto {
    id: string;
    email: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
}

export class UserEmailExistsError extends Error {
    constructor(readonly email: string) {
        super(`User email ${email} already exists`);
    }
}

export const protectUser = protect<ReadUserDto>(['password']);

export const createDefaultUserCalendar = async (user: User): Promise<CalendarReadDTO> => {
    const defaultCalendar: CalendarCreationDTO = {
        name: `${user.email} calendar`,
        owner_id: user.id,
        color: '#c2e1c2',
    };
    
    return await createCalendar(defaultCalendar);
};

export const createUser = async (dto: CreateUserDto): Promise<ReadUserDto> => {
    const userToInsert: User = {
        ...dto,
        id: v4(),
        password: await bcrypt.hash(dto.password, config.secret.saltRounds),
    };

    try {
        const user: User = await insertUser(userToInsert);

        await createDefaultUserCalendar(user);
    
        return protectUser(user);
    } catch (error) {
        if ((error as SqliteError).code === SQLITE_CONSTRAINT) {
            throw new UserEmailExistsError(dto.email)
        }

        logger.error(error);

        throw new InternalError((error as Error).message);
    }
};

export const getUserByEmail = async (email: string): Promise<ReadUserDto> => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new UserNotFoundError(email);
    }

    return user;
};
