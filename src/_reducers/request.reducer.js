import { requestConstant, userConstant } from '../_constants';

export function requestReducer(state = {}, action) {
	switch (action.type) {
		case requestConstant.GET_REQUESTS:
			return {
				...state,
				requests: action.requests
			};

		case requestConstant.BUTTON_STATUS_DISABLE:
			return {
				...state,
				btn_disable: true
			};
		
		case requestConstant.BUTTON_STATUS_ENABLE:
			return { 
				...state,
				btn_disable: false
			};
		
		case userConstant.LOGOUT:
			return {
				state: {}
			}
		default:
			return state;
	}
}