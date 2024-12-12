import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trips', (table) => {
        table.increments('id').primary().alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    
}

