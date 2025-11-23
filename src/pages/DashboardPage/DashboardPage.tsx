import { useState, useEffect, useMemo, useCallback } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { Tabs } from '@/components/ui/Tabs';
import {
  DataTable,
  EmptyState,
  Pagination,
  RenameModal,
  DeleteModal,
  CreateAutomationDropdown,
  SideMenu,
  AddKeyForm,
} from '@/components/ui';
import type { Automation, RunRow, ApiKey } from './types';
import { mockAutomationsData, mockRunsData, mockApiKeysData } from './mockData';
import { useDuplicatedAutomationsSync, loadDuplicatedAutomations } from './utils/duplicatedAutomations';
import { usePagination } from './hooks/usePagination';
import { useFiltering } from './hooks/useFiltering';
import { createAutomationColumns, runsColumns, apiKeysColumns } from './config/tableColumns';
import { StatisticsCards } from './components/StatisticsCards';
import { FiltersBar } from './components/FiltersBar';
import styles from './DashboardPage.module.css';

const tabItems = [
  { id: 'automations', label: 'Автоматизации' },
  { id: 'keys', label: 'Ключи' },
  { id: 'runs', label: 'Запуски' },
];

const statistics = [
  { title: 'Запущенные автоматизации', subtitle: 'За последние 7 дней', value: '4' },
  { title: 'Неудачные запуски', subtitle: 'За последние 7 дней', value: '12' },
  { title: 'Процент ошибок', subtitle: 'За последние 7 дней', value: '24,5%' },
  { title: 'Сэкономлено времени', subtitle: 'За последние 7 дней', value: '~15s' },
  { title: 'Среднее время выполнения', subtitle: 'За последние 7 дней', value: '2s' },
];

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('automations');
  const [automationsData, setAutomationsData] = useState<Automation[]>(() => {
    const duplicated = loadDuplicatedAutomations();
    return [...mockAutomationsData, ...duplicated];
  });
  const [runsData, setRunsData] = useState<RunRow[]>(mockRunsData);
  const [apiKeysData, setApiKeysData] = useState<ApiKey[]>(mockApiKeysData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedRunRows, setSelectedRunRows] = useState<string[]>([]);
  const [selectedApiKeyRows, setSelectedApiKeyRows] = useState<string[]>([]);
  const [hasAutomationsData, setHasAutomationsData] = useState(true);
  const [hasRunsData, setHasRunsData] = useState(true);
  const [hasApiKeysData, setHasApiKeysData] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: '', endDate: '' });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAutomationForRename, setSelectedAutomationForRename] = useState<Automation | null>(null);
  const [selectedApiKeyForRename, setSelectedApiKeyForRename] = useState<ApiKey | null>(null);
  const [selectedKeyForDetails, setSelectedKeyForDetails] = useState<ApiKey | undefined>(undefined);

  const { handleStorageChange } = useDuplicatedAutomationsSync((duplicated) => {
    setAutomationsData([...mockAutomationsData, ...duplicated]);
  });

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    const handleFocus = () => handleStorageChange();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [handleStorageChange]);

  const automationsFiltering = useFiltering<Automation>({
    data: automationsData,
    searchFields: ['name'],
    filterBy: (item, searchQuery, statusFilters) => {
      const matchesSearch =
        searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(item.status);
      return matchesSearch && matchesStatus;
    },
  });

  const automationsPagination = usePagination({
    data: automationsFiltering.filteredData,
    initialRowsPerPage: 8,
  });

  useEffect(() => {
    automationsPagination.setCurrentPage(1);
  }, [automationsFiltering.searchQuery, automationsFiltering.statusFilters]);

  const runsFiltering = useFiltering<RunRow>({
    data: runsData,
    searchFields: ['automationName'],
    filterBy: (item, searchQuery, statusFilters) => {
      const matchesSearch =
        searchQuery === '' ||
        item.automationName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(item.status);
      return matchesSearch && matchesStatus;
    },
  });

  const runsPagination = usePagination({
    data: runsFiltering.filteredData,
    initialRowsPerPage: 8,
  });

  useEffect(() => {
    runsPagination.setCurrentPage(1);
  }, [runsFiltering.searchQuery, runsFiltering.statusFilters]);

  const apiKeysFiltering = useFiltering<ApiKey>({
    data: apiKeysData,
    searchFields: ['name', 'service'],
    filterBy: (item, searchQuery, statusFilters) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.service.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(item.status);
      return matchesSearch && matchesStatus;
    },
  });

  const apiKeysPagination = usePagination({
    data: apiKeysFiltering.filteredData,
    initialRowsPerPage: 8,
  });

  useEffect(() => {
    apiKeysPagination.setCurrentPage(1);
  }, [apiKeysFiltering.searchQuery, apiKeysFiltering.statusFilters]);

  const automationColumns = useMemo(
    () =>
      createAutomationColumns((rowId: string, isActive: boolean) => {
        setAutomationsData((prevData) =>
          prevData.map((row) =>
            row.id === rowId
              ? {
                  ...row,
                  isActive,
                  status: isActive ? 'enabled' : 'disabled',
                }
              : row
          )
        );
      }),
    []
  );

  const handleAutomationRowSelect = useCallback((rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  }, []);

  const handleSelectAllAutomations = useCallback(() => {
    setSelectedRows((prev) => {
      if (prev.length === automationsFiltering.filteredData.length) {
        return [];
      }
      return automationsFiltering.filteredData.map((row) => row.id);
    });
  }, [automationsFiltering.filteredData]);

  const handleDeleteSingle = useCallback((rowId: string) => {
    setAutomationsData((prev) => prev.filter((row) => row.id !== rowId));
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (activeTab === 'automations') {
      setAutomationsData((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
      setSelectedRows([]);
    } else if (activeTab === 'keys') {
      setApiKeysData((prev) => prev.filter((row) => !selectedApiKeyRows.includes(row.id)));
      setSelectedApiKeyRows([]);
    }
    setIsDeleteModalOpen(false);
  }, [activeTab, selectedRows, selectedApiKeyRows]);

  const handleRename = useCallback((rowId: string) => {
    const automation = automationsData.find((a) => a.id === rowId);
    if (automation) {
      setSelectedAutomationForRename(automation);
      setIsRenameModalOpen(true);
    }
  }, [automationsData]);

  const handleSaveRename = useCallback((newName: string) => {
    if (selectedAutomationForRename) {
      setAutomationsData((prev) =>
        prev.map((row) =>
          row.id === selectedAutomationForRename.id ? { ...row, name: newName } : row
        )
      );
    }
    if (selectedApiKeyForRename) {
      setApiKeysData((prev) =>
        prev.map((row) =>
          row.id === selectedApiKeyForRename.id ? { ...row, name: newName } : row
        )
      );
    }
    setIsRenameModalOpen(false);
    setSelectedAutomationForRename(null);
    setSelectedApiKeyForRename(null);
  }, [selectedAutomationForRename, selectedApiKeyForRename]);

  const handleRunRowSelect = useCallback((rowId: string) => {
    setSelectedRunRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  }, []);

  const handleSelectAllRuns = useCallback(() => {
    setSelectedRunRows((prev) => {
      if (prev.length === runsFiltering.filteredData.length) {
        return [];
      }
      return runsFiltering.filteredData.map((row) => row.id);
    });
  }, [runsFiltering.filteredData]);

  const handleDeleteRun = useCallback((rowId: string) => {
    setRunsData((prev) => prev.filter((row) => row.id !== rowId));
  }, []);

  const handleDeleteRuns = useCallback(() => {
    setRunsData((prev) => prev.filter((row) => !selectedRunRows.includes(row.id)));
    setSelectedRunRows([]);
  }, [selectedRunRows]);

  const handleApiKeyRowSelect = useCallback((rowId: string) => {
    setSelectedApiKeyRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  }, []);

  const handleSelectAllApiKeys = useCallback(() => {
    const currentPageKeys = apiKeysPagination.paginatedData.map((row) => row.id);
    setSelectedApiKeyRows((prev) => {
      const allCurrentPageSelected = currentPageKeys.every((id) => prev.includes(id));
      if (allCurrentPageSelected) {
        return prev.filter((id) => !currentPageKeys.includes(id));
      }
      return [...new Set([...prev, ...currentPageKeys])];
    });
  }, [apiKeysPagination.paginatedData]);

  const handleRenameApiKey = useCallback((rowId: string) => {
    const apiKey = apiKeysData.find((k) => k.id === rowId);
    if (apiKey) {
      setSelectedApiKeyForRename(apiKey);
      setIsRenameModalOpen(true);
    }
  }, [apiKeysData]);

  const handleDeleteApiKey = useCallback((rowId: string) => {
    setApiKeysData((prev) => prev.filter((row) => row.id !== rowId));
    setIsSideMenuOpen(false);
    setSelectedKeyForDetails(undefined);
  }, []);

  const handleDetailsApiKey = useCallback((rowId: string) => {
    const apiKey = apiKeysData.find((k) => k.id === rowId);
    if (apiKey) {
      setSelectedKeyForDetails(apiKey);
      setIsSideMenuOpen(true);
    }
  }, [apiKeysData]);

  const handleCreateApiKey = useCallback(() => {
    setIsSideMenuOpen(true);
  }, []);

  const handleCloseSideMenu = useCallback(() => {
    setIsSideMenuOpen(false);
    setSelectedKeyForDetails(undefined);
  }, []);

  const handleAddKey = useCallback((newKey: ApiKey) => {
    setApiKeysData((prev) => [...prev, newKey]);
  }, []);

  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const filteredData = useMemo(() => {
    if (activeTab === 'automations') return automationsPagination.paginatedData;
    if (activeTab === 'runs') return runsPagination.paginatedData;
    return apiKeysPagination.paginatedData;
  }, [activeTab, automationsPagination.paginatedData, runsPagination.paginatedData, apiKeysPagination.paginatedData]);

  const searchHandler = useMemo(() => {
    if (activeTab === 'automations') return automationsFiltering.setSearchQuery;
    if (activeTab === 'runs') return runsFiltering.setSearchQuery;
    return apiKeysFiltering.setSearchQuery;
  }, [activeTab, automationsFiltering.setSearchQuery, runsFiltering.setSearchQuery, apiKeysFiltering.setSearchQuery]);

  const statusFilterHandler = useMemo(() => {
    if (activeTab === 'automations') return automationsFiltering.setStatusFilters;
    if (activeTab === 'runs') return runsFiltering.setStatusFilters;
    return apiKeysFiltering.setStatusFilters;
  }, [activeTab, automationsFiltering.setStatusFilters, runsFiltering.setStatusFilters, apiKeysFiltering.setStatusFilters]);

  const searchQuery = useMemo(() => {
    if (activeTab === 'automations') return automationsFiltering.searchQuery;
    if (activeTab === 'runs') return runsFiltering.searchQuery;
    return apiKeysFiltering.searchQuery;
  }, [activeTab, automationsFiltering.searchQuery, runsFiltering.searchQuery, apiKeysFiltering.searchQuery]);

  const statusFilters = useMemo(() => {
    if (activeTab === 'automations') return automationsFiltering.statusFilters;
    if (activeTab === 'runs') return runsFiltering.statusFilters;
    return apiKeysFiltering.statusFilters;
  }, [activeTab, automationsFiltering.statusFilters, runsFiltering.statusFilters, apiKeysFiltering.statusFilters]);

  const currentPagination = useMemo(() => {
    if (activeTab === 'automations') return automationsPagination;
    if (activeTab === 'runs') return runsPagination;
    return apiKeysPagination;
  }, [activeTab, automationsPagination, runsPagination, apiKeysPagination]);

  const emptyState = useMemo(() => {
    if (activeTab === 'automations') {
      return (
        <EmptyState
          title="Автоматизации не найдены"
          description="В таблице пока нет автоматизаций или ничего не найдено по вашему запросу. Создайте новую или измените условия поиска."
        />
      );
    }
    if (activeTab === 'keys') {
      return (
        <EmptyState
          title="Ключи не найдены"
          description="В таблице пока нет ключей или ничего не найдено по вашему запросу. Добавьте новый или измените условия поиска."
        />
      );
    }
    return (
      <EmptyState
        title="Запуски не найдены"
        description="В таблице пока нет запусков или ничего не найдено по вашему запросу. Запустите автоматизацию или измените условия поиска."
      />
    );
  }, [activeTab]);

  const columns = useMemo(() => {
    if (activeTab === 'automations') return automationColumns;
    if (activeTab === 'runs') return runsColumns;
    return apiKeysColumns;
  }, [activeTab, automationColumns, runsColumns, apiKeysColumns]);

  const tableHandlers = useMemo(() => {
    if (activeTab === 'automations') {
      return {
        onRowSelect: handleAutomationRowSelect,
        onSelectAll: handleSelectAllAutomations,
        onDelete: handleDeleteSingle,
        onRename: handleRename,
      };
    }
    if (activeTab === 'runs') {
      return {
        onRowSelect: handleRunRowSelect,
        onSelectAll: handleSelectAllRuns,
        onDelete: handleDeleteRun,
        onRepeatCurrent: () => {},
        onRepeatOriginal: () => {},
      };
    }
    return {
      onRowSelect: handleApiKeyRowSelect,
      onSelectAll: handleSelectAllApiKeys,
      onRename: handleRenameApiKey,
      onDelete: handleDeleteApiKey,
      onDetails: handleDetailsApiKey,
      onRowClick: handleDetailsApiKey,
    };
  }, [activeTab, handleAutomationRowSelect, handleSelectAllAutomations, handleDeleteSingle, handleRename, handleRunRowSelect, handleSelectAllRuns, handleDeleteRun, handleApiKeyRowSelect, handleSelectAllApiKeys, handleRenameApiKey, handleDeleteApiKey, handleDetailsApiKey]);

  const currentData = useMemo(() => {
    if (activeTab === 'automations') return hasAutomationsData ? filteredData : [];
    if (activeTab === 'runs') return hasRunsData ? filteredData : [];
    return hasApiKeysData ? filteredData : [];
  }, [activeTab, hasAutomationsData, hasRunsData, hasApiKeysData, filteredData]);

  const currentSelectedRows = useMemo(() => {
    if (activeTab === 'automations') return selectedRows;
    if (activeTab === 'runs') return selectedRunRows;
    return selectedApiKeyRows;
  }, [activeTab, selectedRows, selectedRunRows, selectedApiKeyRows]);

  return (
    <div className={styles.dashboardPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Дашборд</h1>
              <p className={styles.description}>
                Все рабочие процессы, учетные данные и выполнения, к которым у вас есть доступ
              </p>
            </div>

            <div className={styles.createButtonGroup}>
              <CreateAutomationDropdown
                onCreateFromScratch={() => {}}
                onUseTemplate={() => {}}
                className={styles.createButton}
              />
            </div>

            <button
              className={styles.toggleButton}
              onClick={() => {
                if (activeTab === 'automations') {
                  setHasAutomationsData(!hasAutomationsData);
                } else if (activeTab === 'runs') {
                  setHasRunsData(!hasRunsData);
                } else if (activeTab === 'keys') {
                  setHasApiKeysData(!hasApiKeysData);
                }
              }}
            >
              {activeTab === 'automations'
                ? hasAutomationsData
                  ? 'Показать пустое состояние'
                  : 'Показать данные'
                : activeTab === 'runs'
                ? hasRunsData
                  ? 'Показать пустое состояние'
                  : 'Показать данные'
                : hasApiKeysData
                ? 'Показать пустое состояние'
                : 'Показать данные'}
            </button>
          </header>

          <StatisticsCards stats={statistics} />

          <div className={styles.tabsContainer}>
            <Tabs items={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <FiltersBar
            activeTab={activeTab}
            searchQuery={searchQuery}
            statusFilters={statusFilters}
            selectedDateRange={selectedDateRange}
            selectedRowsCount={selectedRows.length}
            selectedApiKeyRowsCount={selectedApiKeyRows.length}
            selectedRunRowsCount={selectedRunRows.length}
            onSearch={searchHandler}
            onStatusFilterChange={statusFilterHandler}
            onDateRangeChange={setSelectedDateRange}
            onDeleteClick={handleDeleteClick}
            onDeleteRunsClick={handleDeleteRuns}
            onCreateApiKey={handleCreateApiKey}
            onCreateAutomation={() => {}}
          />

          <DataTable
            data={currentData}
            columns={columns}
            selectedRows={currentSelectedRows}
            emptyState={emptyState}
            {...tableHandlers}
          />

          <Pagination
            currentPage={currentPagination.currentPage}
            totalPages={currentPagination.totalPages}
            rowsPerPage={currentPagination.rowsPerPage}
            onPageChange={currentPagination.setCurrentPage}
            onRowsPerPageChange={currentPagination.setRowsPerPage}
            className={styles.pagination}
          />
        </div>
      </main>

      <SideMenu isOpen={isSideMenuOpen} onClose={handleCloseSideMenu}>
        <AddKeyForm
          onClose={handleCloseSideMenu}
          onAddKey={handleAddKey}
          onDeleteKey={handleDeleteApiKey}
          selectedKey={selectedKeyForDetails}
        />
      </SideMenu>

      <RenameModal
        isOpen={isRenameModalOpen}
        currentName={selectedAutomationForRename?.name || selectedApiKeyForRename?.name || ''}
        onClose={() => {
          setIsRenameModalOpen(false);
          setSelectedAutomationForRename(null);
          setSelectedApiKeyForRename(null);
        }}
        onSave={handleSaveRename}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        count={
          activeTab === 'automations' ? selectedRows.length : selectedApiKeyRows.length
        }
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

