import {
	getPostOptions,
	fetchHandler,
	deleteOptions,
} from '../utils/fetchingUtils';

export const favorites = async ({ userId }) => {
	try {
		const [favoritePost, error] = await fetchHandler(
			`/api/users/${userId}/favorites`
		);
		if (error) {
			console.error('Error fetching favorites', error.message);
			return [];
		}
		return favoritePost;
	} catch (error) {
		console.error('Error fetching favorites', error.message);
		return [];
	}
};

export const getFavoritesByPostId = async ({ postId }) => {
	try {
		const [favorites, error] = await fetchHandler(
			`/api/posts/${postId}/favorites`
		);
		if (error) {
			console.error('Error fetching favorites for post', error.message);
			return [];
		}
		return favorites;
	} catch (error) {
		console.error('Error fetching favorites for post', error.message);
		return [];
	}
};

export const createFavorites = async ({ postId }) => {
	return fetchHandler(`/api/favorites`, getPostOptions({ postId }));
};

export const deleteFavorite = async (favoriteId) => {
	return fetchHandler(`/api/favorites/${favoriteId}`, deleteOptions);
};
