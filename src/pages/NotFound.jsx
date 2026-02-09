import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">🔍</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page non trouvée</h2>
        <p className="not-found-message">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="home-link">
          🏠 Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
