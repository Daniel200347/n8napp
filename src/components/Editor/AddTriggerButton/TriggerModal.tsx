import React, { useState, useMemo } from 'react';
import { SearchIcon, PlusIcon } from '../../ui/Icons';
import { TriggerDetailModal } from './TriggerDetailModal';
import styles from './TriggerModal.module.css';

interface Service {
  id: string;
  name: string;
  triggerCount: number;
  iconColor: string;
}

interface TriggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerSelect?: (trigger: any) => void;
}

interface SelectedService {
  name: string;
  iconColor: string;
  triggerCount: number;
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

export const TriggerModal: React.FC<TriggerModalProps> = ({ isOpen, onClose, onTriggerSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);

  const filteredServices = useMemo(() => {
    if (!searchQuery) return mockServices;
    const lowerQuery = searchQuery.toLowerCase();
    return mockServices.filter(service =>
      service.name.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService({
      name: service.name,
      iconColor: service.iconColor,
      triggerCount: service.triggerCount
    });
    setIsDetailModalOpen(true);
  };

  const handleBackToServices = () => {
    setIsDetailModalOpen(false);
    setSelectedService(null);
  };

  const handleCloseAll = () => {
    setIsDetailModalOpen(false);
    setSelectedService(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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

      {selectedService && (
        <TriggerDetailModal
          isOpen={isDetailModalOpen}
          serviceName={selectedService.name}
          serviceIconColor={selectedService.iconColor}
          triggerCount={selectedService.triggerCount}
          onClose={handleBackToServices}
          onBack={handleBackToServices}
          onTriggerSelect={onTriggerSelect}
          onCloseAll={handleCloseAll}
        />
      )}
    </>
  );
};
