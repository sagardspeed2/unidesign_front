import { userConstant } from '../_constants';
import { userService } from '../_services';
import { history, alertMessage } from '../_helpers';
import { loaderAction } from './';

export const userAction = {
	refreshPage,
	loginUser,
	registerUser,
	logout
};

/**
 * Refresh Page - Get User Data
 */
function refreshPage() {
	return async dispatch => {
		try {
			const Email = await userService.getUserEmailByToken();
			const user = await userService.getUserByEmail(Email);
			dispatch(refresh(user.data));
		} catch (error) {
			localStorage.removeItem('token');
			throw (error);
		}
	}
}

/**
 * Set User Data
 */
function refresh(user) { 
	return { type: userConstant.REFRESH, user }; 
}

/**
 * Login User
 */
function loginUser (data) {
	return async dispatch => {
		dispatch(loaderOpen());

		await userService.loginUser(data)
			.then(
				res => {
					const token = res.data.token;
					const user = res.data.user;
					
					localStorage.setItem('token', token);

					dispatch(success(user));

					history.push('/dashboard');
				},
				error => {
					alertMessage('error', error.response.data.message);
					throw(error)
				}
			)
			.finally (
				() => { dispatch(loaderClose()) }
			);
	}

}

function success(user) { 
	return { type: userConstant.LOGIN_SUCCESS, user }; 
}

/**
 * Register New User
 */
function registerUser (data) {
	return async dispatch => {
		dispatch(loaderOpen());
		await userService.registerUser(data)
			.then(
				res => {
					history.push('/login');
					console.log(res);
				},
				error => {
					alertMessage('error', error.response.data.errors ? error.response.data.errors[0].message : error.response.data.message);
				}
			)
			.finally (
				() => { dispatch(loaderClose()) }
			);
	}
}

/**
 * Handle User Logout
 */
function logout () {
	return async dispatch => {
		dispatch(setIsLogout())
	}
}

function setIsLogout() {
	localStorage.clear();
	return { type: userConstant.LOGOUT };
}

/**
 * Handle Loading
 */
function loaderOpen() { return loaderAction.open() }
function loaderClose() { return loaderAction.close() }