import { useState } from 'react'
import clsx from 'clsx'
import styles from './PersonalSettings.module.css'
import { InputField } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface PersonalSettingsProps {
  className?: string
  onValidationChange?: (isValid: boolean) => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
}

export const PersonalSettings = ({ className, onValidationChange }: PersonalSettingsProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: ''
  })

  const [isModified, setIsModified] = useState(false)

  const isFormValid = formData.firstName.trim() !== '' && 
                     formData.lastName.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    setIsModified(true)
    
    // Проверяем валидность формы и передаем в родительский компонент
    const isValid = newFormData.firstName.trim() !== '' && 
                   newFormData.lastName.trim() !== '' && 
                   newFormData.email.trim() !== '' && 
                   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newFormData.email)
    onValidationChange?.(isValid)
  }

  const handleSave = () => {
    console.log('Saving personal settings:', formData)
    setIsModified(false)
  }

  return (
    <section className={clsx(styles.personalSettings, className)}>
      <h2 className={styles.sectionTitle}>Персональные</h2>

      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Имя</label>
            <InputField
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              placeholder="Введите ваше имя"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Фамилия</label>
            <InputField
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              placeholder="Введите вашу фамилию"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Электронная почта</label>
          <InputField
            value={formData.email}
            onChange={handleInputChange('email')}
            type="email"
            placeholder="example@domain.com"
            className={styles.emailInput}
          />
        </div>
      </div>


    </section>
  )
}
