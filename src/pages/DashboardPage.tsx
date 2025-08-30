import {useState} from 'react';
import {Sidebar} from '@/components/ui/Sidebar';
import {Button} from '@/components/ui/Button';
import {Tabs} from '@/components/ui/Tabs';
import {PlusIcon} from '@/components/ui/Icons';
import {DataTable, StatusBadge, DateRangePicker, SideMenu, AddKeyForm, EmptyState, SearchInput, StatusFilter, Pagination, RenameModal, DeleteModal, CreateAutomationDropdown, Switch, Tooltip} from '@/components/ui';
import type { TableColumn } from '@/components/ui/DataTable';
import styles from './DashboardPage.module.css';



interface Automation {
    id: string;
    name: string;
    lastRun: string;
    status: 'enabled' | 'disabled';
    isActive: boolean;
    [key: string]: unknown;
}

interface RunRow {
    id: string;
    automationName: string;
    status: 'running' | 'completed' | 'failed' | 'pending';
    startTime: string;
    duration: string;
    steps: number;
    completedSteps: number;
    trigger: string;
    [key: string]: unknown;
}

interface ApiKey {
    id: string;
    name: string;
    service: string;
    added: string;
    lastUpdate: string;
    status: 'connected' | 'disconnected' | 'requires_setup';
    [key: string]: unknown;
}

const mockAutomationsData: Automation[] = [
    {id: '1', name: 'Обработка заявок с формы сайта', lastRun: 'Сегодня, в 10:12', status: 'disabled', isActive: false},
    {id: '2', name: 'Синхронизация лидов с CRM', lastRun: 'Сегодня, в 08:47', status: 'enabled', isActive: true},
    {id: '3', name: 'Уведомления в Slack о новых клиентах', lastRun: 'Вчера, в 22:15', status: 'disabled', isActive: false},
    {id: '4', name: 'Автоматический отчёт о продажах', lastRun: '21 августа, в 14:03', status: 'disabled', isActive: false},
    {id: '5', name: 'Ежедневная выгрузка данных в Google Sheets', lastRun: '19 августа, в 09:27', status: 'disabled', isActive: false},
    {id: '6', name: 'Автоматический отчёт о продажах', lastRun: '19 августа, в 06:11', status: 'disabled', isActive: false},
    {id: '7', name: 'Синхронизация лидов с CRM', lastRun: '16 августа, в 14:51', status: 'disabled', isActive: false},
    {id: '8', name: 'Проверка ошибок в интеграциях', lastRun: '15 августа, в 02:32', status: 'disabled', isActive: false},
];

const mockRunsData: RunRow[] = [
    {id: '1', automationName: 'Обработка заявок с формы сайта', status: 'failed', startTime: 'Сегодня, в 21:06:46', duration: '24ms', steps: 5, completedSteps: 3, trigger: 'По расписанию'},
    {id: '2', automationName: 'Синхронизация лидов с CRM', status: 'completed', startTime: 'Сегодня, в 08:47:02', duration: '16ms', steps: 8, completedSteps: 8, trigger: 'Вручную'},
    {id: '3', automationName: 'Уведомления в Slack о новых клиентах', status: 'failed', startTime: 'Вчера, в 22:15:32', duration: '32ms', steps: 3, completedSteps: 1, trigger: 'По расписанию'},
    {id: '4', automationName: 'Автоматический отчёт о продажах', status: 'failed', startTime: '21 августа, в 14:03:44', duration: '24ms', steps: 6, completedSteps: 0, trigger: 'Вручную'},
    {id: '5', automationName: 'Ежедневная выгрузка данных в Google Sheets', status: 'failed', startTime: '19 августа, в 09:27:12', duration: '18ms', steps: 4, completedSteps: 4, trigger: 'По расписанию'},
    {id: '6', automationName: 'Автоматический отчёт о продажах', status: 'failed', startTime: '19 августа, в 06:11:31', duration: '28ms', steps: 7, completedSteps: 5, trigger: 'Вручную'},
    {id: '7', automationName: 'Синхронизация лидов с CRM', status: 'failed', startTime: '16 августа, в 14:51:06', duration: '12ms', steps: 3, completedSteps: 1, trigger: 'По расписанию'},
    {id: '8', automationName: 'Проверка ошибок в интеграциях', status: 'failed', startTime: '15 августа, в 02:32:08', duration: '240ms', steps: 6, completedSteps: 0, trigger: 'Вручную'},
    {id: '9', automationName: 'Резервное копирование базы данных', status: 'completed', startTime: '14 августа, в 23:45:12', duration: '45ms', steps: 4, completedSteps: 4, trigger: 'По расписанию'},
    {id: '10', automationName: 'Отправка еженедельного отчёта', status: 'failed', startTime: '14 августа, в 09:15:30', duration: '18ms', steps: 6, completedSteps: 2, trigger: 'Вручную'},
    {id: '11', automationName: 'Синхронизация с внешним API', status: 'failed', startTime: '13 августа, в 16:22:45', duration: '33ms', steps: 5, completedSteps: 1, trigger: 'По расписанию'},
    {id: '12', automationName: 'Обновление статусов заказов', status: 'completed', startTime: '13 августа, в 11:08:20', duration: '22ms', steps: 3, completedSteps: 3, trigger: 'Вручную'},
];

