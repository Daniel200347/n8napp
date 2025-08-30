import { useState, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', error, showPasswordToggle, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return emailRegex.test(email.trim());
    };

    const validatePassword = (password: string): boolean => {
      return password.length >= 6;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      if (type === 'email' && value) {
        setIsValid(validateEmail(value));
      } else if (type === 'password' && value) {
        setIsValid(validatePassword(value));
      } else {
        setIsValid(null);
      }

      props.onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      if (type === 'email' && value) {
        setIsValid(validateEmail(value));
      } else if (type === 'password' && value) {
        setIsValid(validatePassword(value));
      }

      props.onBlur?.(e);
    };

    return (
      <div className={styles.inputGroup}>
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
        <div className={`${styles.inputContainer} ${error || isValid === false ? styles.error : ''} ${isValid === true ? styles.success : ''}`}>
          <input
            ref={ref}
            type={inputType}
            className={`${styles.input} ${className || ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          />
          {type === 'password' && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordToggle}
            >
              {showPassword ? 
                <EyeOff className={styles.eyeIcon} /> : 
                <Eye className={styles.eyeIcon} />
              }
            </button>
          )}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
        {type === 'email' && isValid === false && !error && (
          <span className={styles.errorText}>Введите корректный email адрес</span>
        )}
        {type === 'password' && isValid === false && !error && (
          <span className={styles.errorText}>Пароль должен содержать минимум 6 символов</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
