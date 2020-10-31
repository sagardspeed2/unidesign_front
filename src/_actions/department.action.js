import { departmentConstant } from '../_constants';
import { departmentService } from '../_services';
import { alertMessage } from '../_helpers';

import { loaderAction } from './';

export const departmentAction = {
	get_all_department,
	get_user_from_department
};

/**
 * Get All Department
 */
function get_all_department () {
	return async dispatch => {
		dispatch(loaderOpen());
		await departmentService.get_all_department()
			.then(
				res => {
					dispatch({
						type: departmentConstant.GET_ALL,
						departments: res.data
					})
				},
				error => {
					alertMessage('error', error.response.data.message);
				}
			)
			.finally (
				() => { dispatch(loaderClose()) }
			);
	}
}

/**
 * Get User from department
 */
function get_user_from_department (department_id) {
	return async dispatch => {
		dispatch(loaderOpen());
		await departmentService.get_user_from_department(department_id)
			.then(
				res => {
					dispatch({
						type: departmentConstant.GET_USERS_FROM_DEPARTMENT,
						department_users: res.data
					})
				},
				error => {
					alertMessage('error', error.response.data.message);
				}
			)
			.finally (
				() => { dispatch(loaderClose()) }
			);
	}
}

/**
 * Handle Loading
 */
function loaderOpen() { return loaderAction.open() }
function loaderClose() { return loaderAction.close() }