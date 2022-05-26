import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { insertCalendar } from '../calendars/calendars.repository';
import { CalendarCreationDTO, CalendarReadDTO, createCalendar } from '../calendars/calendars.service';
import logger from '../clients/logger';
import { config } from '../config';
import { ENTITY_CONSTRAINT, InternalError, protect, SqliteError, tryHandleSQLError } from '../utils';
import { insertUser } from './users.repository';

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
        tryHandleSQLError(error, () => {
            throw new UserEmailExistsError(dto.email)
        });

        logger.error(error);

        throw new InternalError((error as Error).message);
    }
}
