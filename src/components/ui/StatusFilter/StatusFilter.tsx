import React, { useState, useRef, useEffect } from 'react';
import styles from './StatusFilter.module.css';
import { FilterIcon, ChevronDownIcon } from '../Icons';

interface StatusFilterProps {
  onFilterChange: (filters: string[]) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  onFilterChange,
  options,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (value: string) => {
    const newFilters = selectedFilters.includes(value)
      ? selectedFilters.filter(filter => filter !== value)
      : [...selectedFilters, value];
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  const getButtonText = () => {
    if (selectedFilters.length === 0) return 'Статус';
    if (selectedFilters.length === 1) {
      const option = options.find(opt => opt.value === selectedFilters[0]);
      return option?.label || 'Статус';
    }
    return `Статус (${selectedFilters.length})`;
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={dropdownRef}>
      <button
        className={styles.filterButton}
        onClick={handleToggle}
        type="button"
      >
        <FilterIcon />
        <span>{getButtonText()}</span>
        <ChevronDownIcon />
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <label key={option.value} className={styles.option}>
              <input
                type="checkbox"
                checked={selectedFilters.includes(option.value)}
                onChange={() => handleFilterChange(option.value)}
                className={styles.checkbox}
              />
              <span className={styles.optionLabel}>{option.label}</span>
            </label>
          ))}
          
          {selectedFilters.length > 0 && (
            <>
              <div className={styles.separator} />
              <button
                className={styles.clearButton}
                onClick={handleClearFilters}
                type="button"
              >
                Очистить фильтры
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
