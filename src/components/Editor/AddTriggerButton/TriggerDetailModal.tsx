import React, { useState } from 'react';
import { SearchIcon, PlusIcon, ChevronDownIcon } from '../../ui/Icons';
import styles from './TriggerDetailModal.module.css';

interface Trigger {
  id: string;
  name: string;
  description: string;
  iconColor: string;
}

interface TriggerDetailModalProps {
  isOpen: boolean;
  serviceName: string;
  serviceIconColor: string;
  triggerCount: number;
  onClose: () => void;
  onBack: () => void;
  onTriggerSelect?: (trigger: { name: string; serviceName: string; icon: React.ReactNode }) => void;
  onCloseAll?: () => void;
}

const mockTriggers: Record<string, Trigger[]> = {
  'Google Drive': [
    { id: '1', name: 'Новый файл', description: 'Создается новый файл в папке', iconColor: '#2A9D90' },
    { id: '2', name: 'Изменен файл', description: 'Файл был изменен или обновлен', iconColor: '#2A9D90' },
    { id: '3', name: 'Удален файл', description: 'Файл был удален из папки', iconColor: '#2A9D90' },
    { id: '4', name: 'Новая папка', description: 'Создается новая папка', iconColor: '#2A9D90' },
  ],
  'Gmail': [
    { id: '5', name: 'Новое письмо', description: 'Получено новое письмо', iconColor: '#E76E50' },
    { id: '6', name: 'Ответ на письмо', description: 'Получен ответ на письмо', iconColor: '#E76E50' },
  ],
  'Slack': [
    { id: '7', name: 'Новое сообщение', description: 'Получено новое сообщение в канале', iconColor: '#CA6CD3' },
    { id: '8', name: 'Упоминание', description: 'Вас упомянули в сообщении', iconColor: '#CA6CD3' },
    { id: '9', name: 'Новый файл', description: 'Загружен новый файл', iconColor: '#CA6CD3' },
  ],
  'Trello': [
    { id: '10', name: 'Новая карточка', description: 'Создана новая карточка', iconColor: '#F4A462' },
    { id: '11', name: 'Изменена карточка', description: 'Карточка была изменена', iconColor: '#F4A462' },
    { id: '12', name: 'Перемещена карточка', description: 'Карточка была перемещена', iconColor: '#F4A462' },
  ],
  'Webhook': [
    { id: '13', name: 'HTTP запрос', description: 'Получен HTTP запрос', iconColor: '#155DFC' },
    { id: '14', name: 'JSON данные', description: 'Получены JSON данные', iconColor: '#155DFC' },
  ],
  'Schedule': [
    { id: '15', name: 'Каждый час', description: 'Срабатывает каждый час', iconColor: '#2A9D90' },
    { id: '16', name: 'Каждый день', description: 'Срабатывает каждый день', iconColor: '#2A9D90' },
  ],
  'Email': [
    { id: '17', name: 'Новое письмо', description: 'Получено новое письмо', iconColor: '#E76E50' },
    { id: '18', name: 'Ответ', description: 'Получен ответ', iconColor: '#E76E50' },
  ],
  'Form': [
    { id: '19', name: 'Новая заявка', description: 'Подана новая заявка', iconColor: '#CA6CD3' },
    { id: '20', name: 'Изменена заявка', description: 'Заявка была изменена', iconColor: '#CA6CD3' },
  ],
  'File': [
    { id: '21', name: 'Загружен файл', description: 'Файл был загружен', iconColor: '#F4A462' },
    { id: '22', name: 'Изменен файл', description: 'Файл был изменен', iconColor: '#F4A462' },
  ],
  'API': [
    { id: '23', name: 'API вызов', description: 'Выполнен API вызов', iconColor: '#155DFC' },
    { id: '24', name: 'Ошибка API', description: 'Произошла ошибка API', iconColor: '#155DFC' },
  ],
};

export const TriggerDetailModal: React.FC<TriggerDetailModalProps> = ({
  isOpen,
  serviceName,
  serviceIconColor,
  onClose,
  onBack,
  onTriggerSelect,
  onCloseAll
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const triggers = mockTriggers[serviceName] || [];
  const filteredTriggers = React.useMemo(() => {
    if (!searchQuery) return triggers;
    const lowerQuery = searchQuery.toLowerCase();
    return triggers.filter(trigger =>
      trigger.name.toLowerCase().includes(lowerQuery) ||
      trigger.description.toLowerCase().includes(lowerQuery)
    );
  }, [triggers, searchQuery]);

  const handleTriggerSelect = (trigger: Trigger) => {
    if (onTriggerSelect) {
      const triggerData = {
        name: trigger.name,
        serviceName: serviceName,
        icon: (
          <div style={{ width: '36px', height: '36px', backgroundColor: serviceIconColor, borderRadius: '8px' }} />
        )
      };
      onTriggerSelect(triggerData);
    }
    if (onCloseAll) {
      onCloseAll();
    } else {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className={`${styles.overlay} ${showModal ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.backButton} onClick={onBack}>
          <ChevronDownIcon className={styles.backIcon} />
        </button>

        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск триггера..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.triggersContainer}>
          <h3 className={styles.sectionTitle}>ТРИГГЕРЫ</h3>
          <div className={styles.triggersList}>
            {filteredTriggers.map((trigger) => (
              <div
                key={trigger.id}
                className={styles.triggerCard}
                onClick={() => handleTriggerSelect(trigger)}
              >
                <div
                  className={styles.triggerIcon}
                  style={{ backgroundColor: `${trigger.iconColor}26` }}
                >
                  <PlusIcon className={styles.iconPlus} />
                </div>
                <div className={styles.triggerInfo}>
                  <div className={styles.triggerName}>{trigger.name}</div>
                  <div className={styles.triggerDescription}>{trigger.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
