import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../_helpers/Authorized';


// if not Auth, these route redirect to /
export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={props => (
			isAuth()
				? (
					<Component {...props} />
				)
				: (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				)
		)} />
	);
};


// if Auth, these route redirect to /dashboard
export const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		!isAuth()
			? (
				<Component {...props} />
			)
			: (
				<Redirect to={{ pathname: props.location.state ? props.location.state.from.pathname : '/dashboard', state: { from: props.location } }} />
			)
	)} />
);