import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { validatePokemonData } from '../utils/helpers';
import './Create.css';

const Create = () => {
  const navigate = useNavigate();
  const { createPokemon, loading } = usePokemon();

  const [formData, setFormData] = useState({
    name: {
      french: '',
      english: '',
      japanese: '',
      chinese: ''
    },
    type: [],
    base: {
      HP: 50,
      Attack: 50,
      Defense: 50,
      'Sp. Attack': 50,
      'Sp. Defense': 50,
      Speed: 50
    },
    image: ''
  });

  const [typeInput, setTypeInput] = useState('');
  const [formErrors, setFormErrors] = useState([]);

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
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTypeAdd = () => {
    if (typeInput.trim() && !formData.type.includes(typeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        type: [...prev.type, typeInput.trim()]
      }));
      setTypeInput('');
    }
  };

  const handleTypeRemove = (typeToRemove) => {
    setFormData(prev => ({
      ...prev,
      type: prev.type.filter(t => t !== typeToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors([]);

    const validation = validatePokemonData(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const result = await createPokemon(formData);

    if (result.success) {
      navigate(`/pokemon/${result.data.id}`);
    } else {
      setFormErrors([result.error]);
    }
  };

  return (
    <div className="create-page">
      <div className="create-container">
        {/* Header */}
        <div className="create-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Retour
          </button>
          <h1 className="create-title">
            <span className="title-icon">➕</span>
            Créer un nouveau Pokémon
          </h1>
        </div>

        {/* Error Messages */}
        {formErrors.length > 0 && (
          <div className="error-messages">
            {formErrors.map((err, idx) => (
              <p key={idx}>❌ {err}</p>
            ))}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="create-form">
          {/* Section Noms */}
          <div className="form-section">
            <h2 className="section-title">Noms</h2>

            <div className="form-group">
              <label htmlFor="name-french">Nom français *</label>
              <input
                id="name-french"
                type="text"
                name="name.french"
                value={formData.name.french}
                onChange={handleInputChange}
                placeholder="Pikachu"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name-english">Nom anglais</label>
                <input
                  id="name-english"
                  type="text"
                  name="name.english"
                  value={formData.name.english}
                  onChange={handleInputChange}
                  placeholder="Pikachu"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name-japanese">Nom japonais</label>
                <input
                  id="name-japanese"
                  type="text"
                  name="name.japanese"
                  value={formData.name.japanese}
                  onChange={handleInputChange}
                  placeholder="ピカチュウ"
                />
              </div>
            </div>
          </div>

          {/* Section Types */}
          <div className="form-section">
            <h2 className="section-title">Types *</h2>

            <div className="type-input-group">
              <input
                type="text"
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTypeAdd())}
                placeholder="Fire, Water, Grass..."
              />
              <button type="button" onClick={handleTypeAdd} className="add-type-btn">
                Ajouter
              </button>
            </div>

            <div className="types-display">
              {formData.type.map((type) => (
                <span key={type} className="type-chip">
                  {type}
                  <button
                    type="button"
                    onClick={() => handleTypeRemove(type)}
                    className="remove-type-btn"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section Statistiques */}
          <div className="form-section">
            <h2 className="section-title">Statistiques de base *</h2>

            <div className="stats-grid">
              {Object.entries(formData.base).map(([stat, value]) => (
                <div key={stat} className="stat-input-group">
                  <label htmlFor={`stat-${stat}`}>{stat}</label>
                  <div className="stat-input-wrapper">
                    <input
                      id={`stat-${stat}`}
                      type="range"
                      name={`base.${stat}`}
                      value={value}
                      onChange={handleInputChange}
                      min="0"
                      max="255"
                      className="stat-slider"
                    />
                    <input
                      type="number"
                      name={`base.${stat}`}
                      value={value}
                      onChange={handleInputChange}
                      min="0"
                      max="255"
                      className="stat-number"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Image */}
          <div className="form-section">
            <h2 className="section-title">Image (optionnel)</h2>

            <div className="form-group">
              <label htmlFor="image">URL de l'image</label>
              <input
                id="image"
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/pokemon.png"
              />
            </div>

            {formData.image && (
              <div className="image-preview">
                <img
                  src={formData.image}
                  alt="Preview"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Annuler
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Création en cours...' : '✨ Créer le Pokémon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
