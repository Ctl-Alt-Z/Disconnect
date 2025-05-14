const knex = require('../db/knex');

class Post {
	static async create(message, userId) {
		const query = `
          INSERT INTO posts (message, user_id)
          values (?, ?)
          RETURNING *
        `;
		const { rows } = await knex.raw(query, [message, userId]);
		return rows;
	}

	static async list() {
		const query = `
    SELECT posts.id, posts.message, users.username
    FROM posts
    JOIN users
    ON users.id = posts.user_id
    `;
		const { rows } = await knex.raw(query);
		return rows;
	}

	static async findById(id) {
		const query = `
    SELECT *
    FROM posts
    WHERE id = ?
    `;
		const { rows } = await knex.raw(query, [id]);
		console.log(rows);
		return rows[0];
	}

	static async findPostsByUserId(userId) {
		console.log('userId', userId);
		const query = `
    SELECT *
    FROM posts
    WHERE user_id = ?
    `;
		const { rows } = await knex.raw(query, [userId]);
		return rows;
	}

	static async editPost(id, newMessage) {
		const query = `
    UPDATE posts
    SET message = ?
    WHERE id = ?
    RETURNING *
  `;
		const { rows } = await knex.raw(query, [newMessage, id]);
		return rows[0];
	}

	static async delete(id) {
		const query = `
      DELETE 
      FROM posts
      WHERE id = ?
    `;
		const { rows } = await knex.raw(query, [id]);
		return rows;
	}

	static async deleteByUserId(userId) {
		const query = `
      DELETE 
      FROM posts
      WHERE user_id = ?
    `;
		const { rows } = await knex.raw(query, [userId]);
		return rows;
	}
}

module.exports = Post;
