import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import logger from '../clients/logger';
import { config } from '../config';
import { protect } from '../utils';
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

interface SqliteError {
    code: string;
}

const ENTITY_CONSTRAINT = 'SQLITE_CONSTRAINT';

export class UserEmailExistsError extends Error {
    constructor(readonly email: string) {
        super(`User email ${email} already exists`);
    }
}

export class InternalError extends Error {
    constructor(readonly message: string) {
        super(message);
    }
}

const protectUser = protect<ReadUserDto>(['password']);

export const createUser = async (dto: CreateUserDto): Promise<ReadUserDto> => {
    const userToInsert: User = {
        ...dto,
        id: v4(),
        password: await bcrypt.hash(dto.password, config.secret.saltRounds),
    };

    try {
        const user: User = await insertUser(userToInsert);
    
        return protectUser(user);
    } catch (error) {
        if ((error as SqliteError).code === ENTITY_CONSTRAINT) {
            throw new UserEmailExistsError(dto.email);
        }

        logger.error(error);

        throw new InternalError((error as Error).message);
    }
}
