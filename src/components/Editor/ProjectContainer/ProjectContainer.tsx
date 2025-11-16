import React, { useState, useEffect, useRef } from 'react';
import styles from './ProjectContainer.module.css';
import { LinkIcon } from '../../ui/Icons';
import type { VersionData } from '../types/version';

interface ProjectContainerProps {
  projectName?: string;
  onProjectNameChange?: (name: string) => void;
  viewingVersion?: VersionData | null;
}

export const ProjectContainer: React.FC<ProjectContainerProps> = ({
  projectName,
  onProjectNameChange,
  viewingVersion
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentProjectName, setCurrentProjectName] = useState(projectName || '');
  const [editingValue, setEditingValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const formatDateTime = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  const getDisplayName = () => {
    if (viewingVersion?.name) {
      return viewingVersion.name;
    }
    if (currentProjectName) {
      return currentProjectName;
    }
    return `Автоматизация без названия ${formatDateTime()}`;
  };

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
    if (viewingVersion) {
      return;
    }
    setEditingValue(getDisplayName());
    setIsEditing(true);
    setIsDropdownOpen(false);
  };

  const handleNameSubmit = () => {
    setIsEditing(false);
    setCurrentProjectName(editingValue);
    onProjectNameChange?.(editingValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditingValue(getDisplayName());
      setIsEditing(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuAction = (action: () => void) => {
    action();
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectIconContainer}>
        <div className={styles.projectIcon}>
          <LinkIcon size={20} />
        </div>
        <button
          className={styles.dropdownButton}
          onClick={toggleDropdown}
          aria-label="Project options"
        >
          <svg
            className={styles.dropdownIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className={styles.projectName}>
        {isEditing ? (
          <input
            type="text"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyDown}
            className={styles.nameInput}
            placeholder="Введите название автоматизации"
            autoFocus
          />
        ) : (
          <div className={styles.name} onClick={handleNameClick}>
            {getDisplayName()}
            {viewingVersion && (
              <span className={styles.versionBadge}>
                V{viewingVersion.versionNumber}
              </span>
            )}
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <button 
            className={styles.dropdownItem}
            onClick={() => handleMenuAction(() => {})}
          >
            На главную
          </button>
          <hr className={styles.dropdownSeparator} />
          <button 
            className={styles.dropdownItem} 
            onClick={() => handleMenuAction(handleNameClick)}
          >
            Переименовать
          </button>
          <button 
            className={styles.dropdownItem}
            onClick={() => handleMenuAction(() => {})}
          >
            Дублировать
          </button>
          <hr className={styles.dropdownSeparator} />
          <button 
            className={`${styles.dropdownItem} ${styles.danger}`}
            onClick={() => handleMenuAction(() => {})}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};
