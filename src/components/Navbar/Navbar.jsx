import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Pokédex Wassim</span>
        </Link>

        {/* Menu Toggle Button (Mobile) */}
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li className="navbar-item">
            <Link
              to="/"
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="link-icon">🏠</span>
              <span>Accueil</span>
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              to="/create"
              className={`navbar-link ${isActive('/create') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="link-icon">➕</span>
              <span>Créer</span>
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              to="/favorites"
              className={`navbar-link ${isActive('/favorites') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="link-icon">❤️</span>
              <span>Favoris</span>
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              to="/compare"
              className={`navbar-link ${isActive('/compare') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="link-icon">⚖️</span>
              <span>Comparer</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
