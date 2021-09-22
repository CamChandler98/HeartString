
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from './auth/LoginFormModal';

import LogoutButton from './auth/LogoutButton';
import SignUpFormModal from './auth/SignupFormModal';

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user)
  return (
    <nav>
      <ul>
        <li>
        {!sessionUser && <SignUpFormModal />}
        </li>
        <li>
        {!sessionUser &&   <LoginFormModal />}
        </li>
        <li>
         { sessionUser && <LogoutButton /> }
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
