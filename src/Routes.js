import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { PrivateRoute, PublicRoute, isAuth } from './_helpers';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PendingRequest } from './pages/PendingRequest';
import { ApprovedRequest } from './pages/ApprovedRequest';
import { RejectedRequest } from './pages/RejectedRequest';
import { ApprovalRequest } from './pages/ApprovalRequest';

const Routes = () => (
	<Switch>
		<PublicRoute exact path='/login' key="login" component={Login} />
		<PublicRoute exact path='/register' key="register" component={Register} />
		
		<PrivateRoute exact path='/dashboard' component={Dashboard} />
		{isAuth() && <PrivateRoute exact path='/pending-request' component={PendingRequest} />}
		{isAuth() && <PrivateRoute exact path='/approved-request' component={ApprovedRequest} />}
		{isAuth() && <PrivateRoute exact path='/rejected-request' component={RejectedRequest} />}
		{isAuth() && <PrivateRoute exact path='/request' component={ApprovalRequest} />}
		
		<Redirect to="/dashboard" />
	</Switch>
);

export default Routes;