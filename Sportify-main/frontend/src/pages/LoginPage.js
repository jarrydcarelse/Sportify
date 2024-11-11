import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';
import Logo from '../images/Logo.png'; // Import the logo image

const LoginPage = ({ setLoggedIn, setUserEmail }) => {
  const [username, setUsername] = useState(''); // State for the username (email)
  const [password, setPassword] = useState(''); // State for the password
  const [error, setError] = useState(''); // State for displaying error messages
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle login process
  const handleLogin = async () => {
    setError(''); // Clear any previous errors
    console.log('Attempting to login...');

    try {
      // Make POST request to login API
      const response = await axios.post('/api/users/login', { email: username, password });
      console.log('Login successful:', response.data);

      // Set the logged-in state and user email
      setLoggedIn(true);
      setUserEmail(username);

      // Redirect to the home page after successful login
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      // Set error message from server response or default error message
      setError(err.response?.data?.error || 'An error occurred during login.');
    }
  };

  return (
    <div className="container">
      <div className="top"></div> {/* Decorative top section */}
      <div className="bottom"></div> {/* Decorative bottom section */}
      <div className="center">
        <img src={Logo} alt="Logo" /> {/* Logo image */}
        <div className="form">
          <div className="inputBox">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              required
            /> {/* Email input field */}
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            /> {/* Password input field */}
          </div>
          <div className="error">{error}</div> {/* Error message display */}
          <div className="inputBox">
            <button type="button" onClick={handleLogin}>Login</button> {/* Login button */}
          </div>
        </div>
        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> {/* Link to signup page */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
