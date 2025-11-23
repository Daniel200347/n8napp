import React from 'react';
import { Handle, Position } from 'reactflow';
import { PlusIcon } from '../../ui/Icons';
import { TriggerCard } from './TriggerCard';
import styles from './TriggerNode.module.css';
import type {Trigger} from "@/components/Editor/AddTriggerButton/types.ts";

interface TriggerNodeProps {
  data: {
    type: 'add-trigger' | 'trigger';
    trigger?: Trigger;
    onAddTrigger?: () => void;
    onUpdateTrigger?: (trigger: Trigger) => void;
    onDeleteTrigger?: (id: string) => void;
    isViewMode?: boolean;
  };
}

export const TriggerNode: React.FC<TriggerNodeProps> = ({ data }) => {
  const { isViewMode = false } = data;

  const handleOpenSidebar = () => {
    if (data.onAddTrigger && !isViewMode) {
      data.onAddTrigger();
    }
  };

  const handleDeleteTrigger = () => {
    if (data.trigger && data.onDeleteTrigger) {
      data.onDeleteTrigger(data.trigger.id);
    }
  };

  if (data.type === 'add-trigger') {
    return (
      <div className={styles.nodeContainer}>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />

        <div className={styles.addTriggerContainer}>
          <button 
            className={styles.addTriggerButton} 
            onClick={handleOpenSidebar}
            disabled={isViewMode}
            style={{ opacity: isViewMode ? 0.5 : 1 }}
          >
            <PlusIcon className={styles.plusIcon} />
            <span className={styles.buttonText}>Добавить триггер</span>
          </button>
          <div className={styles.connectionLine}></div>
          <button 
            className={styles.triggerNode} 
            onClick={handleOpenSidebar}
            disabled={isViewMode}
            style={{ opacity: isViewMode ? 0.5 : 1 }}
          >
            <PlusIcon className={styles.nodePlusIcon} />
          </button>
        </div>
      </div>
    );
  }

  if (data.type === 'trigger' && data.trigger) {
    return (
      <div className={styles.nodeContainer}>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />

        <TriggerCard
          id={data.trigger.id}
          number={1}
          name={data.trigger.name}
          serviceName={data.trigger.serviceName}
          serviceIcon={data.trigger.serviceIcon}
          status={data.trigger.status}
          onEdit={() => {}}
          onDuplicate={() => {}}
          onToggle={() => {}}
          onDelete={handleDeleteTrigger}
          onRun={() => {}}
        />
      </div>
    );
  }

  return null;
};