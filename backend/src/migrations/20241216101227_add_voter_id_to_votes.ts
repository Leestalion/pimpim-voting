import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("votes", (table) => {
    table
      .uuid("voter_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("rank").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("votes", (table) => {
    table.dropColumn("voter_id");
    table.dropColumn("rank");
  });
}
