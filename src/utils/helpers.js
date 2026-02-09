import { TYPE_COLORS } from './constants';

/**
 * Formatte l'ID d'un pokemon avec des zéros (ex: 1 -> #001)
 */
export const formatPokemonId = (id) => {
  return `#${String(id).padStart(3, '0')}`;
};

/**
 * Récupère la couleur d'un type de pokemon
 */
export const getTypeColor = (type) => {
  return TYPE_COLORS[type] || '#777';
};

/**
 * Calcule la moyenne des statistiques d'un pokemon
 */
export const calculateAverageStats = (base) => {
  if (!base) return 0;
  const stats = Object.values(base);
  const sum = stats.reduce((acc, stat) => acc + stat, 0);
  return Math.round(sum / stats.length);
};

/**
 * Calcule le total des statistiques d'un pokemon
 */
export const calculateTotalStats = (base) => {
  if (!base) return 0;
  return Object.values(base).reduce((acc, stat) => acc + stat, 0);
};

/**
 * Valide les données d'un pokemon avant création/modification
 */
export const validatePokemonData = (data) => {
  const errors = [];

  if (!data.name?.french || data.name.french.trim() === '') {
    errors.push('Le nom français est requis');
  }

  if (!data.type || !Array.isArray(data.type) || data.type.length === 0) {
    errors.push('Au moins un type est requis');
  }

  if (!data.base) {
    errors.push('Les statistiques de base sont requises');
  } else {
    const requiredStats = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
    requiredStats.forEach(stat => {
      if (typeof data.base[stat] !== 'number' || data.base[stat] < 0) {
        errors.push(`La statistique ${stat} doit être un nombre positif`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Filtre les pokemons par type
 */
export const filterPokemonsByType = (pokemons, type) => {
  if (!type) return pokemons;
  return pokemons.filter(pokemon => pokemon.type.includes(type));
};

/**
 * Trie les pokemons
 */
export const sortPokemons = (pokemons, sortBy = 'id') => {
  const sorted = [...pokemons];

  switch (sortBy) {
    case 'id':
      return sorted.sort((a, b) => a.id - b.id);
    case 'name':
      return sorted.sort((a, b) =>
        a.name.french.localeCompare(b.name.french)
      );
    case 'hp':
      return sorted.sort((a, b) => b.base.HP - a.base.HP);
    case 'attack':
      return sorted.sort((a, b) => b.base.Attack - a.base.Attack);
    case 'total':
      return sorted.sort((a, b) =>
        calculateTotalStats(b.base) - calculateTotalStats(a.base)
      );
    default:
      return sorted;
  }
};

/**
 * Debounce une fonction (utile pour la recherche)
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Gère le localStorage de manière sécurisée
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
      return false;
    }
  }
};

/**
 * Formate une date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Génère une couleur aléatoire pour les graphiques
 */
export const generateRandomColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
};
