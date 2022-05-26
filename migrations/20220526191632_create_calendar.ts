import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable('calendars', (table: Knex.TableBuilder) => {
            table.primary(['id']);

            table.uuid('id').unique().notNullable();
            table.string('name', 100).notNullable();
            table.string('color', 7);
            table
                .uuid('owner_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
        })
        .createTable('events', (table: Knex.TableBuilder) => {
            table.primary(['id']);

            table.uuid('id').unique().notNullable();
            table.string('name', 100).notNullable();
            table.datetime('start_date').notNullable();
            table.datetime('end_date').notNullable();
            table
                .uuid('calendar_id')
                .notNullable()
                .references('id')
                .inTable('calendars')
                .onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('events')
        .dropTable('calendars');
}
