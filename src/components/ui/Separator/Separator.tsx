import styles from './Separator.module.css';

interface SeparatorProps {
  text?: string;
}

export const Separator = ({ text = 'Или' }: SeparatorProps) => {
  return (
    <div className={styles.separator}>
      <div className={styles.line}></div>
      <div className={styles.text}>{text}</div>
      <div className={styles.line}></div>
    </div>
  );
};