const mockApiKeysData: ApiKey[] = [
    {id: '1', name: 'Аккаунт YandexGPT', service: 'YandexGPT', added: 'Сегодня, в 10:12', lastUpdate: 'Сегодня, в 10:12', status: 'disconnected'},
    {id: '2', name: 'Аккаунт Mail.ru', service: 'Mail.ru API', added: 'Сегодня, в 08:47', lastUpdate: 'Сегодня, в 08:47', status: 'requires_setup'},
    {id: '3', name: 'Аккаунт GigaChat', service: 'GigaChat', added: '15 августа, в 02:32', lastUpdate: '15 августа, в 02:32', status: 'connected'},
];

const tabItems = [
    {id: 'automations', label: 'Автоматизации'},
    {id: 'keys', label: 'Ключи'},
    {id: 'runs', label: 'Запуски'},
];



// Конфигурация колонок для ключей
const apiKeysColumns: TableColumn[] = [
    {
        key: 'name',
        header: 'Название',
        width: '200px',
        className: 'nameCell'
    },
    {
        key: 'service',
        header: 'Сервис',
        width: '150px',
        className: 'keyCell'
    },
    {
        key: 'added',
        header: 'Добавлен',
        width: '140px',
        className: 'createdCell'
    },
    {
        key: 'lastUpdate',
        header: 'Последнее обновление',
        width: '180px',
        className: 'lastUsedCell'
    },
    {
        key: 'status',
        header: 'Статус',
        width: '100px',
        className: 'statusCell',
        render: (value: unknown) => <StatusBadge status={value as 'connected' | 'disconnected' | 'requires_setup'} />
    }
];

// Конфигурация колонок для запусков
const runsColumns: TableColumn[] = [
    {
        key: 'automationName',
        header: 'Название',
        width: '200px',
        className: 'nameCell'
    },
    {
        key: 'startTime',
        header: 'Начало',
        width: '180px',
        className: 'startCell'
    },
    {
        key: 'duration',
        header: 'Выполнение',
        width: '150px',
        className: 'executionCell'
    },
    {
        key: 'status',
        header: 'Статус',
        width: '120px',
        className: 'statusCell',
        render: (value: unknown) => <StatusBadge status={value as 'running' | 'completed' | 'failed' | 'pending'} />
    }
];

