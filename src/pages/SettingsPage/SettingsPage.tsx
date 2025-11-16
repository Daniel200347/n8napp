import { useState } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './SettingsPage.module.css';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  passwordLastUpdated: string;
}

const mockUserProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  passwordLastUpdated: '20 июля 14:44',
};

export const SettingsPage = () => {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isFormModified, setIsFormModified] = useState(false);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsFormModified(true);
  };

  const handleSaveChanges = () => {
    setIsFormModified(false);
  };

  const handleChangePassword = () => {
  };

  return (
    <div className={styles.settingsPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Настройки</h1>
              <p className={styles.description}>
                Здесь вы можете обновить информацию профиля и настроить параметры безопасности
              </p>
            </div>
          </header>

          <div className={styles.sectionsContainer}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Персональные</h2>

              <div className={styles.formContainer}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <Input
                      label="Имя"
                      placeholder="Введите ваше имя"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <Input
                      label="Фамилия"
                      placeholder="Введите вашу фамилию"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <Input
                    label="Электронная почта"
                    type="email"
                    placeholder="example@email.com"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Безопасность</h2>

              <div className={styles.securityContainer}>
                <div className={styles.passwordInfo}>
                  <h3 className={styles.passwordTitle}>Пароль</h3>
                  <p className={styles.passwordSubtitle}>
                    Последнее обновление: {profile.passwordLastUpdated}
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

            <div className={styles.saveContainer}>
              <Button
                variant="default"
                size="lg"
                onClick={handleSaveChanges}
                disabled={!isFormModified}
                className={styles.saveButton}
              >
                Сохранить изменения
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

