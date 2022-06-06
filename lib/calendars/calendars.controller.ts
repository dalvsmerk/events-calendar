import Joi from 'joi';
import { Controller } from '../types';
import { CalendarReadDTO, createCalendarEvent, getOwnerEvents, getUserCalendars } from './calendars.service';

export default [
    {
        visibility: 'protected',
        method: 'get',
        path: '/calendars',
        options: {
            description: 'List authorised user calendars',
        },
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
    },
    {
        visibility: 'protected',
        method: 'post',
        path: '/calendars/:calendar_id/event',
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
        handler: async (ctx) => {
            try {
                const {
                    user: { id: userId },
                    params: { calendar_id: calendarId },
                    request: { body: eventCreationDTO },
                } = ctx;
                const event = await createCalendarEvent(userId, calendarId, eventCreationDTO);

                ctx.send(201, {
                    success: true,
                    data: event,
                });
            } catch (error) {
                ctx.error(500, error);
            }
        },
    },
    {
        visibility: 'protected',
        method: 'get',
        path: '/events',
        options: {
            description: 'List user events',
            validation: {
                query: Joi.object({
                    from: Joi.string().isoDate().required(),
                    to: Joi.string().isoDate().required(),
                }),
            },
        },
        handler: async (ctx) => {
            try {
                const { from, to } = ctx.request.query;

                ctx.send(200, {
                    success: true,
                    data: await getOwnerEvents(ctx.user.id, from as string, to as string),
                });
            } catch (error) {
                ctx.error(500, error);
            }
        }
    }
] as Controller[];
