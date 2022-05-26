import { Controller } from '../types';
import { CalendarReadDTO, getUserCalendars } from './calendars.service';

export default [
    {
        visibility: 'protected',
        method: 'get',
        path: '/calendars',
        handler: async (ctx) => {
            try {
                const calendars: CalendarReadDTO[] = await getUserCalendars(ctx.user.id);

                ctx.send(200, {
                   success: true,
                   data: calendars, 
                });
            } catch (error) {
                ctx.error(500, error);
            }
        },
        options: {
            description: 'List authorised user calendars',
        },
    },
] as Controller[];
