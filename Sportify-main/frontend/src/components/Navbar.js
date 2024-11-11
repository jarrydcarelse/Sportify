import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/Logo.png';

const Navbar = ({ loggedIn, userEmail, onLogout }) => {
  return (
    <nav>
      <div className="left-section">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>
      <div className="right-section">
        {loggedIn && (
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <span onClick={onLogout}>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



