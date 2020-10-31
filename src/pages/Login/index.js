import React, {useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Card, CardTitle,
	Form, FormGroup, Label, Input, FormText,
	Button
} from 'reactstrap';

import { check_validate_register_login_form_data } from '../../_helpers';

import { userAction } from '../../_actions';

import './Login.scss';

const Login = () => {

	const dispatch = useDispatch();
	
	// element object
	const [element, setElement] = useState({
		email: '',
		password: ''
	});

	// error object
	const [errors, setError] = useState({
		email: '',
		password: ''
	})

	// submit btn status
	const [login_btn_disable, set_login_btn_status] = useState(true);

	// handle input change - errors - submit btn
	const handleChange = (event) => {
		const {name, value} = event.target;
		setElement({
			...element,
			[name]: value
		});

		let temp_error = errors;
		check_validate_register_login_form_data(name, value, temp_error);

		setError(temp_error);

		set_login_btn_stat();
	}

	// set submit btn status
	const set_login_btn_stat = () => {
		if (element.email !== '' && element.password !== '') {
			if (errors.email === '' && errors.password === '') {
				set_login_btn_status(false);
			} else {
				set_login_btn_status(true);
			}
		} else {
			set_login_btn_status(true);
		}
	}

	const login_user = () => {
		if (element.email !== '' && element.password !== '') {
			if (errors.email === '' && errors.password === '') {
				dispatch(userAction.loginUser(element));
			}
		}
	}

	return (
		<>
			<ReactCSSTransitionGroup
				component="div"
				transitionName="TabsAnimation"
				transitionAppear={true}
				transitionAppearTimeout={0}
				transitionEnter={false}
				transitionLeave={false}>

				<div className="login__page formBox">
					<Card className="main-card mb-3">
						<CardTitle className="mb-3">Login</CardTitle>
						<hr />

						<Form>
							{/* Email input */}
							<FormGroup>
								<Label for="exampleEmail">Email</Label>
								<Input 
									type="email" 
									name="email" 
									id="exampleEmail"
									placeholder="Enter your email"
									value={element.email}
									onChange={handleChange}
									invalid={errors.email.length > 0 ? true : false}
									valid={
										(errors.email.length === 0) && (element.email) ? true : false
									}
									required />
								<FormText color="danger">
									{errors.email}
								</FormText>
							</FormGroup>

							{/* Password Input */}
							<FormGroup>
								<Label for="examplePassword">Password</Label>
								<Input 
									type="password" 
									name="password" 
									id="examplePassword"
									placeholder="Enter your password" 
									value={element.password}
									onChange={handleChange}
									invalid={errors.password.length > 0 ? true : false}
									valid={
										(errors.password.length === 0) && (element.password) ? true : false
									}
									required />
								<FormText color="danger">
									{errors.password}
								</FormText>
							</FormGroup>

							{/* Login btn */}
							<div className="d-flex align-items-center justify-content-between p-1">
								<Button 
									type="button" 
									color="primary"
									disabled ={login_btn_disable}
									onClick={login_user} >
									Login
								</Button>
								<FormGroup className="m-0">
									<Link to={`register`}>Register ?</Link>
								</FormGroup>
							</div>
						</Form>

					</Card>
				</div>
			</ReactCSSTransitionGroup>
		</>
	)
}

const mapStatetoProps = state => {
	const { isloggingIn } = state.userReducer;

	return {
		isloggingIn
	};
}

const temp = connect(mapStatetoProps)(Login);

export { temp as Login };