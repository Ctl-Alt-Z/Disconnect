const knex = require("../db/knex");

class Post {
  constructor({ id, message, user_id }) {
    this.id = id;
    this.message = message;
    this.user_id = user_id;
  }

  static async create(message, userId) {
    const query = `
          INSERT INTO posts (message, user_id)
          values (?, ?)
          RETURNING *
        `;
    const result = await knex.raw(query, [message, userId]);
    const rawLogData = result.rows[0];
    return rawLogData;
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
    console.log("userId", userId);
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

  static async favorite(Id) {
    const query = `INSERT favorites
	FROM posts
	where id = ? `;
  }
  static async unfavorite(postId) {
    const query = `DELETE 
	FROM favorites 
	WHERE posts_id = ?
	`;
  }
}

module.exports = Post;
