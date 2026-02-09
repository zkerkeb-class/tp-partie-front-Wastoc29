import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from './pages/Home';
import Details from './pages/Details';
import Create from './pages/Create';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import NotFound from './pages/NotFound';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <CompareProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<Details />} />
                <Route path="/create" element={<Create />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </CompareProvider>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
