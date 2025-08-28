import clsx from 'clsx'
import styles from './SecuritySettings.module.css'
import { Button } from '@/components/ui/Button'

interface SecuritySettingsProps {
  className?: string
}

export const SecuritySettings = ({ className }: SecuritySettingsProps) => {
  const handleChangePassword = () => {
    // Handle password change logic here
    console.log('Opening password change modal')
  }

  return (
    <section className={clsx(styles.securitySettings, className)}>
      <h2 className={styles.sectionTitle}>Безопасность</h2>
      
      <div className={styles.passwordSection}>
        <div className={styles.passwordInfo}>
          <h3 className={styles.passwordTitle}>Пароль</h3>
          <p className={styles.passwordLastUpdated}>
            Последнее обновление: 20 июля, 14:44
          </p>
        </div>
        
        <Button
          variant="outline"
          size="default"
          onClick={handleChangePassword}
          className={styles.changePasswordButton}
        >
          Сменить пароль
        </Button>
      </div>
    </section>
  )
}
