import { v4 } from 'uuid';
import logger from '../clients/logger';
import { InternalError } from '../utils';
import {
    findCalendarById,
    findCalendarsByOwnerId,
    insertCalendar,
    insertCalendarEvent,
} from './calendars.repository';

export interface CalendarEvent {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    calendar_id: string;
}

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
        const calendarToCreate: Calendar = {
            ...dto,
            id: v4(),
        };

        return await insertCalendar(calendarToCreate);
    } catch (error) {
        logger.error(error);

        throw new InternalError((error as Error).message);
    }
};

export const getUserCalendars = async (userId: string): Promise<CalendarReadDTO[]> => {
    return await findCalendarsByOwnerId(userId);
};

export type CalendarEventCreationDTO = {
    name: string;
    start_date: string;
    end_date: string;
};

export type CalendarEventReadDTO = Omit<CalendarEvent, 'id'>;

export class CalendarNotFoundError extends Error {
    constructor(id: string) {
        super(`Calendar with ${id} ID is not found`);
    }
}

export const createCalendarEvent = async (calendarId: string, eventDTO: CalendarEventCreationDTO) => {
    const calendar = await findCalendarById(calendarId);

    if (!calendar) {
        throw new CalendarNotFoundError(calendarId);
    }

    return await insertCalendarEvent({
        id: v4(),
        calendar_id: calendarId,
        ...eventDTO,
    });
}
