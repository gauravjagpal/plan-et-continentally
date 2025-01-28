import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';
import { useMediaQuery } from 'react-responsive';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const history = useHistory();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
            history.push('/') //redirect a user to the home page
        } catch (err) {
            console.log(err);
        }
    }

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' }); //Media query to put all nav items into a toggle menu

    const loggedInIcons = (
        <>
            <NavLink
                exact
                to="/posts/create"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                <i className="far fa-plus-square"></i> Add Post
            </NavLink>
            <NavLink
                exact
                to="/feed"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                <i className="fas fa-stream"></i> Feed
            </NavLink>
            <NavLink
                exact
                to="/favourites"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                <i className="fas fa-heart"></i> Favourites
            </NavLink>
            {isMobile ? ( //Change how the Navbar elements render for mobile viewing
                <>
                    <NavLink
                        exact
                        to={`/profiles/${currentUser?.profile_id}`}
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        onClick={() => setExpanded(false)}
                    >
                        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
                        Profile
                    </NavLink>
                    <NavLink
                        exact
                        to="/trips/create"
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        onClick={() => setExpanded(false)}
                    >
                        <i className="fas fa-plane"></i> Add Trips
                    </NavLink>
                    <NavLink
                        exact
                        to="/trips/mytrips"
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        onClick={() => setExpanded(false)}
                    >
                        <i className="fas fa-suitcase"></i> My Trips
                    </NavLink>
                    <NavLink
                        to="/"
                        className={styles.NavLink}
                        onClick={() => {
                            handleSignOut();
                            setExpanded(false);
                        }}
                    >
                        <i className="fas fa-sign-out-alt"></i> Sign Out
                    </NavLink>
                </>
            ) : (
                <NavDropdown
                    title={
                        <span className={styles.NavLink}>
                            <Avatar
                                src={currentUser?.profile_image}
                                text="Profile"
                                height={40}
                            />
                            <span className={styles.Username}>
                                {currentUser?.username}
                            </span>
                        </span>
                    }
                    id="profile-dropdown"
                    className="custom-dropdown"
                >
                    <NavDropdown.Item as={NavLink} to={`/profiles/${currentUser?.profile_id}`}>
                        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
                        Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={`/trips/create`}>
                        <i className="fas fa-plane"></i> Add Trips
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={`/trips/mytrips`}>
                        <i className="fas fa-suitcase"></i> My Trips
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleSignOut}>
                        <i className="fas fa-sign-out-alt"></i> Sign Out
                    </NavDropdown.Item>
                </NavDropdown>
            )};
        </>
    );

    const loggedOutIcons = (
        <>
            <NavLink
                exact to="/signin"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                <i className='fas fa-sign-in-alt'></i> Sign in
            </NavLink>
            <NavLink
                exact to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                <i className='fas fa-user-plus'></i> Sign up
            </NavLink>
        </>
    );
    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fix="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                {/* Making the h1 clickable */}
                <NavLink to="/" className={styles.NavLink}>
                    <h1>Plan-et Continentally</h1>
                </NavLink>
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink
                            exact to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            onClick={() => setExpanded(false)}
                        >
                            <i className='fas fa-home'></i> Home
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar