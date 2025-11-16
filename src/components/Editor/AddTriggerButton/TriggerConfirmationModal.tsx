import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon } from '../../ui/Icons';
import styles from './TriggerConfirmationModal.module.css';

interface TriggerConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerName: string;
  serviceName: string;
  serviceIcon: React.ReactNode;
  onConfirm: (data: TriggerFormData) => void;
  onFieldChange?: (isValid: boolean) => void;
  initialFormData?: TriggerFormData;
  isOtherModalOpen?: boolean;
  onAutoSave?: (data: TriggerFormData) => void;
  isViewMode?: boolean;
}

interface TriggerFormData {
  name: string;
  description: string;
  option: string;
  notes: string;
  password: string;
  skipOnError: boolean;
  notifyMe: boolean;
}

export const TriggerConfirmationModal: React.FC<TriggerConfirmationModalProps> = ({
  isOpen,
  onClose,
  triggerName,
  serviceName,
  serviceIcon,
  onConfirm,
  onFieldChange,
  initialFormData,
  isOtherModalOpen = false,
  onAutoSave,
  isViewMode = false
}) => {
  const [formData, setFormData] = useState<TriggerFormData>(
    initialFormData || {
      name: '',
      description: '',
      option: '',
      notes: '',
      password: '',
      skipOnError: false,
      notifyMe: false
    }
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const handleInputChange = (field: keyof TriggerFormData, value: string | boolean) => {
    if (isViewMode) return;
    
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      return newData;
    });
  };

  useEffect(() => {
    if (isViewMode) return;
    
    const isValid = formData.name.trim() !== '' && 
                   formData.option.trim() !== '' && 
                   formData.notes.trim() !== '' && 
                   formData.password.trim() !== '';
    
    if (onFieldChange) {
      onFieldChange(isValid);
    }
  }, [formData.name, formData.option, formData.notes, formData.password, onFieldChange, isViewMode]);

  const previousFormDataRef = useRef<string>('');
  
  useEffect(() => {
    if (isViewMode) return;
    
    const formDataStr = JSON.stringify(formData);
    
    if (onAutoSave && formDataStr !== previousFormDataRef.current && (formData.name || formData.option || formData.notes || formData.password)) {
      previousFormDataRef.current = formDataStr;
      onAutoSave(formData);
    }
  }, [formData, onAutoSave, isViewMode]);


  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (isOtherModalOpen) {
      const target = e.target as HTMLElement;
      const otherModal = document.querySelector('[data-modal-type="event-journal"]');
      if (otherModal && otherModal.contains(target)) {
        return;
      }
    }
    if (e.target === e.currentTarget) {
      onConfirm?.(formData);
    }
  };

  return (
    <div 
      className={`${styles.overlay} ${showModal ? styles.open : ''}`} 
      onClick={handleOverlayClick}
      data-modal-type="edit-trigger"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>1. {triggerName}</h2>
          <button className={styles.closeButton} onClick={() => onConfirm?.(formData)}>
            <CloseIcon size={16} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              {serviceIcon}
            </div>
            <div className={styles.serviceInfo}>
              <h3 className={styles.serviceName}>{serviceName}</h3>
              <p className={styles.serviceDescription}>Описание</p>
            </div>
          </div>

          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Label</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Placeholder"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isViewMode}
                readOnly={isViewMode}
              />
              <p className={styles.helpText}>Help Text</p>
            </div>

            <div className={styles.selectGroup}>
              <label className={styles.label}>Label Text</label>
              <select
                className={styles.select}
                value={formData.option}
                onChange={(e) => handleInputChange('option', e.target.value)}
                disabled={isViewMode}
              >
                <option value="">Select option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              <p className={styles.helpText}>Help Text</p>
            </div>

            <div className={styles.textareaGroup}>
              <label className={styles.label}>Label</label>
              <textarea
                className={styles.textarea}
                placeholder="Input Value"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                disabled={isViewMode}
                readOnly={isViewMode}
              />
              <p className={styles.helpText}>Help Text</p>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Label</label>
              <div className={styles.passwordInput}>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Placeholder"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isViewMode}
                  readOnly={isViewMode}
                />
                <button type="button" className={styles.eyeButton}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M1.67 10C1.67 5.4 5.4 1.67 10 1.67C14.6 1.67 18.33 5.4 18.33 10C18.33 14.6 14.6 18.33 10 18.33C5.4 18.33 1.67 14.6 1.67 10Z" stroke="#62748E" strokeWidth="1.5"/>
                    <path d="M10 8.33C10.92 8.33 11.67 9.08 11.67 10C11.67 10.92 10.92 11.67 10 11.67C9.08 11.67 8.33 10.92 8.33 10C8.33 9.08 9.08 8.33 10 8.33Z" stroke="#62748E" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.switchGroup}>
              <div className={styles.switchContainer}>
                <label className={styles.label}>Label</label>
                <p className={styles.helpText}>
                  Включите эту опцию, чтобы пропустить этот шаг и продолжить выполнение в обычном режиме в случае сбоя.
                </p>
              </div>
              <button
                type="button"
                className={`${styles.switch} ${formData.skipOnError ? styles.switchActive : ''}`}
                onClick={() => handleInputChange('skipOnError', !formData.skipOnError)}
                disabled={isViewMode}
              >
                <div className={`${styles.switchThumb} ${formData.skipOnError ? styles.switchThumbActive : ''}`} />
              </button>
            </div>

            <div className={styles.checkboxGroup}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="checkbox"
                  className={styles.checkbox}
                  checked={formData.notifyMe}
                  onChange={(e) => handleInputChange('notifyMe', e.target.checked)}
                  disabled={isViewMode}
                />
                <label htmlFor="checkbox" className={styles.checkboxLabel}>Label</label>
              </div>
              <p className={styles.helpText}>
                Включите эту опцию, чтобы пропустить этот шаг и продолжить выполнение в обычном режиме в случае сбоя.
              </p>
            </div>

            <div className={styles.radioGroup}>
              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  id="radio"
                  name="notify"
                  className={styles.radio}
                  disabled={isViewMode}
                />
                <label htmlFor="radio" className={styles.radioLabel}>Notify me</label>
              </div>
              <p className={styles.helpText}>
                Включите эту опцию, чтобы пропустить этот шаг и продолжить выполнение в обычном режиме в случае сбоя.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
