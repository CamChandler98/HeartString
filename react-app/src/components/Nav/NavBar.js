
import React  from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateHeartModal from '../Hearts/CreateHeartModal';
import './NavBar.css'
import ProfilePicture from './ProfilePicture';


const NavBar = () => {

    const sessionUser = useSelector(state => state.session.user)


    return (
        <nav>
            {sessionUser && <CreateHeartModal />}
            {sessionUser && <ProfilePicture user = {sessionUser}/>}
        </nav>
    );
}

export default NavBar;
