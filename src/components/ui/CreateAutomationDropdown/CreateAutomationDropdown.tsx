import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import { PlusIcon } from '../Icons';
import styles from './CreateAutomationDropdown.module.css';

interface CreateAutomationDropdownProps {
  onCreateFromScratch?: () => void;
  onUseTemplate?: () => void;
  className?: string;
}

export const CreateAutomationDropdown: React.FC<CreateAutomationDropdownProps> = ({
  onCreateFromScratch,
  onUseTemplate,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateFromScratch = () => {
    onCreateFromScratch?.();
    setIsOpen(false);
  };

  const handleUseTemplate = () => {
    onUseTemplate?.();
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={dropdownRef}>
      <Button
        variant="default"
        size="lg"
        leftIcon={<PlusIcon />}
        rightIcon={
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
          >
            <path 
              d="M5 7.5L10 12.5L15 7.5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        }
        onClick={handleToggle}
        className={styles.createButton}
      >
        Создать автоматизацию
      </Button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.menuItem}
            onClick={handleCreateFromScratch}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.6667 8H3.33334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>С нуля</span>
          </button>
          
          <button
            className={styles.menuItem}
            onClick={handleUseTemplate}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.3333 4.66667V11.3333C13.3333 12.0697 12.7363 12.6667 12 12.6667H4C3.26362 12.6667 2.66667 12.0697 2.66667 11.3333V4.66667C2.66667 3.93029 3.26362 3.33333 4 3.33333H12C12.7363 3.33333 13.3333 3.93029 13.3333 4.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 1.33333V4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 1.33333V4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Использовать шаблон</span>
          </button>
        </div>
      )}
    </div>
  );
};
