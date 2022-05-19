import knex from 'knex';
import { config } from '../config';

export const db = (...args: any[]) => knex(config.database)(...args);
