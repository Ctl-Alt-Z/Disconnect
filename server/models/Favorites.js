const knex = require("../db/knex");

class Favorite {
  constructor({ id, user_id, post_id }) {
    this.id = id;
    this.userId = user_id;
    this.postId = post_id;
  }

  static async create(userId, postId) {
    const query = `
      INSERT INTO favorites (user_id, posts_id)
      VALUES (?, ?)
      RETURNING *`;
    const result = await knex.raw(query, [userId, postId]);
    const rawFavoriteData = result.rows[0];
    return rawFavoriteData;
  }

  static async findByUserId(userId) {
    const query = `
        SELECT *
        FROM favorites
        WHERE user_id = ?;
        `;
    const { rows } = await knex.raw(query, [userId]);
    return rows;
  }

  static async findByPostId(postId) {
    const query = `
        SELECT *
        FROM favorites
        WHERE posts_id = ?;
        `;
    const { rows } = await knex.raw(query, [postId]);
    return rows;
  }

  static async delete(id) {
    const query = `
        DELETE
        FROM favorites
        WHERE id = ?
        `;
    const { rows } = await knex.raw(query, [id]);
    return rows;
  }
}

module.exports = Favorite;
