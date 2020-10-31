import { loaderConstant } from '../_constants';

const initialState = {isOpen: false, messages: ''}

export function loaderReducer(state = initialState, action) {
	switch (action.type) {
		case loaderConstant.OPEN:
			return {
				messages: action.messages,
				isOpen: true
			};
		case loaderConstant.CLOSE:
			return {
				messages: '',
				isOpen: false
			};
		default:
			return state;
	}
}