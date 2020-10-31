import { requestConstant } from '../_constants';
import { requestService } from '../_services';
import { alertMessage, history } from '../_helpers';

import { loaderAction } from './';

export const requestAction = {
	create_new_request,
	get_request_list,
	set_request_status
};

/**
 * Create New Request
 */
function create_new_request (data) {
	return async dispatch => {
		dispatch(loaderOpen());
		dispatch({
			type: requestConstant.BUTTON_STATUS_DISABLE
		})
		await requestService.create_new_request(data)
			.then(
				res => {
					console.log(res);
					alertMessage('success', 'Request has been added successfully');
					history.push('/pending-request');
				},
				error => {
					dispatch({
						type: requestConstant.BUTTON_STATUS_ENABLE
					})
					alertMessage('error', error.response.data.message);
				}
			)
			.finally (
				() => { dispatch(loaderClose()) }
			);
	}
}

/**
 * Get Request List - pending, approved, rejected from user or department
 */
function get_request_list (_id, request_status, from) {
	return async dispatch => {
		dispatch(loaderOpen());
		await requestService.get_request_list(_id, request_status, from)
			.then(
				res => {
					dispatch({
						type: requestConstant.GET_REQUESTS,
						requests: res.data
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
 * Set Request Status
 */
function set_request_status (_id, status, callback_id) {
	return async dispatch => {
		dispatch(loaderOpen());
		await requestService.set_request_status(_id, status)
			.then(
				res => {
					console.log(res);
					dispatch(get_request_list(callback_id, 'pending', 'department'));
					alertMessage('success', 'Request status changed!');
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