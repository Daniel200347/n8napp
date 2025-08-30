import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from '@/components/ui/Icons';
import styles from './DateRangePicker.module.css';

interface DateRangePickerProps {
  placeholder?: string;
  value?: { startDate: string; endDate: string };
  onChange?: (range: { startDate: string; endDate: string }) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  placeholder = "Выбрать дату",
  value = { startDate: '', endDate: '' },
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(value);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Добавляем дни предыдущего месяца для заполнения первой недели
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Добавляем дни следующего месяца для заполнения последней недели
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    
    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // Если нет начальной даты или есть обе даты, начинаем новый диапазон
      setSelectedRange({ startDate: formattedDate, endDate: '' });
    } else {
      // Если есть начальная дата, устанавливаем конечную
      const startDate = new Date(selectedRange.startDate.split('.').reverse().join('-'));
      const endDate = date;
      
      if (endDate < startDate) {
        // Если конечная дата меньше начальной, меняем местами
        setSelectedRange({ startDate: formattedDate, endDate: selectedRange.startDate });
      } else {
        setSelectedRange({ startDate: selectedRange.startDate, endDate: formattedDate });
      }
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isInRange = (date: Date): boolean => {
    if (!selectedRange.startDate) return false;
    
    const currentDate = date;
    const startDate = new Date(selectedRange.startDate.split('.').reverse().join('-'));
    
    if (!selectedRange.endDate) {
      return currentDate.getTime() === startDate.getTime();
    }
    
    const endDate = new Date(selectedRange.endDate.split('.').reverse().join('-'));
    return currentDate >= startDate && currentDate <= endDate;
  };

  const isRangeStart = (date: Date): boolean => {
    if (!selectedRange.startDate) return false;
    const currentDate = date;
    const startDate = new Date(selectedRange.startDate.split('.').reverse().join('-'));
    return currentDate.getTime() === startDate.getTime();
  };

  const isRangeEnd = (date: Date): boolean => {
    if (!selectedRange.endDate) return false;
    const currentDate = date;
    const endDate = new Date(selectedRange.endDate.split('.').reverse().join('-'));
    return currentDate.getTime() === endDate.getTime();
  };

  const isHoveredInRange = (date: Date): boolean => {
    if (!selectedRange.startDate || !hoveredDate) return false;
    
    const currentDate = date;
    const startDate = new Date(selectedRange.startDate.split('.').reverse().join('-'));
    const hoverDate = hoveredDate;
    
    if (hoverDate < startDate) {
      return currentDate >= hoverDate && currentDate <= startDate;
    } else {
      return currentDate >= startDate && currentDate <= hoverDate;
    }
  };

  const handleApplyRange = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      onChange?.(selectedRange);
      setIsOpen(false);
    }
  };

  const handleClearRange = () => {
    setSelectedRange({ startDate: '', endDate: '' });
    onChange?.({ startDate: '', endDate: '' });
  };

  const getDisplayText = (): string => {
    if (selectedRange.startDate && selectedRange.endDate) {
      return `${selectedRange.startDate} - ${selectedRange.endDate}`;
    } else if (selectedRange.startDate) {
      return `${selectedRange.startDate} - Выберите конечную дату`;
    }
    return placeholder;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`${styles.dateRangePickerContainer} ${className || ''}`} ref={datePickerRef}>
      <button
        className={styles.dateRangePickerButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <CalendarIcon />
        <span className={styles.dateRangePickerText}>
          {getDisplayText()}
        </span>
      </button>

      {isOpen && (
        <div className={styles.calendarDropdown}>
          <div className={styles.calendarHeader}>
            <button
              className={styles.navigationButton}
              onClick={handlePreviousMonth}
              type="button"
            >
              ‹
            </button>
            <span className={styles.currentMonth}>
              {currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </span>
            <button
              className={styles.navigationButton}
              onClick={handleNextMonth}
              type="button"
            >
              ›
            </button>
          </div>

          <div className={styles.weekDays}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
              <div key={day} className={styles.weekDay}>{day}</div>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {days.map((date, index) => (
              <button
                key={index}
                className={`${styles.calendarDay} ${
                  !isCurrentMonth(date) ? styles.otherMonth : ''
                } ${isToday(date) ? styles.today : ''} ${
                  isInRange(date) ? styles.inRange : ''
                } ${isRangeStart(date) ? styles.rangeStart : ''} ${
                  isRangeEnd(date) ? styles.rangeEnd : ''
                } ${isHoveredInRange(date) ? styles.hoveredInRange : ''}`}
                onClick={() => handleDateSelect(date)}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
                type="button"
              >
                {date.getDate()}
              </button>
            ))}
          </div>

          <div className={styles.calendarFooter}>
            <button
              className={styles.clearButton}
              onClick={handleClearRange}
              type="button"
            >
              Очистить
            </button>
            <button
              className={`${styles.applyButton} ${
                !selectedRange.startDate || !selectedRange.endDate ? styles.disabled : ''
              }`}
              onClick={handleApplyRange}
              disabled={!selectedRange.startDate || !selectedRange.endDate}
              type="button"
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
