import React, { useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  children: React.ReactNode;
  content: string[];
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event: React.MouseEvent) => {
    // Находим ближайшую карточку (родительский элемент с классом templateCard)
    const cardElement = event.currentTarget.closest('.templateCard') as HTMLElement;
    if (cardElement) {
      const cardRect = cardElement.getBoundingClientRect();
      // Находим контейнер иконок внутри карточки
      const iconContainer = event.currentTarget.closest('.iconContainer') as HTMLElement;
      if (iconContainer) {
        const iconRect = iconContainer.getBoundingClientRect();
        setTooltipPosition({
          x: cardRect.left + 16, // отступ от левого края карточки
          y: iconRect.top + iconRect.height + 4 // позиция под иконками внутри карточки
        });
      } else {
        setTooltipPosition({
          x: cardRect.left + 16,
          y: cardRect.top + 60 // примерная позиция под иконками
        });
      }
    } else {
      // Fallback если карточка не найдена
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 8
      });
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div 
          className={styles.tooltip}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          {content.map((item, index) => (
            <div key={index} className={styles.tooltipItem}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
