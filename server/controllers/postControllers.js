const Post = require('../models/Post');

// Get All Posts (Read)
const servePosts = async (req, res) => {
	const postsList = await Post.list();
	res.send(postsList);
};

// Get One Post (Read)
const servePost = async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(Number(id));

	if (!post) {
		return res.status(404).send({
			message: `No post with the id ${id}`,
		});
	}
	res.send(post);
};

// Get all posts
const serveAllPosts = async (req, res) => {
	const postsList = await Post.list();
	res.send(postsList);
};

// Create Post
const createPost = async (req, res) => {
	const { message } = req.body.message;
	const userId = req.session.userId; // Assuming user ID is stored in the session
	console.log('req body', req.body);
	if (message === undefined || userId === undefined) {
		return res.status(400).send({ message: 'Invalid message or userId' });
	}

	const newPost = await Post.create(message, Number(userId));
	res.status(201).send(newPost);
};
// Update Post
const updatePost = async (req, res) => {
	const { message } = req.body;

	if (!message) {
		return res.status(400).send({ message: 'Invalid message' });
	}

	const { id } = req.params;
	const updatedPost = await Post.editPost(Number(id), message);

	if (!updatedPost) {
		return res.status(404).send({
			message: `No post with the id ${id}`,
		});
	}

	res.send(updatedPost);
};

// Delete Post
const deletePost = async (req, res) => {
	const { id } = req.params;
	const didDelete = await Post.delete(Number(id));

	if (!didDelete) {
		return res.status(404).send({
			message: `No post with the id ${id}`,
		});
	}

	res.send({ message: `Post with id ${id} deleted successfully` });
};
// Get Posts by User ID
const servePostsByUserId = async (req, res) => {
	const { id } = req.params;
	const postsList = await Post.findPostsByUserId(Number(id));

	if (!postsList || postsList.length === 0) {
		return res.status(404).send({
			message: `No posts found for fellow with id ${id}`,
		});
	}
	res.send(postsList);
};

const deleteAllPostsByUserId = async (req, res) => {
	const { userId } = req.params;
	const didDelete = await Post.deleteAllPostsByUserId(Number(userId));

	if (!didDelete) {
		return res.status(404).send({
			message: `No posts found for user with id ${userId}`,
		});
	}

	res.send({
		message: `All posts for user with id ${userId} deleted successfully`,
	});
};

module.exports = {
	servePosts,
	servePost,
	serveAllPosts,
	createPost,
	updatePost,
	deletePost,
	servePostsByUserId,
	deleteAllPostsByUserId,
};
