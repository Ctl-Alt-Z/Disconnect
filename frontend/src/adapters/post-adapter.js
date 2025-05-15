import { fetchHandler, getPostOptions } from '../utils/fetchingUtils';

export const getAllPosts = async () => {
	try {
		const [allPost, error] = await fetchHandler('api/posts/');
		if (error) {
			console.error('Error fetching posts:', error.message);
			return [];
		}
		console.log(allPost);
		return allPost;
	} catch (error) {
		console.error('Unexpected error fetching posts:', error.message);
		return [];
	}
};

export const posts = async (id) => {
	const [post, error] = await fetchHandler(`api/posts/${id}`);
	return [post, error];
};

export const createPost = async (message) => {
	const [post, err] = await fetchHandler(
		'api/posts/',
		getPostOptions({ message })
	);
	console.log('Post created:', post);
	return post;
};
