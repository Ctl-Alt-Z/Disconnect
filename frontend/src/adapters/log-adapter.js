import {
	fetchHandler,
	getPostOptions,
	deleteOptions,
	getPatchOptions,
} from '../utils/fetchingUtils';

// This file contains functions to interact with the log API.
const baseUrl = '/api/logs';

export const logScreentime = async ({ userId, date, screentime }) => {
	return fetchHandler(
		`${baseUrl}/${userId}`,
		getPostOptions({ date, screentime })
	);
};

export const updateEntry = async ({ userId, entry }) => {
	return fetchHandler(`${baseUrl}/${userId}`, getPatchOptions({ entry }));
};
