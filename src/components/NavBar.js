import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch(err) {
            console.log(err)
        }
    }

    const addPostIcon = (
        <NavLink exact to="/posts/create" className={styles.NavLink} activeClassName={styles.Active}><i className='far fa-plus-square'></i>Add post</NavLink>
    ) 
    const loggedInIcons = <>
        <NavLink exact to="/feed" className={styles.NavLink} activeClassName={styles.Active}><i className='fas fa-stream'></i>Feed</NavLink>
        <NavLink exact to="/favourites" className={styles.NavLink} activeClassName={styles.Active}><i className='fas fa-heart'></i>Favourites</NavLink>
        <NavLink exact to="/" className={styles.NavLink} onClick={handleSignOut}><i className='fas fa-sign-out-alt'></i>Sign Out</NavLink>
        <NavLink exact to={`/profiles/${currentUser?.profile_id}`} className={styles.NavLink}>
            <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            <span className={styles.Username}>{currentUser?.username}</span>
        </NavLink>
        
        
    </>
    const loggedOutIcons = 
    <>
        <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}><i className='fas fa-sign-in-alt'></i> Sign in</NavLink>
        <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}><i className='fas fa-user-plus'></i> Sign up</NavLink>
    </>
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
                {currentUser && addPostIcon}
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
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