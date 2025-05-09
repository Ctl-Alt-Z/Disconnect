const Log = require('../models/Log');
const User = require('../models/User');

/*
POST /api/logs/:id
Creates a new log (screentime) for the user with the given ID
*/

exports.logScreentime = async (req, res) => {
	const userId = req.session.id; // Assuming user ID is stored in the session
	console.log('User ID:', userId);
	const { screentime } = req.body;

	console.log('Request Body:', req.body);

	if (!screentime) {
		return res.status(400).send({ message: 'Date and screentime required.' });
	}
	const currentDate = new Date().toISOString().split('T')[0];
	try {
		const log = await Log.create(3, currentDate, screentime);
		res.status(201).send(log);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Failed to create log.' });
	}
};

/*
PATCH /api/logs/:id
Updates a log table to add they user entry for the logged user
*/

exports.updateLog = async (req, res) => {
	const userId = req.session.userId; // Assuming user ID is stored in the session
	const { entry } = req.body;

	if (!entry) {
		return res.status(400).send({ message: 'Entry required.' });
	}
	try {
		const log = await Log.update(entry, 3);
		res.status(201).send(log);
		if (!log) {
			return res.status(404).send({ message: 'Log not found.' });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Failed to update log.' });
	}
};
