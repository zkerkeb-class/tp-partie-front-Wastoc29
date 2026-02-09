import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { FavoritesContext } from '../context/FavoritesContext';
import Modal from '../components/Modal/Modal';
import { formatPokemonId, getTypeColor, calculateTotalStats, validatePokemonData } from '../utils/helpers';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading, error, fetchPokemon, updatePokemon, deletePokemon } = usePokemon(id);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (pokemon) {
      setFormData({
        name: pokemon.name,
        type: pokemon.type,
        base: pokemon.base,
        image: pokemon.image || ''
      });
    }
  }, [pokemon]);

  const isFavorite = () => {
    return favorites.some(fav => fav.id === parseInt(id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('name.')) {
      const lang = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        name: { ...prev.name, [lang]: value }
      }));
    } else if (name.startsWith('base.')) {
      const stat = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        base: { ...prev.base, [stat]: parseInt(value) || 0 }
      }));
    } else if (name === 'type') {
      const types = value.split(',').map(t => t.trim()).filter(t => t);
      setFormData(prev => ({ ...prev, type: types }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setSaveMessage('');
    setFormErrors([]);

    const validation = validatePokemonData(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const result = await updatePokemon(id, formData);

    if (result.success) {
      setSaveMessage('✓ Pokémon mis à jour avec succès !');
      setIsEditing(false);
      setTimeout(() => setSaveMessage(''), 3000);
    } else {
      setFormErrors([result.error]);
    }
  };

  const handleDelete = async () => {
    const result = await deletePokemon(id);

    if (result.success) {
      navigate('/');
    } else {
      alert('Erreur lors de la suppression');
    }

    setIsDeleteModalOpen(false);
  };

  if (loading) {
    return (
      <div className="details-page">
        <div className="loading-container">
          <div className="pokeball-loader"></div>
          <p>Chargement du Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="details-page">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <p className="error-message">{error || 'Pokémon non trouvé'}</p>
          <button className="retry-btn" onClick={() => navigate('/')}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      {/* Header avec actions */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Retour
        </button>

        <div className="header-actions">
          {!isEditing ? (
            <>
              <button className="favorite-btn" onClick={() => toggleFavorite(pokemon)}>
                {isFavorite() ? '❤️ Retirer des favoris' : '🤍 Ajouter aux favoris'}
              </button>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                ✏️ Modifier
              </button>
              <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
                🗑️ Supprimer
              </button>
            </>
          ) : (
            <>
              <button className="cancel-btn" onClick={() => {
                setIsEditing(false);
                setFormErrors([]);
                setFormData({
                  name: pokemon.name,
                  type: pokemon.type,
                  base: pokemon.base,
                  image: pokemon.image || ''
                });
              }}>
                Annuler
              </button>
              <button className="save-btn" onClick={handleSave}>
                💾 Sauvegarder
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      {saveMessage && <div className="success-message">{saveMessage}</div>}
      {formErrors.length > 0 && (
        <div className="error-messages">
          {formErrors.map((err, idx) => (
            <p key={idx}>❌ {err}</p>
          ))}
        </div>
      )}

      {/* Contenu principal */}
      <div className="details-content">
        {/* Colonne gauche - Image */}
        <div className="pokemon-image-section">
          <div className="pokemon-image-container">
            <img
              src={formData?.image || pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name?.french}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300?text=No+Image';
              }}
            />
          </div>

          {isEditing && (
            <div className="form-group">
              <label>URL de l'image</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </div>
          )}
        </div>

        {/* Colonne droite - Informations */}
        <div className="pokemon-info-section">
          {/* ID et Nom */}
          <div className="pokemon-header-info">
            <span className="pokemon-id">{formatPokemonId(pokemon.id)}</span>
            {!isEditing ? (
              <h1 className="pokemon-name">{pokemon.name?.french}</h1>
            ) : (
              <div className="form-group">
                <label>Nom (Français)</label>
                <input
                  type="text"
                  name="name.french"
                  value={formData.name?.french || ''}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* Types */}
          <div className="info-block">
            <h3>Types</h3>
            {!isEditing ? (
              <div className="types-list">
                {pokemon.type?.map((type) => (
                  <span
                    key={type}
                    className="type-badge-large"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            ) : (
              <div className="form-group">
                <input
                  type="text"
                  name="type"
                  value={formData.type?.join(', ') || ''}
                  onChange={handleInputChange}
                  placeholder="Fire, Flying"
                />
                <small>Séparez les types par des virgules</small>
              </div>
            )}
          </div>

          {/* Statistiques */}
          <div className="info-block">
            <h3>Statistiques</h3>
            <div className="stats-list">
              {Object.entries(pokemon.base || {}).map(([stat, value]) => (
                <div key={stat} className="stat-row">
                  <span className="stat-name">{stat}</span>
                  {!isEditing ? (
                    <>
                      <div className="stat-bar">
                        <div
                          className="stat-bar-fill"
                          style={{
                            width: `${(value / 255) * 100}%`,
                            backgroundColor: value > 100 ? '#7AC74C' : value > 50 ? '#F7D02C' : '#EE8130'
                          }}
                        ></div>
                      </div>
                      <span className="stat-value">{value}</span>
                    </>
                  ) : (
                    <input
                      type="number"
                      name={`base.${stat}`}
                      value={formData.base?.[stat] || 0}
                      onChange={handleInputChange}
                      min="0"
                      max="255"
                      className="stat-input"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="stats-summary">
              <div className="summary-item">
                <span className="summary-label">Total</span>
                <span className="summary-value">{calculateTotalStats(formData?.base || pokemon.base)}</span>
              </div>
            </div>
          </div>

          {/* Noms dans d'autres langues */}
          {!isEditing && (
            <div className="info-block">
              <h3>Noms internationaux</h3>
              <div className="names-list">
                {Object.entries(pokemon.name || {}).map(([lang, name]) => (
                  <div key={lang} className="name-item">
                    <span className="name-lang">{lang}</span>
                    <span className="name-value">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer ce Pokémon ?"
        message={`Êtes-vous sûr de vouloir supprimer ${pokemon.name?.french} ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
      />
    </div>
  );
};

export default Details;
