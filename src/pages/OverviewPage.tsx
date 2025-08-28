import {useState} from 'react';
import {Sidebar} from '@/components/ui/Sidebar';
import {Button} from '@/components/ui/Button';
import {Checkbox} from '@/components/ui/Checkbox';
import {Switch} from '@/components/ui/Switch';
import {Tabs} from '@/components/ui/Tabs';
import {SearchIcon, FilterIcon, ChevronDownIcon} from '@/components/ui/Icons';
import styles from './OverviewPage.module.css';

// Белая версия иконки плюс для кнопки создания автоматизации
const WhitePlusIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 4.16667V15.8333M4.16667 10H15.8333"
            stroke="#F8FAFC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Иконка стрелки вверх
const ChevronUpIcon = () => (
    <svg
        width="6.67"
        height="6.67"
        viewBox="0 0 6.67 6.67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5 4.17L3.33 2.5L1.67 4.17"
            stroke="#62748E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Иконка стрелки вниз
const ChevronDownSmallIcon = () => (
    <svg
        width="6.67"
        height="6.67"
        viewBox="0 0 6.67 6.67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.67 1.83L3.33 3.5L5 1.83"
            stroke="#62748E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface TableRow {
    id: string;
    name: string;
    steps: string;
    lastUpdate: string;
    status: boolean;
}

const mockData: TableRow[] = [
    {id: '1', name: 'Test', steps: 'QA Engineer', lastUpdate: 'Today at 7:40 PM', status: false},
    {id: '2', name: 'Test', steps: 'Frontend Dev', lastUpdate: 'Today at 7:40 PM', status: true},
    {id: '3', name: 'Test', steps: 'Product Manager', lastUpdate: 'Today at 7:40 PM', status: false},
    {id: '4', name: 'Test', steps: 'Product Manager', lastUpdate: 'Today at 7:40 PM', status: false},
    {id: '5', name: 'Test', steps: 'Product Manager', lastUpdate: 'Today at 7:40 PM', status: false},
    {id: '6', name: 'Test', steps: 'Product Manager', lastUpdate: 'Today at 7:40 PM', status: false},
];

const tabItems = [
    {id: 'automations', label: 'Автоматизации'},
    {id: 'keys', label: 'Ключи'},
    {id: 'runs', label: 'Запуски'},
];

export const OverviewPage = () => {
    const [activeTab, setActiveTab] = useState('automations');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState<TableRow[]>(mockData);

    const handleRowSelect = (rowId: string) => {
        setSelectedRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    const handleSelectAll = () => {
        if (selectedRows.length === tableData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(tableData.map(row => row.id));
        }
    };

    const handleStatusChange = (rowId: string, status: boolean) => {
        setTableData(prevData =>
            prevData.map(row =>
                row.id === rowId ? {...row, status} : row
            )
        );
        console.log(`Row ${rowId} status changed to ${status}`);
    };

    const handleCreateAutomation = () => {
        console.log('Create automation clicked');
    };

    const handleSearch = () => {
        console.log('Search clicked');
    };

    const handleStatusFilter = () => {
        console.log('Status filter clicked');
    };

    const handleConnectionFilter = () => {
        console.log('Connection filter clicked');
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(tableData.length / rowsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleIncreaseRows = () => {
        if (rowsPerPage < 50) {
            setRowsPerPage(rowsPerPage + 1);
            setCurrentPage(1); // Reset to first page when changing rows per page
        }
    };

         const handleDecreaseRows = () => {
         if (rowsPerPage > 1) {
             setRowsPerPage(rowsPerPage - 1);
             setCurrentPage(1); // Reset to first page when changing rows per page
         }
     };

     const totalPages = Math.ceil(tableData.length / rowsPerPage);
     const isPreviousDisabled = currentPage <= 1;
     const isNextDisabled = currentPage >= totalPages;

    return (
        <div className={styles.overviewPageContainer}>
            <Sidebar/>
            <main className={styles.mainContent}>
                <div className={styles.contentContainer}>
                    {/* Header */}
                    <header className={styles.header}>
                        <div className={styles.headerContent}>
                            <h1 className={styles.title}>Обзор</h1>
                            <p className={styles.description}>
                                Все рабочие процессы, учетные данные и выполнения, к которым у вас есть доступ
                            </p>
                        </div>

                        {/* Create Automation Button */}
                        <div className={styles.createButtonGroup}>
                            <Button
                                variant="default"
                                size="lg"
                                leftIcon={<WhitePlusIcon/>}
                                onClick={handleCreateAutomation}
                                className={styles.createButton}
                            >
                                Создать автоматизацию
                            </Button>
                            <Button
                                variant="default"
                                size="icon"
                                onClick={handleCreateAutomation}
                                className={styles.dropdownButton}
                            >
                                <ChevronDownIcon/>
                            </Button>
                        </div>
                    </header>

                    {/* Statistics Cards */}
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

                    {/* Tabs */}
                    <div className={styles.tabsContainer}>
                        <Tabs
                            items={tabItems}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </div>

                    {/* Filters */}
                    <div className={styles.filtersContainer}>
                        <Button
                            variant="outline"
                            size="default"
                            leftIcon={<SearchIcon/>}
                            onClick={handleSearch}
                            className={styles.filterButton}
                        >
                            Поиск
                        </Button>
                        <Button
                            variant="outline"
                            size="default"
                            leftIcon={<FilterIcon/>}
                            onClick={handleStatusFilter}
                            className={styles.filterButton}
                        >
                            Статус
                        </Button>
                        <Button
                            variant="outline"
                            size="default"
                            leftIcon={<FilterIcon/>}
                            onClick={handleConnectionFilter}
                            className={styles.filterButton}
                        >
                            Подключение
                        </Button>
                    </div>

                    {/* Table */}
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th className={styles.checkboxHeader}>
                                    <Checkbox
                                        checked={selectedRows.length === tableData.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className={styles.nameHeader}>Название</th>
                                <th className={styles.stepsHeader}>Шаги</th>
                                <th className={styles.dateHeader}>Последнее обновление</th>
                                <th className={styles.statusHeader}>Статус</th>
                                <th className={styles.actionsHeader}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id} className={styles.tableRow}>
                                    <td className={styles.checkboxCell}>
                                        <Checkbox
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => handleRowSelect(row.id)}
                                        />
                                    </td>
                                    <td className={styles.nameCell}>{row.name}</td>
                                    <td className={styles.stepsCell}>{row.steps}</td>
                                    <td className={styles.dateCell}>{row.lastUpdate}</td>
                                    <td className={styles.statusCell}>
                                        <Switch
                                            checked={row.status}
                                            onChange={(status) => handleStatusChange(row.id, status)}
                                        />
                                    </td>
                                    <td className={styles.actionsCell}>
                                        <button className={styles.actionButton}>
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="2.5"
                                                    y="2.5"
                                                    width="15"
                                                    height="15"
                                                    rx="2"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="3.5 3.5"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className={styles.paginationContainer}>
                        <div className={styles.paginationLeft}>
                            <span className={styles.rowsLabel}>Строк на странице</span>
                            <div className={styles.rowsInputContainer}>
                                <input
                                    type="text"
                                    value={rowsPerPage}
                                    readOnly
                                    className={styles.rowsInput}
                                />
                                <div className={styles.rowsControls}>
                                    <button
                                        className={styles.rowsButton}
                                        onClick={handleIncreaseRows}
                                        disabled={rowsPerPage >= 50}
                                    >
                                        <ChevronUpIcon/>
                                    </button>
                                    <button
                                        className={styles.rowsButton}
                                        onClick={handleDecreaseRows}
                                        disabled={rowsPerPage <= 1}
                                    >
                                        <ChevronDownSmallIcon/>
                                    </button>
                                </div>
                            </div>
                        </div>

                                                 <div className={styles.paginationRight}>
                             <Button
                                 variant={isPreviousDisabled ? "disabled" : "outline"}
                                 size="default"
                                 onClick={handlePreviousPage}
                                 disabled={isPreviousDisabled}
                             >
                                 Предыдущий
                             </Button>
                             <Button
                                 variant={isNextDisabled ? "disabled" : "outline"}
                                 size="default"
                                 onClick={handleNextPage}
                                 disabled={isNextDisabled}
                             >
                                 Следующий
                             </Button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
