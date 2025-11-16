import React from 'react';
import { useReactFlow } from 'reactflow';
import { PlusIcon, MinusIcon } from '../../ui/Icons';
import { Tooltip } from '../../ui/Tooltip';
import { ExecuteButton } from '../ExecuteButton';
import { AIAssistantButton } from '../AIAssistantButton';
import styles from './BottomControls.module.css';

interface BottomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onExecuteScenario?: () => void;
  isExecuteDisabled?: boolean;
  isExecuteLoading?: boolean;
  onAIAssistant?: () => void;
  isViewMode?: boolean;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onExecuteScenario,
  isExecuteDisabled = false,
  isExecuteLoading = false,
  onAIAssistant,
  isViewMode = false
}) => {
  const { getZoom } = useReactFlow();
  const [zoom, setZoom] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentZoom = getZoom();
      if (Math.abs(currentZoom - zoom) > 0.01) {
        setZoom(currentZoom);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [getZoom, zoom]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.contentEditable === 'true'
      );

      if (isInputFocused) return;

      switch (event.key) {
        case '-':
        case '_':
          event.preventDefault();
          onZoomOut();
          break;
          
        case '=':
        case '+':
          event.preventDefault();
          onZoomIn();
          break;
          
        case '0':
          event.preventDefault();
          onZoomReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onZoomIn, onZoomOut, onZoomReset]);

  const handleExecuteScenario = () => {
    if (onExecuteScenario) {
      onExecuteScenario();
    }
  };

  const handleAIAssistant = () => {
    if (onAIAssistant) {
      onAIAssistant();
    }
  };

  return (
    <div className={styles.bottomControls}>
      <div className={styles.leftSection}>
        <div className={styles.zoomControls}>
          <Tooltip content={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Отдалить
              <div style={{
                background: '#155DFC',
                color: '#ffffff',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: '600',
                minWidth: '16px',
                textAlign: 'center'
              }}>
                -
              </div>
            </div>
          } position="top">
            <button className={styles.zoomButton} onClick={onZoomOut}>
              <MinusIcon className={styles.zoomIcon} />
            </button>
          </Tooltip>
          
          <Tooltip content={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Масштаб {Math.round(zoom * 100)}%
              <div style={{
                background: '#155DFC',
                color: '#ffffff',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: '600',
                minWidth: '16px',
                textAlign: 'center'
              }}>
                0
              </div>
            </div>
          } position="top">
            <span className={styles.zoomPercentage}>{Math.round(zoom * 100)}%</span>
          </Tooltip>
          
          <Tooltip content={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Приблизить
              <div style={{
                background: '#155DFC',
                color: '#ffffff',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: '600',
                minWidth: '16px',
                textAlign: 'center'
              }}>
                +
              </div>
            </div>
          } position="top">
            <button className={styles.zoomButton} onClick={onZoomIn}>
              <PlusIcon className={styles.zoomIcon} />
            </button>
          </Tooltip>
        </div>
      </div>

      {!isViewMode && (
        <div className={styles.centerSection}>
          <ExecuteButton 
            onClick={handleExecuteScenario}
            disabled={isExecuteDisabled}
            isLoading={isExecuteLoading}
          />
        </div>
      )}

      {!isViewMode && (
        <div className={styles.rightSection}>
          <AIAssistantButton 
            onClick={handleAIAssistant}
          />
        </div>
      )}
    </div>
  );
};
