import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('trips', (table) => {
    table.date('start_date').notNullable().defaultTo(knex.fn.now());
    table.date('end_date').notNullable().defaultTo(knex.fn.now());
  });
};


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('trips', (table) => {
    table.dropColumn('start_date');
    table.dropColumn('end_date');
  });
}

