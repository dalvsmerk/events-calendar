import { insert } from '../clients/database';
import { Calendar } from './calendars.service';

export const insertCalendar = insert<Calendar>('calendars');
