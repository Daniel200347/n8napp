import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchInput.module.css';
import { SearchIcon } from '../Icons';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Поиск...',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
        onSearch('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onSearch]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setQuery('');
      onSearch('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      onSearch('');
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={containerRef}>
      <button
        className={styles.searchButton}
        onClick={handleToggle}
        type="button"
      >
        <SearchIcon />
        <span>Поиск</span>
      </button>
      
      {isOpen && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={styles.input}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};
