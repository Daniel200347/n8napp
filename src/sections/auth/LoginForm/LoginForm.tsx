import React from 'react';
import {Link} from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import {Separator} from '@/components/ui/Separator';
import {Logo} from '@/components/ui/Logo';
import {GoogleIcon} from '@/components/ui/Icons';
import styles from './LoginForm.module.css';
import { FooterAuth } from '@/components/ui/FooterAuth';

export const LoginForm = () => {
    const [formData, setFormData] = React.useState({
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

    const handleGoogleLogin = () => {
    };

    return (
        <div className={styles.container}>
            <Logo />

            <main className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Вход</h1>
                    </div>

                    <div className={styles.content}>
                        <Button
                            variant="google"
                            leftIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                            type="button"
                        >
                            Войти через Google
                        </Button>

                        <Separator />

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                label="Электронная почта"
                                placeholder="Введите электронную почту"
                                value={'example@mail.ru'}
                                onChange={handleInputChange}
                                required
                            />

                            <Input
                                id="password"
                                name="password"
                                type="password"
                                label="Пароль"
                                placeholder="Введите пароль"
                                value={formData.password}
                                onChange={handleInputChange}
                                showPasswordToggle
                                required
                            />

                            <div className={styles.submitSection}>
                                <Button type="submit">
                                    Войти
                                </Button>

                                <p className={styles.bottomText}>
                                    Еще нет аккаунта?{' '}
                                    <Link to="/registration" className={styles.linkRegistration}>
                                        Зарегистрироваться
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <FooterAuth />
        </div>
    );
};
