import React, { useState } from 'react';
import { SearchIcon, PlusIcon } from '../../ui/Icons';
import styles from './TriggerSidebar.module.css';

interface Service {
  id: string;
  name: string;
  triggerCount: number;
  iconColor: string;
}

interface TriggerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect?: (service: { name: string; iconColor: string; triggerCount: number }) => void;
}


const mockServices: Service[] = [
  { id: '1', name: 'Google Drive', triggerCount: 4, iconColor: '#2A9D90' },
  { id: '2', name: 'Gmail', triggerCount: 6, iconColor: '#E76E50' },
  { id: '3', name: 'Slack', triggerCount: 24, iconColor: '#CA6CD3' },
  { id: '4', name: 'Trello', triggerCount: 9, iconColor: '#F4A462' },
  { id: '5', name: 'Webhook', triggerCount: 12, iconColor: '#155DFC' },
  { id: '6', name: 'Schedule', triggerCount: 4, iconColor: '#2A9D90' },
  { id: '7', name: 'Email', triggerCount: 6, iconColor: '#E76E50' },
  { id: '8', name: 'Form', triggerCount: 24, iconColor: '#CA6CD3' },
  { id: '9', name: 'File', triggerCount: 9, iconColor: '#F4A462' },
  { id: '10', name: 'API', triggerCount: 12, iconColor: '#155DFC' },
];

export const TriggerSidebar: React.FC<TriggerSidebarProps> = ({ isOpen, onClose, onServiceSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowSidebar(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowSidebar(false);
    }
  }, [isOpen]);

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceSelect = (service: Service) => {
    if (onServiceSelect) {
      onServiceSelect({
        name: service.name,
        iconColor: service.iconColor,
        triggerCount: service.triggerCount
      });
    }
  };


  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${showSidebar ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск сервиса..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.servicesContainer}>
          <h3 className={styles.sectionTitle}>Основное</h3>
          <div className={styles.servicesList}>
            {filteredServices.slice(0, 5).map((service) => (
              <div
                key={service.id}
                className={styles.serviceCard}
                onClick={() => handleServiceSelect(service)}
              >
                <div 
                  className={styles.serviceIcon}
                  style={{ backgroundColor: `${service.iconColor}26` }}
                >
                  <PlusIcon className={styles.iconPlus} />
                </div>
                <div className={styles.serviceInfo}>
                  <div className={styles.serviceName}>{service.name}</div>
                  <div className={styles.triggerCount}>{service.triggerCount} триггера</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className={styles.sectionTitle}>Приложения</h3>
          <div className={styles.servicesList}>
            {filteredServices.slice(5).map((service) => (
              <div
                key={service.id}
                className={styles.serviceCard}
                onClick={() => handleServiceSelect(service)}
              >
                <div 
                  className={styles.serviceIcon}
                  style={{ backgroundColor: `${service.iconColor}26` }}
                >
                  <PlusIcon className={styles.iconPlus} />
                </div>
                <div className={styles.serviceInfo}>
                  <div className={styles.serviceName}>{service.name}</div>
                  <div className={styles.triggerCount}>{service.triggerCount} триггера</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
