import React from 'react';
import { DangerCircleIcon, CheckCircleIcon } from '../Icons';
import styles from './Notification.module.css';

interface NotificationProps {
  type?: 'error' | 'success' | 'warning' | 'info';
  title: string;
  actionText?: string;
  onAction?: () => void;
  onClose?: () => void;
  isVisible?: boolean;
}

export const Notification: React.FC<NotificationProps> = ({
  type = 'error',
  title,
  actionText = 'Подробнее',
  onAction,
  isVisible = true
}) => {
  if (!isVisible) return null;

  const handleActionClick = () => {
    if (onAction) {
      onAction();
    }
  };


  const renderIcon = () => {
    switch (type) {
      case 'error':
        return <DangerCircleIcon className={styles.errorIcon} />;
      case 'success':
        return <CheckCircleIcon className={styles.successIcon} />;
      default:
        return <DangerCircleIcon className={styles.errorIcon} />;
    }
  };

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.iconContainer}>
        {renderIcon()}
      </div>
      
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
      </div>
      
      {onAction && (
        <button 
          className={styles.actionButton}
          onClick={handleActionClick}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
