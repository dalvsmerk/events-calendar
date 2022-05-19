import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCache } from '../clients/cache';
import { config } from '../config';
import { findUserByEmail } from '../users/users.repository';
import { protectUser, ReadUserDto, User } from '../users/users.service';

export class UserNotFoundError extends Error {
    constructor(readonly email: string) {
        super(`User email ${email} does not exist`);
    }
}

export class UserPasswordIncorrectError extends Error {
    constructor() {
        super('User password is incorrect');
    }
}

export const tryFindUser = async (email: string) => {
    const user: User = await findUserByEmail(email);

    if (!user) {
        throw new UserNotFoundError(email);
    }

    return user;
};

export const tryVerifyPassword = async (user: User, password: string) => {
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        throw new UserPasswordIncorrectError();
    }
};

export const generateAccessToken = (user: ReadUserDto) => {
    return jwt.sign({ data: user }, config.secret.key);
};

const makeAccessTokenCacheKey = (user: ReadUserDto) => `${user.id}:access-token`;

export const authenticate = async (email: string, password: string) => {
    /**
     * TODO: Update access token using refresh tokens
     */
    const user = await tryFindUser(email);

    await tryVerifyPassword(user, password);

    const readUser    = protectUser(user);
    const accessToken = generateAccessToken(readUser);

    getCache().set(makeAccessTokenCacheKey(readUser), accessToken, config.auth.access_token.ttl);

    return accessToken;
};

export const authorise = async (accessToken: string) => {
    try {
        const payload = jwt.verify(accessToken, config.secret.key) as { data: ReadUserDto };
        const accessTokenKey = makeAccessTokenCacheKey(payload.data);

        return getCache().exists(accessTokenKey);
    }
    catch (error) {
        return false;
    }
};
