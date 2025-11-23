import type { TableColumn } from '@/components/ui/DataTable';
import { StatusBadge, Switch, Tooltip } from '@/components/ui';

export const createAutomationColumns = (
  onStatusChange: (rowId: string, isActive: boolean) => void
): TableColumn[] => [
  {
    key: 'name',
    header: 'Название',
    width: '848px',
    className: 'nameCell',
    render: (value: unknown, row: { id: string; [key: string]: unknown }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{value as string}</span>
        {(row as { isDuplicated?: boolean }).isDuplicated && (
          <span
            style={{
              fontSize: '12px',
              color: '#62748E',
              fontStyle: 'italic',
            }}
          >
            (Дублированная)
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'lastRun',
    header: 'Последний запуск',
    width: '250px',
    className: 'lastRunCell',
  },
  {
    key: 'status',
    header: 'Статус',
    width: '250px',
    className: 'statusCell',
    render: (value: unknown) => (
      <StatusBadge status={value as 'enabled' | 'disabled'} />
    ),
  },
  {
    key: 'isActive',
    header: '',
    width: '100px',
    className: 'switchCell',
    render: (value: unknown, row: { id: string; [key: string]: unknown }) => (
      <Tooltip
        content={[
          value
            ? 'Деактивировать автоматизацию'
            : 'Активировать автоматизацию',
        ]}
      >
        <Switch
          checked={Boolean(value)}
          onChange={(checked) => onStatusChange(row.id, checked)}
        />
      </Tooltip>
    ),
  },
];

export const runsColumns: TableColumn[] = [
  {
    key: 'automationName',
    header: 'Название',
    width: '200px',
    className: 'nameCell',
  },
  {
    key: 'startTime',
    header: 'Начало',
    width: '180px',
    className: 'startCell',
  },
  {
    key: 'duration',
    header: 'Выполнение',
    width: '150px',
    className: 'executionCell',
  },
  {
    key: 'status',
    header: 'Статус',
    width: '120px',
    className: 'statusCell',
    render: (value: unknown) => (
      <StatusBadge status={value as 'running' | 'completed' | 'failed' | 'pending'} />
    ),
  },
];

export const apiKeysColumns: TableColumn[] = [
  {
    key: 'name',
    header: 'Название',
    width: '200px',
    className: 'nameCell',
  },
  {
    key: 'service',
    header: 'Сервис',
    width: '150px',
    className: 'keyCell',
  },
  {
    key: 'added',
    header: 'Добавлен',
    width: '140px',
    className: 'createdCell',
  },
  {
    key: 'lastUpdate',
    header: 'Последнее обновление',
    width: '180px',
    className: 'lastUsedCell',
  },
  {
    key: 'status',
    header: 'Статус',
    width: '100px',
    className: 'statusCell',
    render: (value: unknown) => (
      <StatusBadge
        status={value as 'connected' | 'disconnected' | 'requires_setup'}
      />
    ),
  },
];

