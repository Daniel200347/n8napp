import React from 'react';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { timeRanges } from '../config/constants';
import styles from '../StatisticsPage.module.css';

interface TimeRangeSelectorProps {
  selectedTimeRange: string;
  isDropdownOpen: boolean;
  onToggle: () => void;
  onSelect: (rangeId: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedTimeRange,
  isDropdownOpen,
  onToggle,
  onSelect,
  dropdownRef,
}) => {
  const getSelectedTimeRangeLabel = () => {
    return timeRanges.find((range) => range.id === selectedTimeRange)?.label || 'Последние 30 дней';
  };

  return (
    <div className={styles.timeRangeSelector} ref={dropdownRef}>
      <div className={styles.timeRangeInput} onClick={onToggle}>
        <span className={styles.timeRangeText}>{getSelectedTimeRangeLabel()}</span>
        <ChevronDownIcon
          className={`${styles.timeRangeIcon} ${isDropdownOpen ? styles.timeRangeIconRotated : ''}`}
        />
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {timeRanges.map((range) => (
            <div
              key={range.id}
              className={`${styles.menuItem} ${
                selectedTimeRange === range.id ? styles.menuItemActive : ''
              }`}
              onClick={() => onSelect(range.id)}
            >
              <span className={styles.menuItemText}>{range.label}</span>
              {selectedTimeRange === range.id && <div className={styles.checkIcon}>✓</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

