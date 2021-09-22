
import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginFormModal from './auth/LoginFormModal';

import LogoutButton from './auth/LogoutButton';
import SignUpFormModal from './auth/SignupFormModal';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
        <SignUpFormModal />
        </li>
        <li>
            <LoginFormModal />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
