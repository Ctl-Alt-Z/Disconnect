/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('goals').del();
  await knex("goals").insert([
    { goal_num: 3, goal_string: "rowValue2", logs_id: 1 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 2 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 3 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 4 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 5 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 6 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 7 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 8 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 9 },
    { goal_num: 3, goal_string: "rowValue2", logs_id: 10 },
    { goal_num: 5, goal_string: "newGoal1", logs_id: 11 },
    { goal_num: 9, goal_string: "newGoal2", logs_id: 12 },
    { goal_num: 2, goal_string: "newGoal3", logs_id: 13 },
    { goal_num: 5, goal_string: "newGoal4", logs_id: 14 },
    { goal_num: 5, goal_string: "newGoal5", logs_id: 15 },
    { goal_num: 7, goal_string: "newGoal6", logs_id: 16 },
    { goal_num: 4, goal_string: "newGoal7", logs_id: 17 },
  ]);
};
