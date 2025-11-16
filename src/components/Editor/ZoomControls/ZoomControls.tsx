import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon, ArrowIcon, HandIcon } from '../../ui/Icons';
import { Tooltip } from '../../ui/Tooltip';
import styles from './ZoomControls.module.css';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  getZoom: () => number;
  onTogglePanMode?: () => void;
  isPanMode?: boolean;
  isSpacePressed?: boolean;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onZoomReset,
  getZoom,
  onTogglePanMode,
  isPanMode = false,
  isSpacePressed = false
}) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentZoom = getZoom();
      if (Math.abs(currentZoom - zoom) > 0.01) {
        setZoom(currentZoom);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [getZoom, zoom]);

  useEffect(() => {
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

  return (
    <div className={styles.controlsContainer}>
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
      
      <div className={styles.modeControls}>
        <Tooltip 
          content={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isSpacePressed ? "Рука" : isPanMode ? "Рука" : "Стрелка"}
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
                Space
              </div>
            </div>
          }
          position="top"
        >
          <button 
            className={`${styles.modeButton} ${(isPanMode || isSpacePressed) ? styles.active : ''}`}
            onClick={onTogglePanMode}
          >
            {(isPanMode || isSpacePressed) ? (
              <HandIcon className={styles.modeIcon} />
            ) : (
              <ArrowIcon className={styles.modeIcon} />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
