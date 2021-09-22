
import React  from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import ProfilePicture from './ProfilePicture';


const NavBar = () => {

    const sessionUser = useSelector(state => state.session.user)


    return (
        <nav>
            {sessionUser && <ProfilePicture user = {sessionUser}/>}
        </nav>
    );
}

export default NavBar;
