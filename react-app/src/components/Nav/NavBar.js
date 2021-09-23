
import React  from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LogoutButton from '../auth/LogoutButton';
import CreateHeartModal from '../Hearts/CreateHeartModal';
import  NavStyle  from './NavStyle';
import ProfilePicture from './ProfilePicture';
// import './NavBar.css'


const NavBar = () => {

    const sessionUser = useSelector(state => state.session.user)


    return (
        <NavStyle>
            {sessionUser && <CreateHeartModal />}
            {sessionUser && <ProfilePicture user = {sessionUser}/>}
        </NavStyle>
    );
}

export default NavBar;
