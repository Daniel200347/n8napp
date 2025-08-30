import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { InfoIcon } from '@/components/ui/Icons';
import styles from './TemplateCard.module.css';

interface TemplateCardProps {
  title: string;
  icons: React.ReactNode[];
  onInfoClick: () => void;
  onUseClick: () => void;
}

export const TemplateCard = ({ title, icons, onInfoClick, onUseClick }: TemplateCardProps) => {
  // Массивы с названиями нод для каждой иконки
  const nodeNames = [
    ['GigaCha', 'YandexGPT', 'Max', 'SBER support', 'Google sheet'],
    ['YandexGPT', 'GigaCha', 'Max', 'SBER support', 'Google sheet'],
    ['Max', 'GigaCha', 'YandexGPT', 'SBER support', 'Google sheet'],
    ['SBER support', 'GigaCha', 'YandexGPT', 'Max', 'Google sheet'],
    ['Google sheet', 'GigaCha', 'YandexGPT', 'Max', 'SBER support']
  ];

  return (
    <div className={`${styles.templateCard} templateCard`}>
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          {icons.map((icon, index) => (
            <Tooltip key={index} content={nodeNames[index % nodeNames.length]}>
              <div className={styles.iconWrapper}>
                {icon}
              </div>
            </Tooltip>
          ))}
          <Tooltip content={['GigaCha', 'YandexGPT', 'Max', 'SBER support', 'Google sheet']}>
            <div className={styles.iconWrapper}>
              <span className={styles.iconText}>+5</span>
            </div>
          </Tooltip>
        </div>

        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          variant="primary"
          size="default"
          onClick={onUseClick}
          className={styles.button}
        >
          Использовать
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onInfoClick}
          className={styles.button}

        >
          <InfoIcon />
        </Button>
      </div>
    </div>
  );
};
