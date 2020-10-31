import { loaderConstant } from '../_constants';

export const loaderAction = {
	open,
	close
};

function open(message) {
	return { 
		type: loaderConstant.OPEN,
		message
	};
}

function close() {
	return { 
		type: loaderConstant.CLOSE,
	};
}