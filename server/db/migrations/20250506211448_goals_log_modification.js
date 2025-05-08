/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("logs", (table) => {
      table.dropColumn("goals_id");
      table.dropColumn("posts_id");
    })
    .alterTable("goals", (table) => {
      table.integer("logs_id").notNullable();
      table.foreign("logs_id").references("id").inTable("logs");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("goals", (table) => {
      table.dropColumn("logs_id");
    })
    .alterTable("logs", (table) => {
      table.integer("goals_id").notNullable();
      table.foreign("goals_id").references("id").inTable("goals");
    })
    .alterTable("logs", (table) => {
      table.integer("posts_id").notNullable();
      table.foreign("posts_id").references("id").inTable("posts");
    });
};
