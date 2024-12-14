import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const result = await knex.raw("SELECT * FROM pg_available_extensions WHERE name = 'uuid-ossp';");
  const extension = result.rows[0];
  if (extension.installed_version === null) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }
  return knex.schema
    .createTable("trips", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name").notNullable();
      table.string("security_code").notNullable();
    })
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table
        .uuid("trip_id")
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE");
      table.uuid("username").notNullable();
    })
    .createTable("votes", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .uuid("trip_id")
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
  return knex.schema
    .dropTableIfExists("votes")
    .dropTableIfExists("users")
    .dropTableIfExists("trips");
}
