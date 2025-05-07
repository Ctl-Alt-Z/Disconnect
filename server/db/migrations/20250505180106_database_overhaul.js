/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.alterTable('users', (table) => {
			table.string('first_name').notNullable();
			table.string('last_name').notNullable();
			table.string('email').notNullable();
		})
		.createTable('goals', (table) => {
			table.integer('id').primary();
			table.integer('goal_num');
			table.string('goal_string');
		})
		.createTable('posts', (table) => {
			table.integer('id').primary();
			table.string('message');
			table.integer('user_id').notNullable();
			table.foreign('user_id').references('id').inTable('users');
		})
		.createTable('logs', (table) => {
			table.increments('id').primary();
			// table.integer('id').primary();
			table.integer('screentime').notNullable();
			table.integer('user_id').notNullable();
			table.foreign('user_id').references('id').inTable('users');
			table.date('date');
			table.string('entry');
			table.integer('goals_id').notNullable();
			table.foreign('goals_id').references('id').inTable('goals');
			table.integer('posts_id').notNullable();
			table.foreign('posts_id').references('id').inTable('posts');
		})
		.createTable('favorites', (table) => {
			table.integer('id').primary();
			table.integer('user_id').notNullable();
			table.foreign('user_id').references('id').inTable('users');
			table.integer('posts_id').notNullable();
			table.foreign('posts_id').references('id').inTable('posts');
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable('favorites')
		.dropTable('logs')
		.dropTable('posts')
		.dropTable('goals')
		.alterTable('users', (table) => {
			table.dropColumn('first_name');
			table.dropColumn('last_name');
			table.dropColumn('email');
		});
};
