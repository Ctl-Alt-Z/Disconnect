/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("users", (table) => {
      table.dropColumn("username");
      table.dropColumn("password_hash");
      table.dropColumn("created_at");
      table.dropColumn("updated_at");
      table.dropColumn("first_name");
      table.dropColumn("last_name");
      table.dropColumn("email");
    })
    .alterTable("users", (table) => {
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("username").notNullable().unique();
      table.string("email").notNullable();
      table.string("password_hash").notNullable();
      table.timestamps(true, true);
    })
    .dropTable("favorites")
    .dropTable("posts")
    .dropTable("goals")
    .createTable("posts", (table) => {
      table.increments("id").primary();
      table.string("message");
      table.integer("user_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
    })
    .createTable("favorites", (table) => {
      table.increments("id").primary();
      table.integer("user_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.integer("posts_id").notNullable();
      table.foreign("posts_id").references("id").inTable("posts");
    })
    .createTable("goals", (table) => {
      table.increments("id").primary();
      table.integer("goal_num");
      table.string("goal_string");
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
    .dropTable("favorites")
    .dropTable("posts")
    .dropTable("goals")
    .createTable("posts", (table) => {
      table.integer("id").primary();
      table.string("message");
      table.integer("user_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
    })
    .createTable("favorites", (table) => {
      table.integer("id").primary();
      table.integer("user_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.integer("posts_id").notNullable();
      table.foreign("posts_id").references("id").inTable("posts");
    })
    .alterTable("users", (table) => {
      table.dropColumn("username");
      table.dropColumn("password_hash");
      table.dropColumn("created_at");
      table.dropColumn("updated_at");
      table.dropColumn("first_name");
      table.dropColumn("last_name");
      table.dropColumn("email");
    })
    .alterTable("users", (table) => {
      table.string("username").notNullable().unique();
      table.string("password_hash").notNullable();
      table.timestamps(true, true);
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
    })
    .createTable("goals", (table) => {
      table.integer("id").primary();
      table.integer("goal_num");
      table.string("goal_string");
      table.integer("logs_id").notNullable();
      table.foreign("logs_id").references("id").inTable("logs");
    });
};
