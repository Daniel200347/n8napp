import React, { useState } from 'react';
import { CloseIcon, SparklesIcon, AIAssistantIcon, ClockIcon, TelegramIcon, SendIcon } from '../../ui/Icons';
import styles from './AIAssistantModal.module.css';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setQuery('');
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${showModal ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <SparklesIcon width={24} height={24} className={styles.sparkleIcon} />
            ИИ помощник
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            <AIAssistantIcon width={80} height={80} />
          </div>
          <h3 className={styles.assistantName}>ИИ помощница Алёна</h3>
          <p className={styles.assistantDescription}>
            Умная помощница, созданная на базе ChatGPT, поможет найти ответ на любой вопрос.
          </p>
        </div>

        <div className={styles.faqSection}>
          <h4 className={styles.sectionTitle}>Часто спрашивают</h4>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <ClockIcon width={16} height={16} />
              <span className={styles.faqText}>Как правильно добавить триггер?</span>
            </div>
            <div className={styles.faqItem}>
              <ClockIcon width={16} height={16} />
              <span className={styles.faqText}>Как правильно настроить триггер?</span>
            </div>
          </div>
        </div>

        <div className={styles.helpSection}>
          <h4 className={styles.sectionTitle}>Помощь от кожанных</h4>
          <div className={styles.helpItem}>
            <TelegramIcon width={16} height={16} />
            <span className={styles.helpText}>Поддержка в Телеграме</span>
          </div>
        </div>

        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Запрос к ИИ Алёне..."
              className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>
              <SendIcon width={20} height={20} />
            </button>
          </div>
        </form>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <SparklesIcon width={16} height={16} />
            <span className={styles.footerText}>ИИ помощник</span>
          </div>
        </div>
      </div>
    </div>
  );
};
