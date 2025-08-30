import { Button } from '@/components/ui/Button';
import { CloseIcon } from '@/components/ui/Icons';
import styles from './TemplateModal.module.css';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    title: string;
    description: string;
    icons: React.ReactNode[];
  };
  onUseTemplate: () => void;
}

export const TemplateModal = ({ isOpen, onClose, template, onUseTemplate }: TemplateModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.modalActions}>
          {template.icons.map((icon, index) => (
            <div key={index} className={styles.iconWrapper}>
              {icon}
            </div>
          ))}
          <div className={styles.iconWrapper}>
            <span className={styles.iconText}>+5</span>
          </div>
        </div>

        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{template.title}</h2>
          <p className={styles.modalDescription}>{template.description}</p>
        </div>

        <div className={styles.modalFooter}>
          <Button
            variant="primary"
            size="md"
            onClick={onUseTemplate}
          >
            Использовать
          </Button>
        </div>
      </div>
    </div>
  );
};
