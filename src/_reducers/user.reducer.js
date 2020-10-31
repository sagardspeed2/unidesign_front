import { userConstant } from '../_constants';

export function userReducer(state = {}, action) {
	switch (action.type) {
		case userConstant.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user,
				isTried: true
			};
			
		case userConstant.REFRESH:
			return {
				...state,
				loggedIn: true,
				user: action.user,
				isTried: true
			};

		case userConstant.LOGOUT:
			return {
				loggedIn: false
			};

		default:
			return state;
	}
}