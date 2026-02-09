import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPokemonId, getTypeColor } from '../../utils/helpers';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, showFavorite = false, isFavorite = false, onToggleFavorite, showCompare = false, isSelected = false, onToggleCompare }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite && onToggleFavorite(pokemon);
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    onToggleCompare && onToggleCompare(pokemon);
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      {/* Actions */}
      <div className="pokemon-card-actions">
        {showFavorite && (
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
        {showCompare && (
          <button
            className={`compare-btn ${isSelected ? 'active' : ''}`}
            onClick={handleCompareClick}
            title={isSelected ? 'Retirer de la comparaison' : 'Ajouter à la comparaison'}
          >
            {isSelected ? '✓' : '+'}
          </button>
        )}
      </div>

      {/* Image */}
      <div className="pokemon-card-image">
        <img
          src={pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name?.french || pokemon.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />
      </div>

      {/* ID et Nom */}
      <div className="pokemon-card-header">
        <span className="pokemon-card-id">{formatPokemonId(pokemon.id)}</span>
        <h3 className="pokemon-card-name">{pokemon.name?.french || pokemon.name}</h3>
      </div>

      {/* Types */}
      <div className="pokemon-card-types">
        {pokemon.type?.map((type) => (
          <span
            key={type}
            className="type-badge"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Statistiques */}
      <div className="pokemon-card-stats">
        <div className="stat">
          <span className="stat-label">HP</span>
          <span className="stat-value">{pokemon.base?.HP || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">ATK</span>
          <span className="stat-value">{pokemon.base?.Attack || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">DEF</span>
          <span className="stat-value">{pokemon.base?.Defense || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
