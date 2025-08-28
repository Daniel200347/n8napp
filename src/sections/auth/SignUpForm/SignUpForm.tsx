import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Logo } from '@/components/ui/Logo';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import styles from './SignUpForm.module.css';
import { FooterAuth } from '@/components/ui/FooterAuth';

export const SignUpForm = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleGoogleSignUp = () => {
  };

  return (
    <div className={styles.container}>
      <Logo />

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Регистрация</h1>
          </div>

          <div className={styles.content}>
            <Button
              variant="google"
              leftIcon={<GoogleIcon />}
              onClick={handleGoogleSignUp}
              type="button"
            >
              Войти через Google
            </Button>

            <Separator />

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="Имя"
                  placeholder="Введите имя"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Фамилия"
                  placeholder="Введите фамилию"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                id="email"
                name="email"
                type="email"
                label="Электронная почта"
                placeholder="Введите свою электронную почту"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Пароль"
                placeholder="Придумайте пароль"
                value={formData.password}
                onChange={handleInputChange}
                showPasswordToggle
                required
              />

              <div className={styles.submitSection}>
                <Button type="submit">
                  Зарегистрироваться
                </Button>

                <p className={styles.bottomText}>
                  Создавая учетную запись, вы соглашаетесь с{' '}
                  <a href="#" className={styles.linkGray}>
                    Условиями предоставления услуг
                  </a>{' '}
                  и{' '}
                  <a href="#" className={styles.linkGray}>
                    Политикой конфиденциальности
                  </a>
                  .
                  <br />
                  <br />
                  Уже есть аккаунт?{' '}
                  <Link to="/login" className={styles.link}>
                    Войти
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <FooterAuth/>
    </div>
  );
};
