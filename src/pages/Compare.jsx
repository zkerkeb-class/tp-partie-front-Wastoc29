import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CompareContext } from '../context/CompareContext';
import { formatPokemonId, getTypeColor, calculateTotalStats } from '../utils/helpers';
import './Compare.css';

const Compare = () => {
  const { compareList, removeFromCompare, clearCompareList } = useContext(CompareContext);

  const getStatMax = (stat) => {
    if (compareList.length === 0) return 0;
    return Math.max(...compareList.map(p => p.base[stat]));
  };

  const stats = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];

  return (
    <div className="compare-page">
      {/* Header */}
      <div className="compare-header">
        <h1 className="compare-title">
          <span className="title-icon">⚖️</span>
          Comparateur de Pokémons
        </h1>

        {compareList.length > 0 && (
          <button className="clear-all-btn" onClick={clearCompareList}>
            🗑️ Tout effacer
          </button>
        )}
      </div>

      {/* Info */}
      <div className="compare-info">
        <p>
          {compareList.length === 0
            ? 'Ajoutez des Pokémons pour les comparer (maximum 3)'
            : `${compareList.length}/3 Pokémons sélectionnés`}
        </p>
      </div>

      {/* Comparaison */}
      {compareList.length > 0 ? (
        <>
          {/* Cartes des Pokémons */}
          <div className="compare-grid">
            {compareList.map((pokemon) => (
              <div key={pokemon.id} className="compare-card">
                <button
                  className="remove-btn"
                  onClick={() => removeFromCompare(pokemon.id)}
                  title="Retirer"
                >
                  ✕
                </button>

                <div className="card-image">
                  <img
                    src={pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name?.french}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                </div>

                <div className="card-header">
                  <span className="card-id">{formatPokemonId(pokemon.id)}</span>
                  <h3 className="card-name">{pokemon.name?.french}</h3>
                </div>

                <div className="card-types">
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

                <div className="card-total">
                  <span className="total-label">Total</span>
                  <span className="total-value">{calculateTotalStats(pokemon.base)}</span>
                </div>
              </div>
            ))}

            {/* Placeholders si moins de 3 */}
            {[...Array(3 - compareList.length)].map((_, idx) => (
              <div key={`placeholder-${idx}`} className="compare-card placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">➕</span>
                  <p>Ajoutez un Pokémon</p>
                  <Link to="/" className="add-link">
                    Parcourir
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Tableau de comparaison */}
          <div className="comparison-table">
            <h2 className="table-title">Statistiques comparées</h2>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className="stat-header">Statistique</th>
                    {compareList.map((pokemon) => (
                      <th key={pokemon.id} className="pokemon-header">
                        {pokemon.name?.french}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat) => {
                    const maxValue = getStatMax(stat);
                    return (
                      <tr key={stat}>
                        <td className="stat-name">{stat}</td>
                        {compareList.map((pokemon) => {
                          const value = pokemon.base[stat];
                          const isMax = value === maxValue && compareList.length > 1;
                          return (
                            <td key={pokemon.id} className="stat-cell">
                              <div className="stat-bar-container">
                                <div
                                  className={`stat-bar ${isMax ? 'max' : ''}`}
                                  style={{ width: `${(value / 255) * 100}%` }}
                                ></div>
                                <span className={`stat-value ${isMax ? 'max' : ''}`}>
                                  {value}
                                  {isMax && ' 👑'}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  <tr className="total-row">
                    <td className="stat-name">Total</td>
                    {compareList.map((pokemon) => {
                      const total = calculateTotalStats(pokemon.base);
                      const maxTotal = Math.max(...compareList.map(p => calculateTotalStats(p.base)));
                      const isMax = total === maxTotal && compareList.length > 1;
                      return (
                        <td key={pokemon.id} className="stat-cell">
                          <span className={`total-value ${isMax ? 'max' : ''}`}>
                            {total}
                            {isMax && ' 🏆'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Graphique radar (visuel simplifié) */}
          <div className="radar-section">
            <h2 className="section-title">Comparaison visuelle</h2>
            <div className="radar-grid">
              {compareList.map((pokemon) => (
                <div key={pokemon.id} className="radar-card">
                  <h3 className="radar-title">{pokemon.name?.french}</h3>
                  <div className="radar-bars">
                    {stats.map((stat) => (
                      <div key={stat} className="radar-row">
                        <span className="radar-label">{stat}</span>
                        <div className="radar-bar">
                          <div
                            className="radar-fill"
                            style={{
                              width: `${(pokemon.base[stat] / 255) * 100}%`,
                              backgroundColor: getTypeColor(pokemon.type[0])
                            }}
                          ></div>
                        </div>
                        <span className="radar-value">{pokemon.base[stat]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          <h2>Aucun Pokémon à comparer</h2>
          <p>Sélectionnez des Pokémons depuis la page d'accueil pour commencer</p>
          <Link to="/" className="browse-btn">
            🔍 Explorer les Pokémons
          </Link>
        </div>
      )}
    </div>
  );
};

export default Compare;
