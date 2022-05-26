import { v4 } from 'uuid';
import logger from '../clients/logger';
import { InternalError } from '../utils';
import { insertCalendar } from './calendars.repository';

export interface Calendar {
    id: string;
    owner_id: string;
    name: string;
    color?: string;
}

export type CalendarCreationDTO = Omit<Calendar, 'id'>;
export type CalendarReadDTO = Calendar;

export const createCalendar = async (dto: CalendarCreationDTO): Promise<CalendarReadDTO> => {
    try {
        const calendar: Calendar = {
            ...dto,
            id: v4(),
        };

        return await insertCalendar(calendar);
    } catch (error) {
        logger.error(error);

        throw new InternalError((error as Error).message);
    }
};
