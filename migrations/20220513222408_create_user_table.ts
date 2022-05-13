import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable('users', (table: Knex.TableBuilder) => {
            table.primary(['id']);

            table.uuid('id').notNullable();
            table.string('email', 254).notNullable();
            table.string('password').notNullable();
            table.string('full_name', 100);
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
