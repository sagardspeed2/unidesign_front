import React from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import './Loader.scss';

const Loader = (props) => {
	return (
		<>
			{
				props.isOpen 
					? <div className="loading">
						<ClipLoader
							sizeUnit={'px'}
							size={120}
							color={'#007bff'}
							loading={true}
						/>
						<span className="text">
							{props.message ? props.message : ''}
						</span>
					</div>
					: ''
			}
		</>
	);
}

const mapStatetoProps = state => {
	let { message, isOpen } = state.loaderReducer;

	isOpen = isOpen === undefined ? false : isOpen;

	return {
		message,
		isOpen
	};
}

const temp = connect(mapStatetoProps)(Loader);

export { temp as Loader };