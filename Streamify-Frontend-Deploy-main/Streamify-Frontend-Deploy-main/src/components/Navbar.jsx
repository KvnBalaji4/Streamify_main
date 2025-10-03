// src/Navbar.jsx
import React, { useState } from 'react';
import './../assets/css/Navbar.css';
import { redirect, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  
    const navigate = useNavigate();
  
    const redirect = () => {
      navigate('/payment'); // If you have a route set up for /payment
    };
  
    



const handleLogout = () => {
  // Clear any authentication info (e.g., localStorage, cookies)
  localStorage.removeItem('authToken'); // or whatever key you're using
  sessionStorage.clear();

  // Optional: reset user state if using context

  // Redirect to login or landing page
  navigate('/');
};

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      {/* Left Side: Site Name */}
      <h1 className="site-name">
        Streamify
      </h1>

      {/* Center: Menu Items (For Desktop and Mobile) */}
      <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
        <ul className="menu">
          <li><a href="/userDashboard">Home</a></li>
         
          
          <li><a href="/recently-added">Recently Added</a></li>
          <li><a href="/my-list">My List</a></li>
        </ul>
        {/* Hamburger Menu for Mobile */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
      </div>

      {/* Center: Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Right Side: User Profile Logo */}
      <div className="profile-logo" onClick={toggleProfileMenu}>
        <img
          src="../images/profile.png" // Update this path based on your actual image location
          alt="User  Profile"
          className="profile-image"
        />
      </div>

      {/* Profile Menu */}
      {isProfileMenuOpen && (
        <div className="profile-menu">
          <ul>
            <li><a href="/my-profile">My Profile</a></li>
            <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
           </li>
           <li>
            <button onClick={redirect} className="subscribe">Purchase Subscription</button>
           </li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
