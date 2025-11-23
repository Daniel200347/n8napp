import React from 'react';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@/components/ui/Icons';
import { SearchInput, StatusFilter, DateRangePicker, CreateAutomationDropdown } from '@/components/ui';
import styles from '../DashboardPage.module.css';

interface FiltersBarProps {
  activeTab: string;
  searchQuery: string;
  statusFilters: string[];
  selectedDateRange: { startDate: string; endDate: string };
  selectedRowsCount: number;
  selectedApiKeyRowsCount: number;
  selectedRunRowsCount: number;
  onSearch: (query: string) => void;
  onStatusFilterChange: (filters: string[]) => void;
  onDateRangeChange: (range: { startDate: string; endDate: string }) => void;
  onDeleteClick: () => void;
  onDeleteRunsClick?: () => void;
  onCreateApiKey: () => void;
  onCreateAutomation: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  activeTab,
  searchQuery,
  statusFilters,
  selectedDateRange,
  selectedRowsCount,
  selectedApiKeyRowsCount,
  selectedRunRowsCount,
  onSearch,
  onStatusFilterChange,
  onDateRangeChange,
  onDeleteClick,
  onDeleteRunsClick,
  onCreateApiKey,
  onCreateAutomation,
}) => {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersLeft}>
        {activeTab === 'automations' && (
          <>
            <SearchInput
              onSearch={onSearch}
              placeholder="Поиск по названиям автоматизаций"
              className={styles.searchInput}
            />
            <StatusFilter
              onFilterChange={onStatusFilterChange}
              options={[
                { value: 'enabled', label: 'Включен' },
                { value: 'disabled', label: 'Выключен' },
              ]}
              className={styles.statusFilter}
            />
          </>
        )}
        {activeTab === 'runs' && (
          <>
            <SearchInput
              onSearch={onSearch}
              placeholder="Поиск по названиям автоматизаций"
              className={styles.searchInput}
            />
            <StatusFilter
              onFilterChange={onStatusFilterChange}
              options={[
                { value: 'completed', label: 'Успех' },
                { value: 'failed', label: 'Ошибка' },
                { value: 'running', label: 'Выполняется' },
                { value: 'pending', label: 'Ожидает' },
              ]}
              className={styles.statusFilter}
            />
            <DateRangePicker
              value={selectedDateRange}
              onChange={onDateRangeChange}
              className={styles.dateRangePicker}
            />
          </>
        )}
        {activeTab === 'keys' && (
          <>
            <SearchInput
              onSearch={onSearch}
              placeholder="Поиск по названиям и сервисам"
              className={styles.searchInput}
            />
            <StatusFilter
              onFilterChange={onStatusFilterChange}
              options={[
                { value: 'connected', label: 'Подключен' },
                { value: 'disconnected', label: 'Отключен' },
                { value: 'requires_setup', label: 'Требует настройки' },
              ]}
              className={styles.statusFilter}
            />
          </>
        )}
      </div>
      {activeTab === 'automations' && selectedRowsCount > 0 && (
        <div className={styles.filtersRight}>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteClick}
            className={styles.deleteButton}
          >
            Удалить ({selectedRowsCount})
          </Button>
        </div>
      )}
      {activeTab === 'keys' && (
        <div className={styles.filtersRight}>
          {selectedApiKeyRowsCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteClick}
              className={styles.deleteButton}
            >
              Удалить ({selectedApiKeyRowsCount})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<PlusIcon />}
            onClick={onCreateApiKey}
          >
            Добавить ключ
          </Button>
        </div>
      )}
      {activeTab === 'runs' && selectedRunRowsCount > 0 && (
        <div className={styles.filtersRight}>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteRunsClick || onDeleteClick}
            className={styles.deleteButton}
          >
            Удалить ({selectedRunRowsCount})
          </Button>
        </div>
      )}
    </div>
  );
};

