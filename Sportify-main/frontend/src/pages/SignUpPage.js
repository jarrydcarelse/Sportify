import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';
import Logo from '../images/Logo.png'; // Import the logo image

const SignUpPage = () => {
  const [name, setName] = useState(''); // State for storing the user's name
  const [email, setEmail] = useState(''); // State for storing the user's email
  const [password, setPassword] = useState(''); // State for storing the user's password
  const [message, setMessage] = useState(''); // State for storing feedback messages
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle the sign-up process
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the server to register the user
      await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      setMessage('User created successfully!'); // Set success message
      navigate('/login'); // Redirect to login page after successful sign-up
    } catch (error) {
      setMessage('Error creating user.'); // Set error message if sign-up fails
    }
  };

  return (
    <div className="container">
      <div className="top"></div> {/* Decorative top section */}
      <div className="bottom"></div> {/* Decorative bottom section */}
      <div className="center">
        <img src={Logo} alt="Logo" /> {/* Display the logo */}
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /> {/* Input field for name */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> {/* Input field for email */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> {/* Input field for password */}
          <button type="submit">Sign Up</button> {/* Sign-up button */}
        </form>
        <div className="signup-link">
          <p>Already have an account? <Link to="/login">Sign In</Link></p> {/* Link to login page */}
        </div>
        {message && <p className="message">{message}</p>} {/* Display feedback message */}
      </div>
    </div>
  );
};

export default SignUpPage;
