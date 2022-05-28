import Joi from 'joi';
import { Controller } from '../types';
import { CalendarReadDTO, createCalendarEvent, getUserCalendars } from './calendars.service';

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
    {
        visibility: 'protected',
        method: 'post',
        path: '/calendar/:calendar_id/event',
        handler: async (ctx) => {
            try {
                const event = await createCalendarEvent(ctx.params.calendar_id, ctx.request.body);

                ctx.send(201, {
                    success: true,
                    data: event,
                });
            } catch (error) {
                ctx.error(500, error);
            }
        },
        options: {
            description: 'Create event for calendar',
            validation: {
                params: Joi.object({
                    calendar_id: Joi.string().uuid().required(),
                }),
                payload: Joi.object({
                    name: Joi.string().min(1).max(100).required(),
                    start_date: Joi.date().required(),
                    end_date: Joi.date().required(),
                }),
            },
        },
    },
] as Controller[];
