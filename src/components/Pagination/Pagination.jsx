import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, showPageNumbers = true }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {/* Bouton Première page */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        title="Première page"
      >
        «
      </button>

      {/* Bouton Précédent */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Page précédente"
      >
        ‹
      </button>

      {/* Numéros de page */}
      {showPageNumbers && (
        <div className="pagination-numbers">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Indicateur de page (toujours visible) */}
      <span className="pagination-info">
        Page {currentPage} / {totalPages}
      </span>

      {/* Bouton Suivant */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Page suivante"
      >
        ›
      </button>

      {/* Bouton Dernière page */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Dernière page"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
