import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("votes", (table) => {
    table.integer("vote_day").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("vote", (table) => {
    table.dropColumn("day");
  });
}
