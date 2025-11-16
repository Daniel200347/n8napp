import React from 'react';
import styles from './StatusBadge.module.css';

export type StatusType = 
  | 'enabled' | 'disabled'
  | 'completed' | 'failed' | 'running' | 'pending' | 'success' | 'error'
  | 'connected' | 'disconnected' | 'requires_setup';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <span className={`${styles.statusBadge} ${styles[status]} ${className || ''}`}>
      {getStatusLabel(status)}
    </span>
  );
};

const getStatusLabel = (status: StatusType): string => {
  const labels: Record<StatusType, string> = {
    enabled: 'Включен',
    disabled: 'Выключен',
    completed: 'Успех',
    failed: 'Ошибка',
    running: 'Выполняется',
    pending: 'Ожидает',
    success: 'Успех',
    error: 'Ошибка',
    connected: 'Подключен',
    disconnected: 'Отключен',
    requires_setup: 'Требует настройки'
  };
  
  return labels[status] || status;
};
