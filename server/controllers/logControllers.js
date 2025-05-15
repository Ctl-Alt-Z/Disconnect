const Log = require("../models/Log");
const User = require("../models/User");

/*
POST /api/logs/:id
Creates a new log (screentime) for the user with the given ID
*/

exports.logScreentime = async (req, res) => {
  const userId = req.session.userId; // Assuming user ID is stored in the session
  console.log("User ID:", userId);
  const { screentime } = req.body;

  console.log("Request Body:", req.body);

  if (screentime === undefined || screentime === null) {
    return res.status(400).send({ message: "Screentime required." });
  }
  const currentDate = new Date().toISOString().split("T")[0];
  try {
    // Check if log already exists for today
    const existingLog = await Log.findByUserAndDate(userId, currentDate);
    // if (existingLog) {
    // 	return res
    // 		.status(400)
    // 		.send({ message: 'Screen time already logged for today.' });
    // }
    const log = await Log.create(userId, currentDate, screentime);
    res.status(201).send(log);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create log." });
  }
};

/*
PATCH /api/logs/:id
Updates a log table to add they user entry for the logged user
*/

exports.updateLog = async (req, res) => {
  const userId = req.session.userId; // Assuming user ID is stored in the session
  console.log("User ID:", userId);

  const { entry } = req.body;

  if (!entry) {
    return res.status(400).send({ message: "Entry required." });
  }

  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const existingLog = await Log.findByUserAndDate(userId, currentDate);

    if (!existingLog) {
      return res.status(404).send({ message: "Log not found." });
    }

    const log = await Log.update(entry, existingLog.id);
    res.status(201).send(log);
    if (!log) {
      return res.status(404).send({ message: "Log not found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to update log." });
  }
};

exports.getEntry = async (req, res) => {
  const userId = req.session.userId; // Assuming user ID is stored in the session
  console.log("User ID:", userId);

  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const entry = await Log.findByUserAndDate(userId, currentDate);

    if (!entry) {
      return res.status(404).send({ message: "No log found today." });
    }

    res.status(200).send(entry);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to retrieve log." });
  }
};

exports.getLog = async (req, res) => {
  const userId = req.session.userId; // Assuming user ID is stored in the session
  console.log("User ID:", userId);

  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const log = await Log.findByUserAndDate(userId, currentDate);
    console.log("Log found:", log);
    if (!log) {
      // instead ofjust returning a boolean, let's return thelog
      // object itselfso we still have access to log.id in the frontend
      // when you refresh the  page without  having  filled the form -meow
      return res.status(200).send({});
    }

    return res.status(200).send(log);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to check log." });
  }
};
