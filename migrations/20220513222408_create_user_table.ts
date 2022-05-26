import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable('users', (table: Knex.TableBuilder) => {
            table.primary(['id', 'email']);

            table.uuid('id').unique().notNullable();
            table.string('email', 254).unique().notNullable();
            table.string('password').notNullable();
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
