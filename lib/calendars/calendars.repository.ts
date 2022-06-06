import { db, insert } from '../clients/database';
import { Calendar, CalendarEvent } from './calendars.service';

export const insertCalendar = insert<Calendar>('calendars');

export const findCalendarsByOwnerId = async (ownerId: string): Promise<Calendar[]> =>
    db('calendars').select().where('owner_id', ownerId).then();

export const findCalendarById = async (id: string): Promise<Calendar> =>
    db('calendars').select().where('id', id).first().then();

export const insertCalendarEvent = insert<CalendarEvent>('events');
