import React from 'react';
import { Handle, Position } from 'reactflow';
import { PlusIcon } from '../../ui/Icons';
import styles from './TriggerConnectorNode.module.css';

interface TriggerConnectorNodeProps {
  data: {
    onAddTrigger: (position?: { x: number, y: number }) => void;
  };
  position: { x: number, y: number };
}

export const TriggerConnectorNode: React.FC<TriggerConnectorNodeProps> = ({ data, position }) => {
  const { onAddTrigger } = data;

  const handleClick = () => {
    onAddTrigger(position);
  };

  return (
    <div className={styles.nodeContainer}>
      <Handle type="target" position={Position.Top} />
      
      <div className={styles.connectorContainer}>
        <div className={styles.connectionLine}></div>
        <button className={styles.plusButton} onClick={handleClick}>
          <PlusIcon size={16} />
        </button>
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
