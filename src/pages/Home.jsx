import React, { useEffect, useContext } from 'react';
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Pagination from '../components/Pagination/Pagination';
import { FavoritesContext } from '../context/FavoritesContext';
import { CompareContext } from '../context/CompareContext';
import './Home.css';

const Home = () => {
  const { pokemons, loading, error, pagination, fetchPokemons, searchPokemon } = usePokemonList();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { compareList, toggleCompare, canAddMore } = useContext(CompareContext);

  const handlePageChange = (page) => {
    fetchPokemons(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      fetchPokemons(1);
    } else {
      searchPokemon(searchTerm);
    }
  };

  const isFavorite = (pokemonId) => {
    return favorites.some(fav => fav.id === pokemonId);
  };

  const isInCompare = (pokemonId) => {
    return compareList.some(p => p.id === pokemonId);
  };

  const handleToggleCompare = (pokemon) => {
    if (!canAddMore() && !isInCompare(pokemon.id)) {
      alert('Vous ne pouvez comparer que 3 Pokémons maximum');
      return;
    }
    toggleCompare(pokemon);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="hero-icon">⚡</span>
          Bienvenue dans le Pokédex de Wassim !
          <span className="hero-icon">⚡</span>
        </h1>
        <p className="hero-subtitle">
          Découvrez tous les Pokémons et leurs statistiques
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <SearchBar onSearch={handleSearch} placeholder="Rechercher un Pokémon par nom..." />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="pokeball-loader"></div>
          <p>Chargement des Pokémons...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <p className="error-message">{error}</p>
          <button className="retry-btn" onClick={() => fetchPokemons(1)}>
            Réessayer
          </button>
        </div>
      )}

      {/* Pokemon Grid */}
      {!loading && !error && pokemons.length > 0 && (
        <>
          <div className="results-info">
            <p>
              <strong>{pagination.totalItems || 151} Pokémons</strong> disponibles
              {pagination.totalPages > 1 && ` • Page ${pagination.currentPage} sur ${pagination.totalPages}`}
            </p>
          </div>

          <div className="pokemon-grid">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                showFavorite={true}
                isFavorite={isFavorite(pokemon.id)}
                onToggleFavorite={toggleFavorite}
                showCompare={true}
                isSelected={isInCompare(pokemon.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* No Results */}
      {!loading && !error && pokemons.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h2>Aucun Pokémon trouvé</h2>
          <p>Essayez une autre recherche</p>
        </div>
      )}
    </div>
  );
};

export default Home;
