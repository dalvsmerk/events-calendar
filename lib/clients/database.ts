import knex from 'knex';
import { config } from '../config';

export interface Identifyable {
    id: string;
}

export const db = (...args: any[]) => knex(config.database)(...args);

export const find = 
    <T extends Record<string, any>>(table: string) => 
    <C extends keyof T>(column: keyof T) => 
    (value: T[C]): Promise<T> =>
        db(table).select().where(column, value).first().then();

export const insert = <T extends Identifyable>(table: string) => (data: T) =>
    db(table).insert(data).returning('*').then(() => find<T>(table)<'id'>('id')(data.id));
