import axios from 'axios';

import config from '../Config';
import { getToken } from '../_helpers';

export const requestService = {
	create_new_request,
	get_request_list,
	set_request_status
};

/**
 * Create new request
 */
async function create_new_request (data) {
	const url = `${config.apiHost}/request/create`;
	axios.defaults.headers.common['x-access-token'] = getToken();
	
	return await axios.post(url, data);
}

/**
 * Get Request List - pending, approved, rejected from user or department
 */
async function get_request_list (_id, request_status, from) {
	const url = `${config.apiHost}/request/get`;
	axios.defaults.headers.common['x-access-token'] = getToken();

	const body = {
		_id, request_status, from
	}
	
	return await axios.post(url, body);
}

/**
 * Set Request Status
 */
async function set_request_status (_id, status) {
	const url = `${config.apiHost}/request/setStatus`;
	axios.defaults.headers.common['x-access-token'] = getToken();

	const body = {
		_id, status
	}
	
	return await axios.post(url, body);
}