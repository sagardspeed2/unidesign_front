import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import DataTable from 'react-data-table-component';

import { TopNavbar } from '../../components/Navbar';

import { requestAction } from '../../_actions';

import './PendingRequest.scss';

const PendingRequest = (props) => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(requestAction.get_request_list(props.user._id, 'Pending', 'user'));
	}, []);

	const columns = [
		{
			name: 'Created By',
			sortable: true,
			// eslint-disable-next-line react/display-name
			cell: row => <div>{ row.request_by.Username }</div>
		},
		{
			name: 'Assign To',
			sortable: true,
			// eslint-disable-next-line react/display-name
			cell: row => <div>{ row.assign_to.Username }</div>
		},
		{
			name: 'Department',
			sortable: true,
			// eslint-disable-next-line react/display-name
			cell: row => <div>{ row.department.DepartmentName }</div>
		}
	];

	const customStyles = {
		headCells: {
			style: {
				fontSize: '14px',
				fontWeight: 'bold',
				borderBottom: '2px solid #e9ecef',
				borderTop: '1px solid #e9ecef'
			},
		}
	};

	return (
		<>
			<TopNavbar />
			<ReactCSSTransitionGroup
				component="div"
				transitionName="TabsAnimation"
				transitionAppear={true}
				transitionAppearTimeout={0}
				transitionEnter={false}
				transitionLeave={false}>
				<Container>
					<Row>
						<Col md="12">
							<Card className="main-card mb-3">
								<CardBody>
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center justify-content-between">
											<CardTitle className="m-0 mr-2 font-weight-bolder my-3">Pending Requests</CardTitle>
										</div>
									</div>
									<DataTable
										columns={columns}
										customStyles={customStyles}
										data={props.requests}
										noHeader={true}
										pagination={true}
									/>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</ReactCSSTransitionGroup>
		</>
	)
}

const mapStatetoProps = state => {
	const { user } = state.userReducer;
	const { requests } = state.requestReducer;

	return {
		user,
		requests
	};
}

const temp = connect(mapStatetoProps)(PendingRequest);

export { temp as PendingRequest };