import React from 'react';
import { Handle, Position } from 'reactflow';
import { TriggerCard } from './TriggerCard';
import { PlusIcon } from '../../ui/Icons';
import styles from './TriggerCardNode.module.css';
import type {TriggerStatus} from "@/components/Editor/AddTriggerButton/types.ts";

interface TriggerCardNodeProps {
  data: {
    id: string;
    name: string;
    serviceName: string;
    serviceIcon: React.ReactNode;
    status: TriggerStatus;
    number?: number;
    onEdit?: () => void;
    onDelete?: () => void;
    onRun?: () => void;
    onDuplicate?: () => void;
    onToggle?: () => void;
    onEnable?: () => void;
    onIconClick?: () => void;
    onAddTrigger?: () => void;
    isViewMode?: boolean;
  };
}

export const TriggerCardNode: React.FC<TriggerCardNodeProps> = ({ data }) => {
  const { id, name, serviceName, serviceIcon, status, number = 1, onEdit, onDelete, onRun, onDuplicate, onToggle, onEnable, onIconClick, onAddTrigger, isViewMode } = data;

  return (
    <div className={styles.nodeContainer}>
      <Handle type="target" position={Position.Top} />
      
      <TriggerCard
        id={id}
        number={number}
        name={name}
        serviceName={serviceName}
        serviceIcon={serviceIcon}
        status={status}
        onEdit={onEdit}
        onDelete={onDelete}
        onRun={onRun}
        onDuplicate={onDuplicate}
        onToggle={onToggle}
        onEnable={onEnable}
        onIconClick={onIconClick}
        isViewMode={isViewMode}
      />

      <div className={styles.connectorContainer}>
        <div className={styles.connectionLine}></div>
        <button 
          className={styles.plusButton} 
          onClick={onAddTrigger}
          disabled={isViewMode}
          style={{ opacity: isViewMode ? 0.5 : 1 }}
        >
          <PlusIcon size={16} />
        </button>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
