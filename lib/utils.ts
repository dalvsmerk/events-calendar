import { omit } from 'lodash';

export const protect = <T>(columns: string[]) => (entity: any) => omit(entity, columns) as T;
