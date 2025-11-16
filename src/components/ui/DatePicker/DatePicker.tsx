import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from '@/components/ui/Icons';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  placeholder?: string;
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = "Выбрать дату",
  value = "",
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setIsOpen(false);
    onChange?.(formattedDate);
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

  const isSelected = (date: Date): boolean => {
    return selectedDate === formatDate(date);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`${styles.datePickerContainer} ${className || ''}`} ref={datePickerRef}>
      <button
        className={styles.datePickerButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <CalendarIcon />
        <span className={styles.datePickerText}>
          {selectedDate || placeholder}
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
                  isSelected(date) ? styles.selected : ''
                }`}
                onClick={() => handleDateSelect(date)}
                type="button"
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
