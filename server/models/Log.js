const knex = require('../db/knex');

//add find by ID and delete methods as needed
class Log {
	// Create a Log instance
	constructor({ id, user_id, date, screentime, entry }) {
		this.id = id;
		this.user_id = user_id;
		this.date = date;
		this.screentime = screentime;
		this.entry = entry;
	}

	// Creates a new log in the logs table and returns the newly created log
	static async create(userId, date, screentime) {
		const query = `INSERT INTO logs (user_id, date, screentime)
        VALUES (?, ?, ?) RETURNING *`;
		const result = await knex.raw(query, [userId, date, screentime]);
		const rawLogData = result.rows[0];
		return new Log(rawLogData);
	}
	static async update(entry, userId) {
		const query = `UPDATE logs SET entry = ? WHERE user_id = ? RETURNING *`;
		const result = await knex.raw(query, [entry, userId]);
		const rawLogData = result.rows[0];
		return new Log(rawLogData);
	}
}

module.exports = Log;
