/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex('posts').del();

	// await knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1');

	await knex('posts').insert([
		{
			id: 1,
			message:
				'I was having a bunch of errors with the seeds before hopefully its fixed now.',
			user_id: 1,
		},
		{
			id: 2,
			message:
				'Just pushed the latest UI changes to the dev branch for review.',
			user_id: 3,
		},
		{
			id: 3,
			message: 'Found a bug in the authentication flow, working on a fix now.',
			user_id: 2,
		},
		{
			id: 4,
			message: 'Team meeting at 3pm today to discuss the new feature roadmap.',
			user_id: 5,
		},
		{
			id: 5,
			message: 'Database migration completed successfully. All tests passing.',
			user_id: 4,
		},
		{
			id: 6,
			message: 'Need feedback on the landing page redesign by EOD please.',
			user_id: 1,
		},
		{
			id: 7,
			message: 'API documentation updated with the new endpoints.',
			user_id: 6,
		},
		{
			id: 8,
			message: 'Performance issues resolved in the checkout process.',
			user_id: 3,
		},
		{
			id: 9,
			message:
				'Customer feedback implementation complete - added new rating system.',
			user_id: 2,
		},
		{
			id: 10,
			message: 'Deployed hotfix to production for the critical login issue.',
			user_id: 4,
		},
	]);
};
