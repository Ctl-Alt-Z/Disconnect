const knex = require('../db/knex');

class Favorite {
	constructor({ id, user_id, posts_id }) {
		this.id = id;
		this.userId = user_id;
		this.postId = posts_id;
	}

	// Create a favorite (like a post)
	static async create(userId, postId) {
		const query = `
      INSERT INTO favorites (user_id, posts_id)
      VALUES (?, ?)
      RETURNING *`;
		const result = await knex.raw(query, [userId, postId]);
		return result.rows[0];
	}

	// Get all favorites for a user (with post info)
	static async findByUserId(userId) {
		const query = `
      SELECT 
        favorites.id, 
        favorites.user_id, 
        favorites.posts_id, 
        posts.message, 
        users.username
      FROM favorites
      JOIN posts ON favorites.posts_id = posts.id
      JOIN users ON posts.user_id = users.id
      WHERE favorites.user_id = ?
    `;
		const { rows } = await knex.raw(query, [userId]);
		return rows;
	}

	// Get all favorites for a specific post
	static async findByPostId(postId) {
		const query = `
      SELECT *
      FROM favorites
      WHERE posts_id = ?;
    `;
		const { rows } = await knex.raw(query, [postId]);
		return rows;
	}

	// Delete favorite by id and return deleted record
	static async delete(id) {
		const query = `
      DELETE FROM favorites
      WHERE id = ?
      RETURNING *;
    `;
		const { rows } = await knex.raw(query, [id]);
		return rows[0];
	}
}

module.exports = Favorite;
