import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { CompareContext } from '../context/CompareContext';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import './Favorites.css';

const Favorites = () => {
  const { favorites, clearFavorites, toggleFavorite } = useContext(FavoritesContext);
  const { compareList, toggleCompare, canAddMore } = useContext(CompareContext);

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
    <div className="favorites-page">
      {/* Header */}
      <div className="favorites-header">
        <h1 className="favorites-title">
          <span className="title-icon">❤️</span>
          Mes Favoris
        </h1>

        {favorites.length > 0 && (
          <button className="clear-all-btn" onClick={clearFavorites}>
            🗑️ Tout supprimer
          </button>
        )}
      </div>

      {/* Statistiques */}
      {favorites.length > 0 && (
        <div className="favorites-stats">
          <div className="stat-card">
            <div className="stat-value">{favorites.length}</div>
            <div className="stat-label">Pokémons favoris</div>
          </div>
        </div>
      )}

      {/* Liste des favoris */}
      {favorites.length > 0 ? (
        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              showFavorite={true}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              showCompare={true}
              isSelected={isInCompare(pokemon.id)}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">💔</span>
          <h2>Aucun favori pour le moment</h2>
          <p>Ajoutez des Pokémons à vos favoris pour les retrouver ici</p>
          <Link to="/" className="browse-btn">
            🔍 Explorer les Pokémons
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
