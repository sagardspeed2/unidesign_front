import axios from 'axios';
import config from '../Config';

export const departmentService = {
	get_all_department,
	get_user_from_department
};

/**
 * Register new user
 */
async function get_all_department () {
	const url = `${config.apiHost}/department/`;
	
	return await axios.get(url);
}

/**
 * Get Users from department
 */
async function get_user_from_department (department_id) {
	const url = `${config.apiHost}/department/get-user`;
	const body = {
		department_id
	}
	
	return await axios.post(url, body);
}