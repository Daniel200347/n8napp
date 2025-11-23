import React, { useState } from 'react';
import { PlusIcon } from '../../ui/Icons';
import { TriggerModal } from './TriggerModal';
import { TriggerConfirmationModal } from './TriggerConfirmationModal';
import { TriggerCard } from './TriggerCard';
import type { Trigger } from './types';
import styles from './AddTriggerButton.module.css';

interface AddTriggerButtonProps {
  onAddTrigger: () => void;
}

export const AddTriggerButton: React.FC<AddTriggerButtonProps> = ({ onAddTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<any>(null);
  const [triggers, setTriggers] = useState<Trigger[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTriggerSelect = (trigger: any) => {
    setSelectedTrigger(trigger);
    setIsModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedTrigger(null);
  };

  const handleConfirmTrigger = (formData: any) => {
    const newTrigger: Trigger = {
      id: Date.now().toString(),
      name: selectedTrigger.name,
      serviceName: selectedTrigger.serviceName,
      serviceIcon: selectedTrigger.icon,
      status: 'active',
      formData
    };
    
    setTriggers(prev => [...prev, newTrigger]);
    setIsConfirmationModalOpen(false);
    setSelectedTrigger(null);
    onAddTrigger();
  };

  const emptyTriggersContent = (
        <div className={styles.addTriggerContainer}>
          <button className={styles.addTriggerButton} onClick={handleOpenModal}>
            <PlusIcon className={styles.plusIcon} />
            <span className={styles.buttonText}>Добавить триггер</span>
          </button>
          <div className={styles.connectionLine}></div>
          <button className={styles.triggerNode} onClick={handleOpenModal}>
            <PlusIcon className={styles.nodePlusIcon} />
          </button>
        </div>
      );

  const triggersContent = (
      <div className={styles.triggersContainer}>
        {triggers.map((trigger, index) => (
          <div key={trigger.id} className={styles.triggerItem}>
            <TriggerCard
              id={trigger.id}
              number={index + 1}
              name={trigger.name}
              serviceName={trigger.serviceName}
              serviceIcon={trigger.serviceIcon}
              status={trigger.status}
              onEdit={() => {}}
              onDuplicate={() => {}}
              onToggle={() => {}}
              onDelete={() => {}}
              onRun={() => {}}
            />
            {index < triggers.length - 1 && (
              <div className={styles.triggerConnection}>
                <div className={styles.triggerPlusButton} onClick={handleOpenModal}>
                  <PlusIcon size={16} />
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className={styles.triggerConnection}>
          <div className={styles.triggerPlusButton} onClick={handleOpenModal}>
            <PlusIcon size={16} />
          </div>
        </div>
      </div>
    );

  return (
    <>
      {triggers.length === 0 ? emptyTriggersContent : triggersContent}

      <TriggerModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onTriggerSelect={handleTriggerSelect}
      />
      
      {selectedTrigger && (
        <TriggerConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleCloseConfirmationModal}
          triggerName={selectedTrigger.name}
          serviceName={selectedTrigger.serviceName}
          serviceIcon={selectedTrigger.icon}
          onConfirm={handleConfirmTrigger}
        />
      )}
    </>
  );
};
