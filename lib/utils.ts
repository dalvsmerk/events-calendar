import { omit } from 'lodash';

export const protect = <T extends Record<string, any>>(columns: string[]) => (entity: T) => omit(entity, columns) as T;
