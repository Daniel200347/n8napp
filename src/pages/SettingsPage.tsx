import { useState } from 'react'
import { Sidebar } from '@/components/ui/Sidebar'
import styles from './SettingsPage.module.css'
import { PersonalSettings } from '@/components/settings/PersonalSettings'
import { SecuritySettings } from '@/components/settings/SecuritySettings'
import { Button } from '@/components/ui/Button'

export const SettingsPage = () => {
  const [isFormValid, setIsFormValid] = useState(false)

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid)
  }
  return (
    <div className={styles.settingsPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Настройки</h1>
            <p className={styles.description}>
              Все рабочие процессы, учетные данные и выполнения
            </p>
          </header>

          <div className={styles.sectionsContainer}>
            <PersonalSettings onValidationChange={handleValidationChange} />
            <SecuritySettings />
          </div>
          
          <Button
            variant="primary"
            size="lg"
            disabled={!isFormValid}
            className={styles.saveButton}
          >
            Сохранить изменения
          </Button>
        </div>
      </main>
    </div>
  )
}
