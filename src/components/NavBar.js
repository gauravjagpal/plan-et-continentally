import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';


const NavBar = () => {
    const currentUser = useCurrentUser();
    const loggedInIcons = <>{currentUser?.username}</>
    const loggedOutIcons = 
    <>
        <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}><i className='fas fa-sign-in-alt'></i> Sign in</NavLink>
        <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}><i className='fas fa-user-plus'></i> Sign up</NavLink>
    </>
    return (
        <Navbar className={styles.NavBar} expand="md" fix="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}><i className='fas fa-home'></i> Home</NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar