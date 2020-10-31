import React, {useEffect} from 'react';
import { Router } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';

import { Loader } from './components/Loader';

import { history } from './_helpers';

import { userAction } from './_actions';

import Routes from './Routes';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userAction.refreshPage());
	}, []);

	return (
		<>
			<Loader />
			<ToastContainer />
			<Router history={history}>
				<>
					<Routes />
				</>
			</Router>
		</>
	);
}

const mapStatetoProps = state => {
	const { user } = state.userReducer;

	return {
		user
	}
};

const temp = connect(mapStatetoProps)(App);

export { temp as App };