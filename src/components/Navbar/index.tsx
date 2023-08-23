import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import StringConstants from 'constants/strings';
import './index.css';

const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuth();
  console.log({"navbar": isAuthenticated});

  return (
    <nav id="navbar" className="navbar">
      <ul className="navbar-links">
        <li><NavLink to={isAuthenticated ? '/myaccount' : '/'}>{StringConstants.HOME}</NavLink></li>
        <li><NavLink onClick={isAuthenticated ? logout : () => null} to={'/login'}>{isAuthenticated ? StringConstants.LOGOUT : StringConstants.LOGIN}</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
