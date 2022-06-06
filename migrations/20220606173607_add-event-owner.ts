import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('events', (table: Knex.TableBuilder) => {
        table.uuid('owner_id').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('events', (table: Knex.TableBuilder) => {
        table.dropColumn('owner_id');
    });
}
