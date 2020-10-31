import React, {useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import {
	Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavbarText,
	Collapse
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { userAction } from '../../_actions';

import './Navbar.scss';

const TopNavbar = () => {

	const dispatch = useDispatch();

	const [is_navbar_open, setIsOpen] = useState(false);

	const toggle_navbar = () => setIsOpen(!is_navbar_open);

	const handle_logout = () => {
		dispatch(userAction.logout());
	}

	return (
		<>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand href="/dashboard">Mern Demo</NavbarBrand>
				<NavbarToggler onClick={toggle_navbar} />
				<Collapse isOpen={is_navbar_open} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink 
								activeClassName="navbar__link--active"
								className="navbar__link"
								to="/dashboard">New Request</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								activeClassName="navbar__link--active"
								className="navbar__link"
								to="/pending-request">Pending</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								activeClassName="navbar__link--active"
								className="navbar__link"
								to="/approved-request">Approved</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								activeClassName="navbar__link--active"
								className="navbar__link"
								to="/rejected-request">Rejected</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								activeClassName="navbar__link--active"
								className="navbar__link"
								to="/request">Request (for Approval)</NavLink>
						</NavItem>
					</Nav>
					<NavbarText className="notification__ico"><FontAwesomeIcon icon={faBell} /></NavbarText>
					<NavbarText className="ml-3 logout__btn" onClick={handle_logout}>Logout</NavbarText>
				</Collapse>
			</Navbar>
		</>
	)
}

const temp = connect(null)(TopNavbar);

export { temp as TopNavbar };