import { Sidebar } from '@/components/ui/Sidebar'
import styles from './SettingsPage.module.css'

export const StatisticsPage = () => {
  return (
    <div className={styles.settingsPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Статистика</h1>
            <p className={styles.description}>
              Анализ производительности и метрики
            </p>
          </header>
          
          <div className={styles.sectionsContainer}>
            <p>Здесь будет содержимое страницы статистики...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
