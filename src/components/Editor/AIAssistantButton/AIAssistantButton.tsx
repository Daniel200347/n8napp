import React from 'react';
import { SparklesIcon } from '../../ui/Icons';
import styles from './AIAssistantButton.module.css';

interface AIAssistantButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ 
  onClick, 
  disabled = false 
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button 
      className={`${styles.aiAssistantButton} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className={styles.iconContainer}>
        <SparklesIcon className={styles.aiIcon} width={24} height={24} />
      </div>
      <span className={styles.buttonText}>ИИ помощник</span>
    </button>
  );
};
