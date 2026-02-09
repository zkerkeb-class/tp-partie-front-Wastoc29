import React, { createContext, useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/helpers';

export const CompareContext = createContext();

const MAX_COMPARE = 3;

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  // Charger la liste de comparaison depuis le localStorage au montage
  useEffect(() => {
    const savedCompareList = storage.get(LOCAL_STORAGE_KEYS.COMPARE_LIST, []);
    setCompareList(savedCompareList);
  }, []);

  // Sauvegarder la liste de comparaison dans le localStorage à chaque modification
  useEffect(() => {
    storage.set(LOCAL_STORAGE_KEYS.COMPARE_LIST, compareList);
  }, [compareList]);

  // Ajouter ou retirer un pokemon de la liste de comparaison
  const toggleCompare = (pokemon) => {
    setCompareList(prevList => {
      const exists = prevList.some(p => p.id === pokemon.id);

      if (exists) {
        // Retirer de la liste
        return prevList.filter(p => p.id !== pokemon.id);
      } else {
        // Ajouter à la liste si pas pleine
        if (prevList.length < MAX_COMPARE) {
          return [...prevList, pokemon];
        }
        return prevList;
      }
    });
  };

  // Vérifier si un pokemon est dans la liste de comparaison
  const isInCompare = (pokemonId) => {
    return compareList.some(p => p.id === pokemonId);
  };

  // Retirer tous les pokemons de la liste
  const clearCompareList = () => {
    setCompareList([]);
  };

  // Retirer un pokemon spécifique
  const removeFromCompare = (pokemonId) => {
    setCompareList(prevList => prevList.filter(p => p.id !== pokemonId));
  };

  // Vérifier si on peut ajouter plus de pokemons
  const canAddMore = () => {
    return compareList.length < MAX_COMPARE;
  };

  // Obtenir le nombre de pokemons dans la liste
  const compareCount = compareList.length;

  return (
    <CompareContext.Provider
      value={{
        compareList,
        toggleCompare,
        isInCompare,
        clearCompareList,
        removeFromCompare,
        canAddMore,
        compareCount,
        maxCompare: MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
