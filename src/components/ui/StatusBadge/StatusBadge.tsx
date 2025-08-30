import React from 'react';
import styles from './StatusBadge.module.css';

export type StatusType = 
  // Автоматизации
  | 'enabled' | 'disabled'
  // Запуски
  | 'completed' | 'failed' | 'running' | 'pending' | 'success' | 'error'
  // Ключи
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
    // Автоматизации
    enabled: 'Включен',
    disabled: 'Выключен',
    // Запуски
    completed: 'Успех',
    failed: 'Ошибка',
    running: 'Выполняется',
    pending: 'Ожидает',
    success: 'Успех',
    error: 'Ошибка',
    // Ключи
    connected: 'Подключен',
    disconnected: 'Отключен',
    requires_setup: 'Требует настройки'
  };
  
  return labels[status] || status;
};
