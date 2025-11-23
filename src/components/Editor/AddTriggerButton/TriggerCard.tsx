import React, { useState, useEffect, useRef } from 'react';
import { DotsVerticalIcon, PowerIcon } from '../../ui/Icons';
import type { TriggerStatus } from './types';
import styles from './TriggerCard.module.css';

interface TriggerCardProps {
  id: string;
  number: number;
  name: string;
  serviceName: string;
  serviceIcon: React.ReactNode;
  status?: TriggerStatus;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onToggle?: () => void;
  onDelete?: () => void;
  onRun?: () => void;
  onEnable?: () => void;
  onIconClick?: () => void;
  isViewMode?: boolean;
}

export const TriggerCard: React.FC<TriggerCardProps> = ({
  id,
  number,
  name,
  serviceName,
  serviceIcon,
  status = 'default',
  onEdit,
  onDuplicate,
  onToggle,
  onDelete,
  onRun,
  onEnable,
  onIconClick,
  isViewMode = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuAction = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const getStatusStyles = () => {
    switch (status) {
      case 'error':
        return {
          borderColor: '#FEE685',
          iconOpacity: 1,
          textOpacity: 1
        };
      case 'disabled':
        return {
          borderColor: '#E2E8F0',
          iconOpacity: 0.5,
          textOpacity: 0.5
        };
      case 'hover':
        return {
          borderColor: '#155DFC',
          iconOpacity: 1,
          textOpacity: 1
        };
      case 'active':
        return {
          borderColor: '#155DFC',
          iconOpacity: 1,
          textOpacity: 1
        };
      default:
        return {
          borderColor: '#E2E8F0',
          iconOpacity: 1,
          textOpacity: 1
        };
    }
  };

  const statusStyles = getStatusStyles();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.menuButton}`) || 
        (e.target as HTMLElement).closest(`.${styles.dropdownMenu}`) ||
        (e.target as HTMLElement).closest(`.${styles.serviceIcon}`)) {
      return;
    }
    
    if (isViewMode && onEdit) {
      onEdit();
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.triggerCard}
        style={{ borderColor: statusStyles.borderColor, cursor: isViewMode && onEdit ? 'pointer' : 'default' }}
        onClick={handleCardClick}
      >
        {status === 'error' && (
          <div className={styles.errorBadge}>
            <span className={styles.errorText}>!</span>
          </div>
        )}
        
        <div 
          className={styles.serviceIcon}
          style={{ opacity: statusStyles.iconOpacity }}
          onClick={onIconClick}
        >
          {serviceIcon}
        </div>
        
        <div className={styles.content}>
          <h3 
            className={styles.triggerName}
            style={{ opacity: statusStyles.textOpacity }}
          >
            {number}. {name}
          </h3>
          <p 
            className={styles.serviceName}
            style={{ opacity: statusStyles.textOpacity }}
          >
            {serviceName}
          </p>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.menuButton}
            onClick={status === 'disabled' ? onToggle : handleMenuToggle}
            disabled={isViewMode}
            style={{ opacity: status === 'disabled' || isViewMode ? 0.5 : 1 }}
          >
            {status === 'disabled' ? (
              <PowerIcon size={24} />
            ) : (
              <DotsVerticalIcon size={24} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && !isViewMode && (
        <div className={styles.dropdownMenu}>
          {onRun && (
            <button 
              className={styles.menuItem}
              onClick={() => handleMenuAction(onRun)}
            >
              Запустить
            </button>
          )}
          
          {onEdit && (
            <button 
              className={styles.menuItem}
              onClick={() => {
                handleMenuAction(onEdit);
              }}
            >
              Изменить
            </button>
          )}
          
          {onDuplicate && (
            <button 
              className={styles.menuItem}
              onClick={() => handleMenuAction(onDuplicate)}
            >
              Дублировать
            </button>
          )}
          
          {onToggle && (
            <button 
              className={styles.menuItem}
              onClick={() => handleMenuAction(onToggle)}
            >
              Отключить
            </button>
          )}
          
          {onDelete && (
            <button 
              className={`${styles.menuItem} ${styles.dangerItem}`}
              onClick={() => handleMenuAction(onDelete)}
            >
              Удалить
            </button>
          )}
        </div>
      )}

    </div>
  );
};
