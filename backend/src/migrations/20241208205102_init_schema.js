/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("trips", (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.string("security_code").notNullable();
    })
    .createTable("users", (table) => {
      table.uuid("id").primary();
      table
        .uuid("trip_id")
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE");
      table.uuid("username").notNullable();
    })
    .createTable("votes", (table) => {
      table.uuid("id").primary();
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
      table.timestamp(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("votes")
    .dropTableIfExists("users")
    .dropTableIfExists("trips");
};
