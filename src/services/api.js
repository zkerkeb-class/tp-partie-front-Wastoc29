import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Configuration globale d'axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      console.error('Network Error:', error.message);
    } else {
      // Autre erreur
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const pokemonAPI = {
  /**
   * Récupère tous les pokemons avec pagination
   * @param {number} page - Numéro de la page
   * @param {number} limit - Nombre d'éléments par page
   */
  getAllPokemons: async (page = 1, limit = 20) => {
    try {
      const response = await api.get('/pokemons', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère un pokemon par son ID
   * @param {string|number} id - ID du pokemon
   */
  getPokemonById: async (id) => {
    try {
      const response = await api.get(`/pokemons/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Recherche un pokemon par son nom
   * @param {string} name - Nom du pokemon
   */
  searchPokemon: async (name) => {
    try {
      const response = await api.get(`/pokemons/search`, {
        params: { name }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crée un nouveau pokemon
   * @param {Object} pokemonData - Données du pokemon
   */
  createPokemon: async (pokemonData) => {
    try {
      const response = await api.post('/pokemons', pokemonData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Met à jour complètement un pokemon
   * @param {string|number} id - ID du pokemon
   * @param {Object} pokemonData - Nouvelles données du pokemon
   */
  updatePokemon: async (id, pokemonData) => {
    try {
      const response = await api.put(`/pokemons/${id}`, pokemonData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Met à jour partiellement un pokemon
   * @param {string|number} id - ID du pokemon
   * @param {Object} partialData - Données partielles du pokemon
   */
  patchPokemon: async (id, partialData) => {
    try {
      const response = await api.patch(`/pokemons/${id}`, partialData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Supprime un pokemon
   * @param {string|number} id - ID du pokemon
   */
  deletePokemon: async (id) => {
    try {
      const response = await api.delete(`/pokemons/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère les statistiques globales
   */
  getStats: async () => {
    try {
      const response = await api.get('/pokemons/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default pokemonAPI;
