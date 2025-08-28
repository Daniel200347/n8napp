import { Sidebar } from '@/components/ui/Sidebar'
import styles from './SettingsPage.module.css'

export const TemplatesPage = () => {
  return (
    <div className={styles.settingsPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Шаблоны</h1>
            <p className={styles.description}>
              Управление шаблонами рабочих процессов
            </p>
          </header>
          
          <div className={styles.sectionsContainer}>
            <p>Здесь будет содержимое страницы шаблонов...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
