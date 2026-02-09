import { useState, useEffect, useCallback } from 'react';
import pokemonAPI from '../services/api';

/**
 * Hook personnalisé pour gérer les opérations sur un pokemon
 */
export const usePokemon = (pokemonId = null) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer un pokemon par ID
  const fetchPokemon = useCallback(async (id) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await pokemonAPI.getPokemonById(id);
      setPokemon(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement du Pokémon');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un pokemon
  const createPokemon = async (pokemonData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await pokemonAPI.createPokemon(pokemonData);
      setPokemon(data);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la création';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un pokemon
  const updatePokemon = async (id, pokemonData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await pokemonAPI.updatePokemon(id, pokemonData);
      setPokemon(data);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la mise à jour';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Mise à jour partielle
  const patchPokemon = async (id, partialData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await pokemonAPI.patchPokemon(id, partialData);
      setPokemon(data);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la mise à jour';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un pokemon
  const deletePokemon = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await pokemonAPI.deletePokemon(id);
      setPokemon(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la suppression';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Charger le pokemon au montage si ID fourni
  useEffect(() => {
    if (pokemonId) {
      fetchPokemon(pokemonId);
    }
  }, [pokemonId, fetchPokemon]);

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
    createPokemon,
    updatePokemon,
    patchPokemon,
    deletePokemon,
  };
};

/**
 * Hook pour gérer la liste de pokemons avec pagination
 */
export const usePokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  });

  // Récupérer la liste des pokemons
  const fetchPokemons = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);

    try {
      const data = await pokemonAPI.getAllPokemons(page, limit);
      const pokemonsList = data.pokemons || data;
      setPokemons(pokemonsList);

      // Mise à jour de la pagination
      if (data.pagination) {
        // Si le backend fournit les infos de pagination
        setPagination(data.pagination);
      } else {
        // Sinon, on calcule pour 151 Pokémons au total
        const totalItems = data.total || 151;
        const totalPages = Math.ceil(totalItems / limit);

        setPagination({
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalItems,
          itemsPerPage: limit
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des Pokémons');
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Rechercher un pokemon
  const searchPokemon = async (name) => {
    if (!name || name.trim() === '') {
      fetchPokemons(1);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await pokemonAPI.searchPokemon(name);
      setPokemons(Array.isArray(data) ? data : [data]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: Array.isArray(data) ? data.length : 1,
        itemsPerPage: 20
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Pokémon non trouvé');
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger la première page au montage
  useEffect(() => {
    fetchPokemons(1);
  }, [fetchPokemons]);

  return {
    pokemons,
    loading,
    error,
    pagination,
    fetchPokemons,
    searchPokemon,
  };
};

export default usePokemon;
