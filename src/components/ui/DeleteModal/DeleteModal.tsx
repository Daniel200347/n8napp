import React from 'react';
import styles from './DeleteModal.module.css';
import { CloseIcon } from '../Icons';

interface DeleteModalProps {
  isOpen: boolean;
  count: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  count,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  const getTitle = () => {
    return count === 1 ? 'Удалить автоматизацию?' : `Удалить автоматизации?`;
  };

  const getDescription = () => {
    if (count === 1) {
      return 'Вы уверены, что хотите удалить эту автоматизацию? Это приведет к безвозвратному удалению выбранной автоматизации, всех её данных и всех фоновых процессов.';
    }
    return `Вы уверены, что хотите удалить эти автоматизации? Это приведет к безвозвратному удалению выбранных автоматизаций, всех их данных и всех фоновых процессов. `;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>{getTitle()}</h2>
          <p className={styles.description}>{getDescription()}</p>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Отменить
          </button>
          <button className={styles.deleteButton} onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
