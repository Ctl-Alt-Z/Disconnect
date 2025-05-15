///////////////////////////////
// Imports
///////////////////////////////

require('dotenv').config();
const path = require('path');
const express = require('express');

// middleware imports
const handleCookieSessions = require('./middleware/handleCookieSessions');
const checkAuthentication = require('./middleware/checkAuthentication');
const logRoutes = require('./middleware/logRoutes');
const logErrors = require('./middleware/logErrors');

// controller imports
const authControllers = require('./controllers/authControllers');
const userControllers = require('./controllers/userControllers');
const logControllers = require('./controllers/logControllers');
const goalControllers = require('./controllers/goalControllers');
const app = express();

const {
	servePosts,
	servePost,
	serveAllPosts,
	createPost,
	updatePost,
	deletePost,
	servePostsByUserId,
	deleteAllPostsByUserId,
} = require('./controllers/postControllers');

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

///////////////////////////////
// Auth Routes
///////////////////////////////

app.post('/api/auth/register', authControllers.registerUser);
app.post('/api/auth/login', authControllers.loginUser);
app.get('/api/auth/me', authControllers.showMe);
app.delete('/api/auth/logout', authControllers.logoutUser);

///////////////////////////////
// User Routes
///////////////////////////////

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
app.get('/api/users', checkAuthentication, userControllers.listUsers);
app.get('/api/users/:id', checkAuthentication, userControllers.showUser);
app.patch('/api/users/:id', checkAuthentication, userControllers.updateUser);

///////////////////////////////
// Log Routes
///////////////////////////////

app.post('/api/logs/', logControllers.logScreentime);
app.patch('/api/logs/', logControllers.updateLog);
app.get('/api/logs/today', logControllers.getEntry);
app.get('/api/logs/log-status', logControllers.checkLogStatus);
// app.delete('/api/logs/:id', logControllers.deleteLog);
// app.get('/api/logs/today, logControllers.getTodayLog)

///////////////////////////////
// Goal Routes
///////////////////////////////
app.post('/api/goals/', goalControllers.createGoal);

///////////////////////////////
// Post Routes
///////////////////////////////

app.get('/api/posts/:id', checkAuthentication, servePost);
app.get('/api/posts', checkAuthentication, serveAllPosts);
app.post('/api/posts', checkAuthentication, createPost);
// app.patch("/api/posts/:id", checkAuthentication, updatePost);
app.delete('/api/posts/:id', checkAuthentication, deletePost);
//app.get("/api/users/:id/posts", servePostsByUserId);
// app.delete("/api/users/:id/posts", deleteAllPostsByUserId);

///////////////////////////////
// Fallback Routes
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get('*', (req, res, next) => {
	if (req.originalUrl.startsWith('/api')) return next();
	res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use(logErrors);

///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
