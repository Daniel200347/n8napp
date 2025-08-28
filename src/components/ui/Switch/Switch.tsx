import React from 'react';
import styles from './Switch.module.css';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ 
  checked = false, 
  disabled = false, 
  onChange,
  className 
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={`${styles.switch} ${className || ''}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.switchInput}
      />
      <div className={`${styles.switchControl} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}>
        <div className={styles.switchThumb} />
      </div>
    </label>
  );
};

