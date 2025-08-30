import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  title,
  description,
  icon
}) => {
  const defaultIcon = (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8335 30.3334L16.3335 26.8334L29.1668 39.6667L25.6668 43.1667C23.9168 44.9168 17.5001 47.8334 12.8335 43.1667C8.16681 38.5 11.0835 32.0835 12.8335 30.3334Z" stroke="#020618" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 49L12.8333 43.1666" stroke="#020618" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M43.1663 25.6665L39.6663 29.1665L26.833 16.3332L30.333 12.8332C32.083 11.0831 38.4997 8.16641 43.1663 12.8332C47.833 17.4999 44.9163 23.9164 43.1663 25.6665Z" stroke="#020618" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M37.3337 26.8334L32.667 31.5" stroke="#020618" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M29.1667 18.6666L24.5 23.3333" stroke="#020618" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M49.0003 7L43.167 12.8333" stroke="#020618" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

  );

  return (
    <div className={`${styles.emptyContainer} ${className || ''}`}>
      <div className={styles.emptyContent}>
        <div className={styles.emptyIcon}>
          {icon || defaultIcon}
        </div>
        <h3 className={styles.emptyTitle}>{title}</h3>
        <p className={styles.emptyDescription}>
          {description}
        </p>
      </div>
    </div>
  );
};
