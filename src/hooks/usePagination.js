import { useState, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer la pagination
 */
export const usePagination = (initialPage = 1, itemsPerPage = 20) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Aller à une page spécifique
  const goToPage = useCallback((page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }, [totalPages]);

  // Page suivante
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  // Page précédente
  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Aller à la première page
  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Aller à la dernière page
  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  // Mettre à jour les informations de pagination
  const updatePagination = useCallback((paginationData) => {
    if (paginationData.currentPage !== undefined) {
      setCurrentPage(paginationData.currentPage);
    }
    if (paginationData.totalPages !== undefined) {
      setTotalPages(paginationData.totalPages);
    }
    if (paginationData.totalItems !== undefined) {
      setTotalItems(paginationData.totalItems);
    }
  }, []);

  // Calculer les numéros de page à afficher
  const getPageNumbers = useCallback((maxVisible = 5) => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Ajuster le début si on est près de la fin
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  // Calculer les index de début et fin pour le slice
  const getSliceIndexes = useCallback(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return { start, end };
  }, [currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    updatePagination,
    getPageNumbers,
    getSliceIndexes,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

export default usePagination;
