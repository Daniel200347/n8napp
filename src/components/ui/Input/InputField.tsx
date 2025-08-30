import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './InputField.module.css'

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void
  error?: string
  className?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ onChange, error, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    return (
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          className={clsx(
            styles.input,
            {
              [styles.inputError]: error,
            },
            className
          )}
          onChange={handleChange}
          {...props}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
