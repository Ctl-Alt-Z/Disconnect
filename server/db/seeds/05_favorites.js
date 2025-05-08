/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex('favorites').del();
	await knex('favorites').insert([
		{ id: 1, user_id: 1, posts_id: 1 },
		{ id: 2, user_id: 2, posts_id: 2 },
		{ id: 3, user_id: 3, posts_id: 3 },
		{ id: 4, user_id: 4, posts_id: 4 },
		{ id: 5, user_id: 5, posts_id: 5 },
		{ id: 6, user_id: 6, posts_id: 6 },
		{ id: 7, user_id: 7, posts_id: 7 },
		{ id: 8, user_id: 8, posts_id: 8 },
		{ id: 9, user_id: 9, posts_id: 9 },
		{ id: 10, user_id: 10, posts_id: 10 },
	]);
};
