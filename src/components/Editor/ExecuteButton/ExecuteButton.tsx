import React from 'react';
import { LoadingIcon } from '../../ui/Icons';
import styles from './ExecuteButton.module.css';

interface ExecuteButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ExecuteButton: React.FC<ExecuteButtonProps> = ({ 
  onClick, 
  disabled = false,
  isLoading = false
}) => {
  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  if (disabled) {
    return null;
  }

  return (
    <button 
      className={styles.executeButton}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <LoadingIcon className={styles.loadingIcon} />
          <span className={styles.buttonText}>Выполнение сценария</span>
        </>
      ) : (
        <span className={styles.buttonText}>Выполнить сценарий</span>
      )}
    </button>
  );
};
