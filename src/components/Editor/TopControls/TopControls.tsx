import React, { useState, useRef, useEffect } from 'react';
import { BookIconNew, HistoryIcon, ChevronDownIcon } from '../../ui/Icons';
import { Tooltip } from '../../ui/Tooltip';
import styles from './TopControls.module.css';

import type { VersionData } from '../types/version';

interface TopControlsProps {
  onEventJournal?: () => void;
  onVersionHistory?: () => void;
  viewingVersion?: VersionData | null;
  onDuplicateVersion?: (version: VersionData) => void;
  onUseVersion?: (version: VersionData) => void;
  onExitViewMode?: () => void;
  onPublish?: () => void;
  canPublish?: boolean;
}

export const TopControls: React.FC<TopControlsProps> = ({
  onEventJournal,
  onVersionHistory,
  viewingVersion,
  onDuplicateVersion,
  onUseVersion,
  onExitViewMode,
  onPublish,
  canPublish = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleBook = () => {
    if (onEventJournal) {
      onEventJournal();
    }
  };

  const handleCalendar = () => {
    if (onVersionHistory) {
      onVersionHistory();
    }
  };

  const handlePublish = () => {
    if (canPublish && onPublish) {
      onPublish();
    }
  };

  const handleActionsClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDuplicate = () => {
    setIsDropdownOpen(false);
    if (onDuplicateVersion && viewingVersion) {
      onDuplicateVersion(viewingVersion);
    }
  };

  const handleUse = () => {
    setIsDropdownOpen(false);
    if (onUseVersion && viewingVersion) {
      onUseVersion(viewingVersion);
    }
  };

  return (
    <div className={styles.topControls}>
      {onEventJournal && (
        <Tooltip content="Журнал событий" position="bottom">
          <button className={styles.controlButton} onClick={handleBook}>
            <BookIconNew className={styles.controlIcon} />
          </button>
        </Tooltip>
      )}

      <Tooltip content="История версий" position="bottom">
        <button className={styles.controlButton} onClick={handleCalendar}>
          <HistoryIcon className={styles.controlIcon} />
        </button>
      </Tooltip>

      {viewingVersion ? (
        <div className={styles.actionsContainer} ref={dropdownRef}>
          <button className={styles.actionsButton} onClick={handleActionsClick}>
            <span className={styles.actionsText}>Действия</span>
            <ChevronDownIcon size={24} className={styles.chevronIcon} />
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.menuItem} onClick={handleDuplicate}>
                Дублировать
              </button>
              <button className={styles.menuItem} onClick={handleUse}>
                Использовать
              </button>
            </div>
          )}
        </div>
      ) : (
        <button 
          className={styles.publishButton} 
          onClick={handlePublish}
          disabled={!canPublish}
          style={{ opacity: canPublish ? 1 : 0.5, cursor: canPublish ? 'pointer' : 'not-allowed' }}
        >
          <span className={styles.publishText}>Опубликовать</span>
        </button>
      )}
    </div>
  );
};
