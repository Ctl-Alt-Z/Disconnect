/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// await knex('logs').del();

	await knex.raw('ALTER SEQUENCE logs_id_seq RESTART WITH 1');

	await knex('logs').insert([
		{
			screentime: 8,
			user_id: 1,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 8,
			user_id: 5,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 8,
			user_id: 2,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 5,
			user_id: 9,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 3,
			user_id: 4,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 8,
			user_id: 1,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 8,
			user_id: 5,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 8,
			user_id: 2,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 5,
			user_id: 9,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
		{
			screentime: 3,
			user_id: 4,
			date: '2024-07-08',
			entry:
				'I was able to complete my goal from the previous day I feel great',
			posts_id: 3,
		},
	]);
};
