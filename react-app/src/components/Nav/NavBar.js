
import React  from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import LogoutButton from '../auth/LogoutButton';
import CreateHeartModal from '../Hearts/CreateHeartModal';
import  NavStyle  from './NavStyle';
import ProfilePicture from './ProfilePicture';
import homeIcon from '../graphics/home-icon.svg'
import About from './About';
// import './NavBar.css'


const NavBar = () => {

    const sessionUser = useSelector(state => state.session.user)


    return (
        <NavStyle>
            <div className = 'nav-items'>
                <div className = 'top'>
                    <div className = 'nav-item'>
                        <About />
                    </div>
                        <div className = 'nav-item'>
                    <Link to = '/home'>
                        <img src = {homeIcon} alt = 'home' />
                        <span>Home</span>
                    </Link>
                     </div>
                    <div className = 'nav-item'>
                    {sessionUser && <><CreateHeartModal /><span>Send Heart</span></>}
                    </div>
                    </div>
            <div className = 'bottom'>
            {sessionUser && <ProfilePicture user = {sessionUser}/>}
            </div>
            </div>
        </NavStyle>
    );
}

export default NavBar;
