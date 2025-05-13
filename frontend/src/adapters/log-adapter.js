import {
	fetchHandler,
	getPostOptions,
	deleteOptions,
	getPatchOptions,
} from '../utils/fetchingUtils';

// This file contains functions to interact with the log API.
const baseUrl = '/api/logs';

export const logScreentime = async ({ screentime }) => {
	return fetchHandler(`${baseUrl}`, getPostOptions({ screentime }));
};

export const updateEntry = async ({ entry }) => {
	return fetchHandler(`${baseUrl}`, getPatchOptions({ entry }));
};

export const todaysEntry = async () => {
	try {
		const response = await fetchHandler(`${baseUrl}/today`, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});
		console.log('todaysEntry response:', response);
		return response;
	} catch (error) {
		console.error("Error fetching today's entry:", error.message);
	}
};

export const checkLogStatus = async () => {
	try {
		const response = await fetchHandler(`${baseUrl}/log-status`, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});
		console.log('checkLogStatus response:', response);
		return response[0];
	} catch (error) {
		console.error('Error checking log status:', error.message);
	}
};
