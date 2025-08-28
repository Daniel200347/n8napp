import styles from './FooterAuth.module.css';

export const FooterAuth = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <span>© N8N Killer</span>
                <a href="#" className={styles.footerLink}>Политика конфиденциальности</a>
                <a href="#" className={styles.footerLink}>Поддержка</a>
            </div>
        </footer>
    );
};
