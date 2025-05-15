const knex = require("../db/knex");

class Goal {
  constructor({ goal_num, goal_string, logs_id }) {
    this.num = goal_num;
    this.string = goal_string;
    this.logId = logs_id;
  }

  static async create(num, string, logId) {
    const query = `INSERT INTO goals (goal_num, goal_string, logs_id)
     VALUES (?, ?, ?) RETURNING *`;
    const result = await knex.raw(query, [num, string, logId]);
    const rawGoalData = result.rows[0];
    return new Goal(rawGoalData);
  }

  static async findByUserId(userId) {
    const query = `
      SELECT *
      FROM logs
      INNER JOIN goals
      ON logs.id = goals.logs_id
      WHERE user_id = ?;
    `;
    const result = await knex.raw(query, [userId]);
    const rawGoalDataArray = result.rows;
    // return rawGoalDataArray;
    const goalsArray = rawGoalDataArray.map(
      (rawGoalData) => new Goal(rawGoalData)
    );
    return goalsArray;
  }

  //   static async findById(id) {
  //     const query = `SELECT goal_id, goal_num, goal_string, logs.id
  //     FROM goal
  //     JOIN logs
  //     ON logs.id = goals.logs_id`;
  //     const result = await knex.raw(query, [id]);
  //     const rawGoalData = result.rows[0];
  //     return rawGoalData ? new Goal(rawGoalData) : null;
  //   }
}

module.exports = Goal;
