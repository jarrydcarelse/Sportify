import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Admin from './pages/Admin';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail('');
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const location = useLocation(); // Get the current location

  // List of paths where the footer should not be displayed
  const noFooterPaths = ['/login', '/signup'];

  return (
    <div className="app-container">
      {loggedIn && <Navbar loggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout} />}
      <div className="content">
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/products" element={loggedIn ? <Products addToCart={addToCart} /> : <Navigate to="/login" />} />
          <Route path="/cart" element={loggedIn ? <CartPage cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={loggedIn ? <Admin addToCart={addToCart} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      {/* Conditionally render the Footer based on the current path */}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;