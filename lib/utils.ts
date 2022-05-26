import { omit } from 'lodash';

export const protect = <T extends Record<string, any>>(columns: string[]) => (entity: T) => omit(entity, columns) as T;

export class InternalError extends Error {
    constructor(readonly message: string) {
        super(message);
    }
}

interface SqliteError {
    code: string;
}

const SQLITE_CONSTRAINT = 'SQLITE_CONSTRAINT';

export const tryHandleSQLError = async (error, cb) => {
    if ((error as SqliteError).code === SQLITE_CONSTRAINT) {
        cb();
    }
};
