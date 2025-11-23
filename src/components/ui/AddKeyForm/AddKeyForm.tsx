import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { DeleteIcon } from '../Icons';
import styles from './AddKeyForm.module.css';

interface ApiKey {
  id: string;
  name: string;
  service: string;
  added: string;
  lastUpdate: string;
  status: 'connected' | 'disconnected' | 'requires_setup';
  apiKey?: string;
  resourceName?: string;
  apiVersion?: string;
  endpoint?: string;
  [key: string]: unknown;
}

interface AddKeyFormProps {
  onClose: () => void;
  onAddKey?: (keyData: ApiKey) => void;
  onDeleteKey?: (keyId: string) => void;
  selectedKey?: ApiKey;
}

export const AddKeyForm: React.FC<AddKeyFormProps> = ({ onClose, onAddKey, onDeleteKey, selectedKey }) => {
  const [currentStep, setCurrentStep] = useState(selectedKey ? 3 : 1);
  const [activeTab, setActiveTab] = useState<'connection' | 'details'>('connection');

  React.useEffect(() => {
    if (selectedKey) {
      setCurrentStep(3);
    } else {
      setCurrentStep(1);
    }
  }, [selectedKey]);

  React.useEffect(() => {
    if (currentStep === 3 && selectedKey) {
      setFormData({
        service: selectedKey.service || '',
        name: selectedKey.name || 'Учетная запись YandexGPT',
        apiKey: selectedKey.apiKey || '••••••••••••••••••••••••••••••••••••••••••••••••••••',
        resourceName: selectedKey.resourceName || 'YandexGPT',
        apiVersion: selectedKey.apiVersion || '2025-03-01-preview',
        endpoint: selectedKey.endpoint || 'https://yandexgpt.api.cognitive.com',
      });
    } else if (currentStep === 1) {
      setFormData({
        service: '',
        name: 'Учетная запись YandexGPT',
        apiKey: '',
        resourceName: '',
        apiVersion: '',
        endpoint: '',
      });
      setSearchQuery('');
      setIsDropdownOpen(false);
    }
  }, [currentStep, selectedKey]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    service: '',
    name: 'Учетная запись YandexGPT',
    apiKey: '',
    resourceName: '',
    apiVersion: '',
    endpoint: '',
  });

  const services = [
    { id: 'yandexgpt', name: 'YandexGPT', description: 'Яндекс GPT для генерации текста' },
    { id: 'gigachat', name: 'GigaChat', description: 'Сбербанк GigaChat для диалогов' },
    { id: 'openai', name: 'OpenAI', description: 'ChatGPT и другие модели OpenAI' },
    { id: 'anthropic', name: 'Anthropic Claude', description: 'Claude от Anthropic' },
    { id: 'google', name: 'Google AI', description: 'Google Gemini и другие модели' },
    { id: 'cohere', name: 'Cohere', description: 'Cohere для обработки текста' },
    { id: 'huggingface', name: 'Hugging Face', description: 'Открытые модели машинного обучения' }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceSelect = (serviceId: string) => {
    const selectedService = services.find(s => s.id === serviceId);
    handleInputChange('service', serviceId);
    handleInputChange('name', `Учетная запись ${selectedService?.name || ''}`);
    handleInputChange('endpoint', `https://${serviceId}.api.cognitive.com`);
    setIsDropdownOpen(false);
    setSearchQuery('');
    setCurrentStep(2);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleCloseSideMenu = () => {
    setCurrentStep(1);
    setFormData({
      service: '',
      name: 'Учетная запись YandexGPT',
      apiKey: '',
      resourceName: '',
      apiVersion: '',
      endpoint: '',
    });
    setSearchQuery('');
    setIsDropdownOpen(false);
    onClose();
  };

  const handleAddKey = () => {
    if (onAddKey) {
      const newKey = {
        id: Date.now().toString(),
        name: formData.name || formData.resourceName,
        service: services.find(s => s.id === formData.service)?.name || formData.service,
        added: new Date().toLocaleString('ru-RU', {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit'
        }),
        lastUpdate: new Date().toLocaleString('ru-RU', {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'connected' as const
      };
      onAddKey(newKey);
    }
    handleCloseSideMenu();
  };

  const isStep2Complete = formData.name && formData.apiKey && formData.resourceName;

  const renderStep1 = () => (
    <div className={styles.stepContent}>
      <div className={styles.stepHeader}>
        <h3 className={styles.stepTitle}>Новый ключ</h3>
        <p className={styles.stepDescription}>
          Выберите приложение или службу для подключения
        </p>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchInput}>
          <div className={styles.searchIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            className={styles.searchField}
            placeholder="Название приложения или службы..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <div
            className={styles.dropdownIcon}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdownList}>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div
                  key={service.id}
                  className={styles.dropdownItem}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className={styles.serviceIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="6" fill="#F1F5F9"/>
                      <path d="M8 12L11 15L16 9" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.serviceInfo}>
                    <h4 className={styles.serviceName}>{service.name}</h4>
                    <p className={styles.serviceDescription}>{service.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>Ничего не найдено</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => {
    const selectedService = services.find(s => s.id === formData.service);

    return (
      <div className={styles.stepContent}>
        <div className={styles.stepHeader}>
          <h3 className={styles.stepTitle}>Новый ключ</h3>
          <p className={styles.stepDescription}>
            Выберите приложение или службу для подключения
          </p>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              className={styles.searchField}
              value={selectedService?.name || ''}
              readOnly
            />
            <div className={styles.dropdownIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.formFields}>
          <div className={styles.formGroup}>
            <Input
              label="Название"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Учетная запись YandexGPT"
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="API ключ*"
              value={formData.apiKey}
              onChange={(e) => handleInputChange('apiKey', e.target.value)}
              placeholder=""
              type="password"
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Имя ресурса*"
              value={formData.resourceName}
              onChange={(e) => handleInputChange('resourceName', e.target.value)}
              placeholder=""
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Версия API"
              value={formData.apiVersion}
              onChange={(e) => handleInputChange('apiVersion', e.target.value)}
              placeholder=""
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Конечная точка"
              value={formData.endpoint}
              onChange={(e) => handleInputChange('endpoint', e.target.value)}
              placeholder="https://yandexgpt.api.cognitive.com"
              disabled
            />
          </div>

          <div className={styles.helpSection}>
            <span className={styles.helpText}>Нужна помощь?</span>
            <a href="#" className={styles.helpLink}>Открыть документацию</a>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className={styles.stepContent}>
      <div className={styles.stepHeader}>
        <h3 className={styles.stepTitle}>Новый ключ</h3>
        <p className={styles.stepDescription}>
          Выберите приложение или службу для подключения
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'connection' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('connection')}
          >
            Подключение
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'details' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Подробности
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'connection' ? (
        <div className={styles.formFields}>
          <div className={styles.formGroup}>
            <Input
              label="Название"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Учетная запись YandexGPT"
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="API ключ"
              value={formData.apiKey}
              onChange={(e) => handleInputChange('apiKey', e.target.value)}
              placeholder=""
              type="password"
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Имя ресурса"
              value={formData.resourceName}
              onChange={(e) => handleInputChange('resourceName', e.target.value)}
              placeholder=""
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Версия API"
              value={formData.apiVersion}
              onChange={(e) => handleInputChange('apiVersion', e.target.value)}
              placeholder=""
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Конечная точка"
              value={formData.endpoint}
              onChange={(e) => handleInputChange('endpoint', e.target.value)}
              placeholder="https://yandexgpt.api.cognitive.com"
            />
          </div>

          <div className={styles.helpSection}>
            <span className={styles.helpText}>Нужна помощь? </span>
            <a href="#" className={styles.helpLink}>Открыть документацию</a>
          </div>
        </div>
      ) : (
        <div className={styles.detailsSection}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Создан</span>
            <span className={styles.detailValue}>Сегодня, в 10:12</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Последнее обновление</span>
            <span className={styles.detailValue}>21 августа, в 14:03</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Идентификатор</span>
            <span className={styles.detailValue}>0HmQlBpcaNOTaPpf</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className={styles.formContainer}>
      {renderStep()}

      <div className={styles.formActions}>
        {currentStep === 2 && (
          <Button
            variant="default"
            size="sm"
            onClick={handleAddKey}
            disabled={!isStep2Complete}
            className={styles.addButton}
          >
            Добавить
          </Button>
        )}
                 {currentStep === 3 && activeTab === 'connection' && (
           <>
             <Button
               variant="outline"
               size="sm"
               leftIcon={<DeleteIcon />}
               onClick={() => {
                 if (onDeleteKey && selectedKey?.id) {
                   onDeleteKey(selectedKey.id);
                 }
               }}
               className={styles.deleteButton}
             >
               Удалить
             </Button>
             <Button
               variant="default"
               size="sm"
               onClick={handleCloseSideMenu}
               disabled={!formData.name || !formData.apiKey || !formData.resourceName}
               className={styles.saveButton}
             >
               Сохранить
             </Button>
           </>
         )}
      </div>
    </div>
  );
};
