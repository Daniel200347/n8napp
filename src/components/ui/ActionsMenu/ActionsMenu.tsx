import React, { useState, useRef, useEffect } from 'react';
import styles from './ActionsMenu.module.css';

interface ActionsMenuProps {
  onDelete?: () => void;
  onRename?: () => void;
  onDetails?: () => void;
  onRepeatCurrent?: () => void;
  onRepeatOriginal?: () => void;
  status?: string;
  className?: string;
}

export const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onDelete,
  onRename,
  onDetails,
  onRepeatCurrent,
  onRepeatOriginal,
  status,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: () => void | undefined) => {
    if (action) {
      action();
    }
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={menuRef}>
      <button
        className={styles.actionButton}
        onClick={handleToggle}
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5.83333C10.4603 5.83333 10.8334 5.46024 10.8334 5C10.8334 4.53976 10.4603 4.16667 10 4.16667C9.53978 4.16667 9.16669 4.53976 9.16669 5C9.16669 5.46024 9.53978 5.83333 10 5.83333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 10C10.8334 9.53976 10.4603 9.16667 10 9.16667C9.53978 9.16667 9.16669 9.53976 9.16669 10C9.16669 10.4602 9.53978 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 15.8333C10.4603 15.8333 10.8334 15.4602 10.8334 15C10.8334 14.5398 10.4603 14.1667 10 14.1667C9.53978 14.1667 9.16669 14.5398 9.16669 15C9.16669 15.4602 9.53978 15.8333 10 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {/* Для запусков с ошибкой показываем специальное меню */}
          {status === 'failed' && (onRepeatCurrent || onRepeatOriginal) ? (
            <>
              {onRepeatCurrent && (
                <button
                  className={styles.menuItem}
                  onClick={() => handleAction(onRepeatCurrent)}
                  type="button"
                >
                  <span style={{whiteSpace:'nowrap'}}>
                    Повторить (текущий воркфлоу)</span>
                </button>
              )}
              {onRepeatOriginal && (
                <button
                  className={styles.menuItem}
                  onClick={() => handleAction(onRepeatOriginal)}
                  type="button"
                >
                  <span style={{whiteSpace:'nowrap'}}>Повторить (исходный воркфлоу)</span>
                </button>
              )}
              {onDelete && (
                <button
                  className={`${styles.menuItem} ${styles.deleteItem}`}
                  onClick={() => handleAction(onDelete)}
                  type="button"
                >
                  <span>Удалить</span>
                </button>
              )}
            </>
          ) : status === 'completed' ? (
            /* Для запусков с успехом показываем только удалить */
            onDelete && (
              <button
                className={`${styles.menuItem} ${styles.deleteItem}`}
                onClick={() => handleAction(onDelete)}
                type="button"
              >
                <span>Удалить</span>
              </button>
            )
          ) : (
            /* Обычное меню для других случаев */
            <>
              {onRename && (
                <button
                  className={styles.menuItem}
                  onClick={() => handleAction(onRename)}
                  type="button"
                >
                  <span>Переименовать</span>
                </button>
              )}

              {onDetails && (
                <button
                  className={styles.menuItem}
                  onClick={() => handleAction(onDetails)}
                  type="button"
                >
                  <span>Подробности</span>
                </button>
              )}

              {onDelete && (
                <button
                  className={`${styles.menuItem} ${styles.deleteItem}`}
                  onClick={() => handleAction(onDelete)}
                  type="button"
                >
                  <span>Удалить</span>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