export const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('automations');
    
    const handleAutomationStatusChange = (rowId: string, isActive: boolean) => {
        setAutomationsData(prevData =>
            prevData.map(row =>
                row.id === rowId ? {
                    ...row,
                    isActive,
                    status: isActive ? 'enabled' : 'disabled'
                } : row
            )
        );
    };

    // Конфигурация колонок для автоматизаций
    const automationColumns: TableColumn[] = [
        {
            key: 'name',
            header: 'Название',
            width: '848px',
            className: 'nameCell'
        },
        {
            key: 'lastRun',
            header: 'Последний запуск',
            width: '250px',
            className: 'lastRunCell'
        },
        {
            key: 'status',
            header: 'Статус',
            width: '250px',
            className: 'statusCell',
            render: (value: unknown) => <StatusBadge status={value as 'enabled' | 'disabled'} />
        },
        {
            key: 'isActive',
            header: '',
            width: '100px',
            className: 'switchCell',
            render: (value: unknown, row: { id: string; [key: string]: unknown }) => (
                <Tooltip content={[value ? 'Деактивировать автоматизацию' : 'Активировать автоматизацию']}>
                    <Switch
                        checked={Boolean(value)}
                        onChange={(checked) => handleAutomationStatusChange(row.id, checked)}
                    />
                </Tooltip>
            )
        }
    ];

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectedRunRows, setSelectedRunRows] = useState<string[]>([]);
    const [selectedApiKeyRows, setSelectedApiKeyRows] = useState<string[]>([]);
    const [automationsData, setAutomationsData] = useState<Automation[]>(mockAutomationsData);
    const [runsData, setRunsData] = useState<RunRow[]>(mockRunsData);
    const [apiKeysData, setApiKeysData] = useState<ApiKey[]>(mockApiKeysData);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentApiKeysPage, setCurrentApiKeysPage] = useState(1);
    const [currentAutomationsPage, setCurrentAutomationsPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [apiKeysRowsPerPage, setApiKeysRowsPerPage] = useState(8);
    const [automationsRowsPerPage, setAutomationsRowsPerPage] = useState(8);
    const [hasAutomationsData, setHasAutomationsData] = useState(true);
    const [hasRunsData, setHasRunsData] = useState(true);
    const [hasApiKeysData, setHasApiKeysData] = useState(true);
    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: '', endDate: '' });
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    
    // Новые состояния для поиска и фильтрации
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilters, setStatusFilters] = useState<string[]>([]);
    
    // Состояния для поиска и фильтрации ключей
    const [apiKeysSearchQuery, setApiKeysSearchQuery] = useState('');
    const [apiKeysStatusFilters, setApiKeysStatusFilters] = useState<string[]>([]);
    
    // Состояния для поиска и фильтрации запусков
    const [runsSearchQuery, setRunsSearchQuery] = useState('');
    const [runsStatusFilters, setRunsStatusFilters] = useState<string[]>([]);
    
    // Состояния для модалок
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAutomationForRename, setSelectedAutomationForRename] = useState<Automation | null>(null);
    const [selectedApiKeyForRename, setSelectedApiKeyForRename] = useState<ApiKey | null>(null);
    const [selectedKeyForDetails, setSelectedKeyForDetails] = useState<ApiKey | undefined>(undefined);

    const handleAutomationRowSelect = (rowId: string) => {
        setSelectedRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    const handleSelectAllAutomations = () => {
        if (selectedRows.length === automationsData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(automationsData.map(row => row.id));
        }
    };



    // Обработчики для поиска и фильтрации
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentAutomationsPage(1); // Сброс на первую страницу при поиске
    };

    const handleStatusFilterChange = (filters: string[]) => {
        setStatusFilters(filters);
        setCurrentAutomationsPage(1); // Сброс на первую страницу при изменении фильтров
    };

    // Обработчики для поиска и фильтрации ключей
    const handleApiKeysSearch = (query: string) => {
        setApiKeysSearchQuery(query);
        setCurrentApiKeysPage(1);
    };

    const handleApiKeysStatusFilterChange = (filters: string[]) => {
        setApiKeysStatusFilters(filters);
        setCurrentApiKeysPage(1);
    };

    // Обработчики для поиска и фильтрации запусков
    const handleRunsSearch = (query: string) => {
        setRunsSearchQuery(query);
        setCurrentPage(1);
    };

    const handleRunsStatusFilterChange = (filters: string[]) => {
        setRunsStatusFilters(filters);
        setCurrentPage(1);
    };

    // Обработчики для модалок
    const handleRename = (rowId: string) => {
        const automation = automationsData.find(a => a.id === rowId);
        if (automation) {
            setSelectedAutomationForRename(automation);
            setIsRenameModalOpen(true);
        }
    };

    const handleSaveRename = (newName: string) => {
        if (selectedAutomationForRename) {
            setAutomationsData(prev => prev.map(row => 
                row.id === selectedAutomationForRename.id ? { ...row, name: newName } : row
            ));
        }
        if (selectedApiKeyForRename) {
            setApiKeysData(prev => prev.map(row => 
                row.id === selectedApiKeyForRename.id ? { ...row, name: newName } : row
            ));
        }
    };



    const handleDeleteSingle = (rowId: string) => {
        setAutomationsData(prev => prev.filter(row => row.id !== rowId));
    };

    const handleConfirmDelete = () => {
        setAutomationsData(prev => prev.filter(row => !selectedRows.includes(row.id)));
        setSelectedRows([]);
        setIsDeleteModalOpen(false);
    };



    const handleCreateAutomation = () => {
        // Логика создания автоматизации с нуля
        console.log('Создание автоматизации с нуля');
    };

    const handleRunRowSelect = (rowId: string) => {
        setSelectedRunRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    const handleSelectAllRuns = () => {
        if (selectedRunRows.length === runsData.length) {
            setSelectedRunRows([]);
        } else {
            setSelectedRunRows(runsData.map(row => row.id));
        }
    };



    // Фильтрация данных автоматизаций
    const filteredAutomationsData = automationsData.filter(automation => {
        const matchesSearch = searchQuery === '' || 
            automation.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilters.length === 0 || 
            statusFilters.includes(automation.status);
        
        return matchesSearch && matchesStatus;
    });

    // Пагинация для автоматизаций
    const totalAutomationsPages = Math.max(1, Math.ceil(filteredAutomationsData.length / automationsRowsPerPage));
    const automationsStartIndex = (currentAutomationsPage - 1) * automationsRowsPerPage;
    const automationsEndIndex = automationsStartIndex + automationsRowsPerPage;
    const currentAutomationsData = filteredAutomationsData.slice(automationsStartIndex, automationsEndIndex);

    // Фильтрация данных запусков
    const filteredRunsData = runsData.filter(run => {
        const matchesSearch = runsSearchQuery === '' || 
            run.automationName.toLowerCase().includes(runsSearchQuery.toLowerCase());
        
        const matchesStatus = runsStatusFilters.length === 0 || 
            runsStatusFilters.includes(run.status);
        
        return matchesSearch && matchesStatus;
    });

    // Пагинация для запусков
    const totalPages = Math.max(1, Math.ceil(filteredRunsData.length / rowsPerPage));
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRunsData = filteredRunsData.slice(startIndex, endIndex);

    // Фильтрация данных ключей
    const filteredApiKeysData = apiKeysData.filter(key => {
        const matchesSearch = apiKeysSearchQuery === '' || 
            key.name.toLowerCase().includes(apiKeysSearchQuery.toLowerCase()) ||
            key.service.toLowerCase().includes(apiKeysSearchQuery.toLowerCase());
        
        const matchesStatus = apiKeysStatusFilters.length === 0 || 
            apiKeysStatusFilters.includes(key.status);
        
        return matchesSearch && matchesStatus;
    });

    // Пагинация для ключей
    const totalApiKeysPages = Math.max(1, Math.ceil(filteredApiKeysData.length / apiKeysRowsPerPage));
    const apiKeysStartIndex = (currentApiKeysPage - 1) * apiKeysRowsPerPage;
    const apiKeysEndIndex = apiKeysStartIndex + apiKeysRowsPerPage;
    const currentApiKeysData = filteredApiKeysData.slice(apiKeysStartIndex, apiKeysEndIndex);

    const handleAutomationsRowsPerPageChange = (newRowsPerPage: number) => {
        setAutomationsRowsPerPage(newRowsPerPage);
        setCurrentAutomationsPage(1);
    };

    const handleRunsRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1);
    };

    const handleApiKeysRowsPerPageChange = (newRowsPerPage: number) => {
        setApiKeysRowsPerPage(newRowsPerPage);
        setCurrentApiKeysPage(1);
    };



    const handleDateRangeChange = (range: { startDate: string; endDate: string }) => {
        setSelectedDateRange(range);
    };

    const handleRepeatCurrentWorkflow = (rowId: string) => {
        // Логика повторного запуска текущего воркфлоу
        console.log('Повторный запуск текущего воркфлоу для запуска:', rowId);
        // Здесь можно добавить реальную логику повторного запуска
    };

    const handleRepeatOriginalWorkflow = (rowId: string) => {
        // Логика повторного запуска оригинального воркфлоу
        console.log('Повторный запуск оригинального воркфлоу для запуска:', rowId);
        // Здесь можно добавить реальную логику повторного запуска
    };

    const handleDeleteRun = (rowId: string) => {
        console.log('Удаление запуска:', rowId);
        setRunsData(prevData => prevData.filter(row => row.id !== rowId));
    };

    // API Keys handlers
    const handleApiKeyRowSelect = (rowId: string) => {
        setSelectedApiKeyRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    const handleSelectAllApiKeys = () => {
        const currentPageKeys = currentApiKeysData.map(row => row.id);
        const allCurrentPageSelected = currentPageKeys.every(id => selectedApiKeyRows.includes(id));

        if (allCurrentPageSelected) {
            setSelectedApiKeyRows(prev => prev.filter(id => !currentPageKeys.includes(id)));
        } else {
            setSelectedApiKeyRows(prev => [...new Set([...prev, ...currentPageKeys])]);
        }
    };

    const handleRenameApiKey = (rowId: string) => {
        const apiKey = apiKeysData.find(k => k.id === rowId);
        if (apiKey) {
            setSelectedApiKeyForRename(apiKey);
            setIsRenameModalOpen(true);
        }
    };

    const handleDeleteApiKey = (rowId: string) => {
        setApiKeysData(prevData => prevData.filter(row => row.id !== rowId));
        // Закрываем боковое меню после удаления
        handleCloseSideMenu();
    };

    const handleDetailsApiKey = (rowId: string) => {
        const apiKey = apiKeysData.find(k => k.id === rowId);
        if (apiKey) {
            setSelectedKeyForDetails(apiKey);
            setIsSideMenuOpen(true);
        }
    };

    const handleCreateApiKey = () => {
        setIsSideMenuOpen(true);
    };

    const handleCloseSideMenu = () => {
        setIsSideMenuOpen(false);
        setSelectedKeyForDetails(undefined);
    };

    const handleAddKey = (newKey: ApiKey) => {
        setApiKeysData(prev => [...prev, newKey]);
    };

    return (
        <div className={styles.dashboardPageContainer}>
            <Sidebar/>
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
                                onCreateFromScratch={handleCreateAutomation}
                                onUseTemplate={() => {
                                    // Логика использования шаблона
                                    console.log('Использование шаблона для создания автоматизации');
                                }}
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
                                 ? (hasAutomationsData ? 'Показать пустое состояние' : 'Показать данные')
                                 : activeTab === 'runs'
                                 ? (hasRunsData ? 'Показать пустое состояние' : 'Показать данные')
                                 : activeTab === 'keys'
                                 ? (hasApiKeysData ? 'Показать пустое состояние' : 'Показать данные')
                                 : 'Показать пустое состояние'
                             }
                         </button>
                    </header>

                    <div className={styles.statisticsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <h3 className={styles.statTitle}>Запущенные автоматизации</h3>
                                <p className={styles.statSubtitle}>За последние 7 дней</p>
                            </div>
                            <div className={styles.statValue}>4</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <h3 className={styles.statTitle}>Неудачные запуски</h3>
                                <p className={styles.statSubtitle}>За последние 7 дней</p>
                            </div>
                            <div className={styles.statValue}>12</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <h3 className={styles.statTitle}>Процент ошибок</h3>
                                <p className={styles.statSubtitle}>За последние 7 дней</p>
                            </div>
                            <div className={styles.statValue}>24,5%</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <h3 className={styles.statTitle}>Сэкономлено времени</h3>
                                <p className={styles.statSubtitle}>За последние 7 дней</p>
                            </div>
                            <div className={styles.statValue}>~15s</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <h3 className={styles.statTitle}>Среднее время выполнения</h3>
                                <p className={styles.statSubtitle}>За последние 7 дней</p>
                            </div>
                            <div className={styles.statValue}>2s</div>
                        </div>
                    </div>

                    <div className={styles.tabsContainer}>
                        <Tabs
                            items={tabItems}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </div>

                                         <div className={styles.filtersContainer}>
                         <div className={styles.filtersLeft}>
                             {activeTab === 'automations' && (
                                 <>
                                     <SearchInput
                                         onSearch={handleSearch}
                                         placeholder="Поиск по названиям автоматизаций"
                                         className={styles.searchInput}
                                     />
                                     <StatusFilter
                                         onFilterChange={handleStatusFilterChange}
                                         options={[
                                             { value: 'enabled', label: 'Включен' },
                                             { value: 'disabled', label: 'Выключен' }
                                         ]}
                                         className={styles.statusFilter}
                                     />
                                 </>
                             )}
                             {activeTab === 'runs' && (
                                 <>
                                     <SearchInput
                                         onSearch={handleRunsSearch}
                                         placeholder="Поиск по названиям автоматизаций"
                                         className={styles.searchInput}
                                     />
                                     <StatusFilter
                                         onFilterChange={handleRunsStatusFilterChange}
                                         options={[
                                             { value: 'completed', label: 'Успех' },
                                             { value: 'failed', label: 'Ошибка' },
                                             { value: 'running', label: 'Выполняется' },
                                             { value: 'pending', label: 'Ожидает' }
                                         ]}
                                         className={styles.statusFilter}
                                     />
                                     <DateRangePicker
                                         value={selectedDateRange}
                                         onChange={handleDateRangeChange}
                                         className={styles.dateRangePicker}
                                     />
                                 </>
                             )}
                             {activeTab === 'keys' && (
                                 <>
                                     <SearchInput
                                         onSearch={handleApiKeysSearch}
                                         placeholder="Поиск по названиям и сервисам"
                                         className={styles.searchInput}
                                     />
                                     <StatusFilter
                                         onFilterChange={handleApiKeysStatusFilterChange}
                                         options={[
                                             { value: 'connected', label: 'Подключен' },
                                             { value: 'disconnected', label: 'Отключен' },
                                             { value: 'requires_setup', label: 'Требует настройки' }
                                         ]}
                                         className={styles.statusFilter}
                                     />
                                 </>
                             )}
                         </div>
                         {activeTab === 'automations' && selectedRows.length > 0 && (
                             <div className={styles.filtersRight}>
                                 <Button
                                     variant="destructive"
                                     size="sm"
                                     onClick={() => setIsDeleteModalOpen(true)}
                                     className={styles.deleteButton}
                                 >
                                     Удалить ({selectedRows.length})
                                 </Button>
                             </div>
                         )}
                         {activeTab === 'keys' && (
                             <div className={styles.filtersRight}>
                                 {selectedApiKeyRows.length > 0 && (
                                     <Button
                                         variant="destructive"
                                         size="sm"
                                         onClick={() => setIsDeleteModalOpen(true)}
                                         className={styles.deleteButton}
                                     >
                                         Удалить ({selectedApiKeyRows.length})
                                     </Button>
                                 )}
                                 <Button
                                     variant="outline"
                                     size="sm"
                                     leftIcon={<PlusIcon/>}
                                     onClick={handleCreateApiKey}
                                 >
                                     Добавить ключ
                                 </Button>
                             </div>
                         )}
                         {activeTab === 'runs' && selectedRunRows.length > 0 && (
                             <div className={styles.filtersRight}>
                                 <Button
                                     variant="destructive"
                                     size="sm"
                                     onClick={() => {
                                         setRunsData(prevData =>
                                             prevData.filter(row => !selectedRunRows.includes(row.id))
                                         );
                                         setSelectedRunRows([]);
                                     }}
                                     className={styles.deleteButton}
                                 >
                                     Удалить ({selectedRunRows.length})
                                 </Button>
                             </div>
                         )}
                     </div>

                    {activeTab === 'automations' && (
                        <>
                            <DataTable
                                data={hasAutomationsData ? currentAutomationsData : []}
                                columns={automationColumns}
                                selectedRows={selectedRows}
                                onRowSelect={handleAutomationRowSelect}
                                onSelectAll={handleSelectAllAutomations}

                                onDelete={handleDeleteSingle}
                                onRename={handleRename}
                                emptyState={<EmptyState
                                  title="Автоматизации не найдены"
                                  description="В таблице пока нет автоматизаций или ничего не найдено по вашему запросу. Создайте новую или измените условия поиска."
                                />}
                            />



                            <Pagination
                                currentPage={currentAutomationsPage}
                                totalPages={totalAutomationsPages}
                                rowsPerPage={automationsRowsPerPage}

                                onPageChange={setCurrentAutomationsPage}
                                onRowsPerPageChange={handleAutomationsRowsPerPageChange}
                                className={styles.pagination}
                            />
                        </>
                    )}

                    {activeTab === 'keys' && (
                        <>
                            <DataTable
                                data={hasApiKeysData ? currentApiKeysData : []}
                                columns={apiKeysColumns}
                                selectedRows={selectedApiKeyRows}
                                onRowSelect={handleApiKeyRowSelect}
                                onSelectAll={handleSelectAllApiKeys}
                                onRename={handleRenameApiKey}
                                onDelete={handleDeleteApiKey}
                                onDetails={handleDetailsApiKey}
                                onRowClick={handleDetailsApiKey}
                                emptyState={<EmptyState
                                  title="Ключи не найдены"
                                  description="В таблице пока нет ключей или ничего не найдено по вашему запросу. Добавьте новый или измените условия поиска."
                                />}
                            />



                            <Pagination
                                currentPage={currentApiKeysPage}
                                totalPages={totalApiKeysPages}
                                rowsPerPage={apiKeysRowsPerPage}
                                onPageChange={setCurrentApiKeysPage}
                                onRowsPerPageChange={handleApiKeysRowsPerPageChange}
                                className={styles.pagination}
                            />
                        </>
                    )}

                    {activeTab === 'runs' && (
                        <>
                            <DataTable
                                data={hasRunsData ? currentRunsData : []}
                                columns={runsColumns}
                                selectedRows={selectedRunRows}
                                onRowSelect={handleRunRowSelect}
                                onSelectAll={handleSelectAllRuns}
                                onRepeatCurrent={handleRepeatCurrentWorkflow}
                                onRepeatOriginal={handleRepeatOriginalWorkflow}
                                onDelete={handleDeleteRun}
                                emptyState={<EmptyState
                                  title="Запуски не найдены"
                                  description="В таблице пока нет запусков или ничего не найдено по вашему запросу. Запустите автоматизацию или измените условия поиска."
                                />}
                            />

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                rowsPerPage={rowsPerPage}
                                onPageChange={setCurrentPage}
                                onRowsPerPageChange={handleRunsRowsPerPageChange}
                                className={styles.pagination}
                            />
                        </>
                                         )}
                 </div>
             </main>

             <SideMenu
                 isOpen={isSideMenuOpen}
                 onClose={handleCloseSideMenu}
             >
                                 <AddKeyForm
                  onClose={handleCloseSideMenu}
                  onAddKey={handleAddKey}
                  onDeleteKey={handleDeleteApiKey}
                  selectedKey={selectedKeyForDetails}
                />
             </SideMenu>

             {/* Модалки для автоматизаций */}
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
                 count={activeTab === 'automations' ? selectedRows.length : selectedApiKeyRows.length}
                 onClose={() => setIsDeleteModalOpen(false)}
                 onConfirm={() => {
                     if (activeTab === 'automations') {
                         handleConfirmDelete();
                     } else {
                         setApiKeysData(prevData => 
                             prevData.filter(row => !selectedApiKeyRows.includes(row.id))
                         );
                         setSelectedApiKeyRows([]);
                         setIsDeleteModalOpen(false);
                     }
                 }}
             />
         </div>
     );
 };
