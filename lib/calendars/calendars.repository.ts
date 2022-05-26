import { db, insert } from '../clients/database';
import { Calendar } from './calendars.service';

export const insertCalendar = insert<Calendar>('calendars');

export const findCalendarsByOwnerId = async (ownerId: string): Promise<Calendar[]> =>
    db('calendars').select().where('owner_id', ownerId).then();
