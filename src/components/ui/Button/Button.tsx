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
  // Функция для получения правильного цвета иконки в зависимости от варианта
  const getIconColor = () => {
    switch (variant) {
      case 'outline':
        return '#0F172B'; // Темный цвет для outline кнопок
      case 'default':
      case 'primary':
        return '#F8FAFC'; // Белый цвет для default/primary кнопок
      case 'google':
        return '#0F172B'; // Темный цвет для google кнопок
      default:
        return 'currentColor';
    }
  };

  // Функция для клонирования иконки с правильным цветом
  const cloneIconWithColor = (icon: ReactNode) => {
    if (isValidElement(icon) && typeof icon.type === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
