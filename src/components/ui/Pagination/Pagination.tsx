import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  className
}) => {
  const [inputValue, setInputValue] = useState(rowsPerPage.toString());

  useEffect(() => {
    setInputValue(rowsPerPage.toString());
  }, [rowsPerPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const newValue = parseInt(inputValue);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 100) {
      onRowsPerPageChange(newValue);
    } else {
      setInputValue(rowsPerPage.toString());
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const handleIncrement = () => {
    const newValue = Math.min(100, rowsPerPage + 1);
    setInputValue(newValue.toString());
    onRowsPerPageChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(1, rowsPerPage - 1);
    setInputValue(newValue.toString());
    onRowsPerPageChange(newValue);
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.info}>
        <span className={styles.label}>Строк на странице</span>
        <div className={styles.rowsSelector}>
          <div className={styles.rowsInputContainer}>
            <input
              type="number"
              className={styles.rowsInput}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              min="1"
              max="100"
            />
            <div className={styles.rowsControls}>
                             <button
                 className={styles.rowsButton}
                 onClick={handleIncrement}
                 type="button"
                 disabled={rowsPerPage >= 100}
               >
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                   <path d="M3 7L6 4L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </button>
               <button
                 className={styles.rowsButton}
                 onClick={handleDecrement}
                 type="button"
                 disabled={rowsPerPage <= 1}
               >
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                   <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          type="button"
        >
          Предыдущий
        </button>
        
        <button
          className={`${styles.navButton} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          type="button"
        >
          Следующий
        </button>
      </div>
    </div>
  );
};
