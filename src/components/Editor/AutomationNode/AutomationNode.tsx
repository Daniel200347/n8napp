import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, DashboardIcon, SettingsIcon } from '../../ui/Icons';
import styles from './AutomationNode.module.css';

interface AutomationNodeProps {
  data: {
    name: string;
    isEditing: boolean;
  };
}

export const AutomationNode: React.FC<AutomationNodeProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(data.isEditing);
  const [name, setName] = useState(data.name);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameSubmit = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const handleBlur = () => {
    handleNameSubmit();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRename = () => {
    setIsDropdownOpen(false);
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.automationNode}>
      <div className={styles.header}>
        <div className={styles.title} onClick={handleNameClick}>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
              className={styles.nameInput}
            />
          ) : (
            <span className={styles.name}>{name}</span>
          )}
        </div>
        
        <div className={styles.controls}>
          <button 
            className={styles.dropdownButton}
            onClick={handleDropdownToggle}
            ref={dropdownRef}
          >
            <ChevronDownIcon className={styles.dropdownIcon} />
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                <DashboardIcon className={styles.dropdownIcon} />
                <span>На главную</span>
              </button>
              <button className={styles.dropdownItem} onClick={handleRename}>
                <SettingsIcon className={styles.dropdownIcon} />
                <span>Переименовать</span>
              </button>
              <button className={styles.dropdownItem} onClick={handleDelete}>
                <span>Удалить</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
