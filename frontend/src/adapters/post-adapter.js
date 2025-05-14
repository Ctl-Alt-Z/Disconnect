import { fetchHandler } from '../utils/fetchingUtils';

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
	const [post, error] = await fetchHandler(`api/post/${id}`);
	return [post, error];
};
