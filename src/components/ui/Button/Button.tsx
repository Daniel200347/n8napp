import { cloneElement, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'default' | 'disabled' | 'google' | 'destructive';
  size?: 'default' | 'sm' | 'md' | 'lg' | 'icon';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  active?: boolean;
}

export const Button = ({ 
  variant = 'default', 
  size = 'default', 
  leftIcon, 
  rightIcon, 
  children, 
  className, 
  active = false,
  ...props 
}: ButtonProps) => {
  const getIconColor = () => {
    switch (variant) {
      case 'outline':
        return '#0F172B';
      case 'default':
      case 'primary':
        return '#F8FAFC';
      case 'google':
        return '#0F172B';
      default:
        return 'currentColor';
    }
  };

  const cloneIconWithColor = (icon: ReactNode) => {
    if (isValidElement(icon) && typeof icon.type === 'function') {
      return cloneElement(icon, { color: getIconColor() } as any);
    }
    return icon;
  };

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${active ? styles.active : ''} ${className || ''}`}
      {...props}
    >
      {leftIcon && <span className={styles.leftIcon}>{cloneIconWithColor(leftIcon)}</span>}
      <span className={styles.content}>{children}</span>
      {rightIcon && <span className={styles.rightIcon}>{cloneIconWithColor(rightIcon)}</span>}
    </button>
  );
};
