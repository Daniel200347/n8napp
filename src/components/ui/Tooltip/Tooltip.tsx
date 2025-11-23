import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        
        if (left < 8) left = 8;
        if (left + tooltipRect.width > viewportWidth - 8) {
          left = viewportWidth - tooltipRect.width - 8;
        }
        if (top < 8) {
          top = triggerRect.bottom + 8;
        }
        break;
        
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        
        if (left < 8) left = 8;
        if (left + tooltipRect.width > viewportWidth - 8) {
          left = viewportWidth - tooltipRect.width - 8;
        }
        if (top + tooltipRect.height > viewportHeight - 8) {
          top = triggerRect.top - tooltipRect.height - 8;
        }
        break;
        
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        
        if (top < 8) top = 8;
        if (top + tooltipRect.height > viewportHeight - 8) {
          top = viewportHeight - tooltipRect.height - 8;
        }
        if (left < 8) {
          left = triggerRect.right + 8;
        }
        break;
        
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
        
        if (top < 8) top = 8;
        if (top + tooltipRect.height > viewportHeight - 8) {
          top = viewportHeight - tooltipRect.height - 8;
        }
        if (left + tooltipRect.width > viewportWidth - 8) {
          left = triggerRect.left - tooltipRect.width - 8;
        }
        break;
    }
    
    setTooltipPosition({ top, left });
  };

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(calculatePosition, 10);
      return () => clearTimeout(timer);
    }
  }, [isVisible, position]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} ${styles[position]}`}
          style={{
            position: 'fixed',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            zIndex: 9999
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};