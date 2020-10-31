import { departmentConstant, userConstant } from '../_constants';

export function departmentReducer(state = {}, action) {
	switch (action.type) {
		case departmentConstant.GET_ALL:
			return {
				...state,
				departments: action.departments
			}
		
		case departmentConstant.GET_USERS_FROM_DEPARTMENT:
			return { 
				...state,
				department_users: action.department_users
			}
		
		case userConstant.LOGOUT:
			return {
				state: {}
			}
		default:
			return state;
	}
}