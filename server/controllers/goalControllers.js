const Goal = require("../models/Goal");

/*
POST /api/goals
Creates a new goal
*/
exports.createGoal = async (req, res) => {
  const { goal_num, goal_string, logs_id } = req.body;

  if (!goal_num || !goal_string || !logs_id) {
    return res
      .status(400)
      .send({ message: "num, string, and logs_id are required." });
  }

  try {
    const newGoal = await Goal.create(goal_num, goal_string, logs_id);
    console.log("created new goal: ", newGoal);
    return res.status(201).send(newGoal);
  } catch (error) {
    console.error("Error creating goal:", error.message);
    return res.status(500).send({ message: "Internal Server Error." });
  }
};

/*
GET /api/goals/:id
Returns a single goal (if found)
*/
exports.getGoalById = async (req, res) => {
  const { id } = req.params;

  try {
    const goal = await Goal.findById(id);

    if (!goal) {
      return res.status(404).send({ message: "Goal not found." });
    }

    res.send(goal);
  } catch (error) {
    console.error("Error retrieving goal:", error.message);
    res.status(500).send({ message: "Internal Server Error." });
  }
};

/*
GET /api/goals
Returns all goals associated to this user
*/
exports.getGoalsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const goals = await Goal.findByUserId(userId);

    if (!goals) {
      return res.status(404).send({ message: "This person has no goals." });
    }

    res.send(goals);
  } catch (error) {
    console.error("Error retrieving goals for this person:", error.message);
    res.status(500).send({ message: "Internal Server Error." });
  }
};
