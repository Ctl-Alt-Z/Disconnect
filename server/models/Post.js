const knex = require("../db/knex");

class Post {
  static async create(content, fellowId) {
    const query = `
          INSERT INTO posts (id, post_content, fellow_id)
          values (?, ?, ?)
          RETURNING *
        `;
    const { rows } = await knex.raw(query, [content, fellowId]);
    return rows;
  }

  static async list() {
    const query = `
    SELECT * FROM posts
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

  static async findPostsByFellowId(fellowId) {
    console.log("fellowId", fellowId);
    const query = `
    SELECT *
    FROM posts
    WHERE fellow_id = ?
    `;
    const { rows } = await knex.raw(query, [fellowId]);
    return rows;
  }

  static async editPost(id, newContent) {
    const query = `
    UPDATE posts
    SET content = ?
    WHERE id = ?
    RETURNING *
  `;
    const { rows } = await knex.raw(query, [newContent, id]);
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

  static async deleteByFellowId(fellowId) {
    const query = `
      DELETE 
      FROM posts
      WHERE fellow_id = ?
    `;
    const { rows } = await knex.raw(query, [fellowId]);
    return rows;
  }
}

module.exports = Post;
