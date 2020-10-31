import React, {useEffect, useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Card, CardTitle,
	Form, FormGroup, Label, Input,
	Button
} from 'reactstrap';
import Select from 'react-select';

import { departmentAction, requestAction } from '../../_actions';
import { alertMessage } from '../../_helpers';

import './NewRequestForm.scss';

const RequestForm = (props) => {

	const dispatch = useDispatch();

	const [element, setElement] = useState({
		request_by: props.user._id,
		department: '',
		assign_user: '',
		message: ''
	});
	const [department, setDepartment] = useState(null);
	const [assign_user, setAssign_user] = useState(null);

	// get all department
	useEffect(() => {
		dispatch(departmentAction.get_all_department());
	}, []);

	// handle department change
	const handle_department_change = selected_opiton => {
		setDepartment(selected_opiton);

		setElement({
			...element,
			'department': selected_opiton.value
		});

		dispatch(departmentAction.get_user_from_department(selected_opiton.value));
	}

	// handle assign user change
	const handle_assign_user_change = selected_opiton => {
		setAssign_user(selected_opiton);

		setElement({
			...element,
			'assign_user': selected_opiton.value
		});
	}

	// handle input change
	const handleChange = (event) => {
		const {name, value} =  event.target;

		setElement({
			...element,
			[name]: value
		});
	}

	// create new request
	const create_new_request = () => {
		if (element.department === '') {
			alertMessage('error', 'Please select department!');
			return false;
		}

		if (element.assign_user === '') {
			alertMessage('error', 'Please select user to assign request!');
			return false;
		}

		if (element.message === '') {
			alertMessage('error', 'Please enter message!');
			return false;
		}

		dispatch(requestAction.create_new_request(element));
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
				<div className="dashboard__page new__request__form formBox">
					<Card className="main-card mb-3">
						<CardTitle className="mb-3">New Request</CardTitle>
						<hr />
						<Form>
							<FormGroup>
								<Label for="department">Department</Label>
								<Select
									value={department}
									className="basic-single"
									classNamePrefix="select"
									name="color"
									onChange={handle_department_change}
									options={
										props.departments && 
											props.departments.filter(ele => ele._id !== props.user.department._id)
												.map(element => {
													return (
														{
															value: element._id,
															label: element.DepartmentName
														}
													)
												})
									}
								/>
							</FormGroup>

							<FormGroup>
								<Label for="department">User</Label>
								<Select
									value={assign_user}
									className="basic-single"
									classNamePrefix="select"
									name="color"
									onChange={handle_assign_user_change}
									options={
										props.department_users &&
											props.department_users.map(element => {
												return (
													{
														value: element._id,
														label: element.Username
													}
												)
											})
									}
								/>
							</FormGroup>

							<FormGroup>
								<Label for="email">Message</Label>
								<Input 
									type="textarea" 
									name="message" 
									id="message"
									value={element.message}
									placeholder="Enter your message"
									onChange={handleChange}
									required />
							</FormGroup>

							<Button 
								type="button" 
								onClick={create_new_request}
								color="primary"
								disabled={props.btn_disable} >
								Create Request
							</Button>
						</Form>
					</Card>
				</div>
			</ReactCSSTransitionGroup>
		</>
	)
}

const mapStatetoProps = state => {
	const { user } = state.userReducer;
	const { departments, department_users } = state.departmentReducer;
	const { btn_disable } = state.requestReducer;

	return {
		user,
		departments,
		department_users,
		btn_disable
	};
}

const temp = connect(mapStatetoProps)(RequestForm);

export { temp as RequestForm };