import React from 'react';
import styles from './Progress.module.css';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100, 
  className 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`${styles.progress} ${className || ''}`}>
      <div 
        className={styles.progressFill} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

