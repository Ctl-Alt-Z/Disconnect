/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex('goals').del();
	await knex('goals').insert([
		{ id: 1, goal_num: 3, goal_string: 'rowValue2', logs_id: 1 },
		{ id: 2, goal_num: 3, goal_string: 'rowValue2', logs_id: 2 },
		{ id: 3, goal_num: 3, goal_string: 'rowValue2', logs_id: 3 },
		{ id: 4, goal_num: 3, goal_string: 'rowValue2', logs_id: 4 },
		{ id: 5, goal_num: 3, goal_string: 'rowValue2', logs_id: 5 },
		{ id: 6, goal_num: 3, goal_string: 'rowValue2', logs_id: 6 },
		{ id: 7, goal_num: 3, goal_string: 'rowValue2', logs_id: 7 },
		{ id: 8, goal_num: 3, goal_string: 'rowValue2', logs_id: 8 },
		{ id: 9, goal_num: 3, goal_string: 'rowValue2', logs_id: 9 },
		{ id: 10, goal_num: 3, goal_string: 'rowValue2', logs_id: 10 },
	]);
};
