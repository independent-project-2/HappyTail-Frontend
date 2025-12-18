import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

/**
 * Navbar Component
 * Displays the navigation bar with logo and menu items
 */
const Navbar: React.FC = () => {
  const location = useLocation();

  // Navigation menu items
  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Browse Pets', path: '/browse-pets' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/home" className="navbar-logo">
          <div className="logo-icon">
            <span className="paw-icon">🐾</span>
          </div>
          <div className="logo-text">
            <span className="logo-main">For Your</span>
            <span className="logo-sub">Happiness</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.name} className="navbar-item">
              <Link
                to={item.path}
                className={`navbar-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
