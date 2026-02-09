import React, { createContext, useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/helpers';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis le localStorage au montage
  useEffect(() => {
    const savedFavorites = storage.get(LOCAL_STORAGE_KEYS.FAVORITES, []);
    setFavorites(savedFavorites);
  }, []);

  // Sauvegarder les favoris dans le localStorage à chaque modification
  useEffect(() => {
    storage.set(LOCAL_STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  // Ajouter ou retirer un pokemon des favoris
  const toggleFavorite = (pokemon) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === pokemon.id);

      if (exists) {
        // Retirer des favoris
        return prevFavorites.filter(fav => fav.id !== pokemon.id);
      } else {
        // Ajouter aux favoris
        return [...prevFavorites, pokemon];
      }
    });
  };

  // Vérifier si un pokemon est dans les favoris
  const isFavorite = (pokemonId) => {
    return favorites.some(fav => fav.id === pokemonId);
  };

  // Retirer tous les favoris
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Obtenir le nombre de favoris
  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
