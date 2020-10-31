import { toast, Slide } from 'react-toastify';

export const alertMessage = (type, msg) => {
	toast(msg, {
		transition: Slide,
		closeButton: true,
		autoClose: 3000,
		position: 'top-center',
		type: type
	});
};