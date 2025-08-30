import React from 'react';
import { Checkbox } from '../Checkbox';
import { ActionsMenu } from '../ActionsMenu';
import styles from './DataTable.module.css';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  className?: string;
  render?: (value: unknown, row: { id: string; [key: string]: unknown }) => React.ReactNode;
}

export interface DataTableProps {
  data: Array<{ id: string; [key: string]: unknown }>;
  columns: TableColumn[];
  selectedRows: string[];
  onRowSelect: (rowId: string) => void;
  onSelectAll: () => void;
  onDelete?: (rowId: string) => void;
  onRename?: (rowId: string) => void;
  onDetails?: (rowId: string) => void;
  onRepeatCurrent?: (rowId: string) => void;
  onRepeatOriginal?: (rowId: string) => void;
  onRowClick?: (rowId: string) => void;
  emptyState?: React.ReactNode;
  showCheckboxes?: boolean;
  showActions?: boolean;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onDelete,
  onRename,
  onDetails,
  onRepeatCurrent,
  onRepeatOriginal,
  onRowClick,
  emptyState,
  showCheckboxes = true,
  showActions = true,
  className
}) => {
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  const handleRowClick = (rowId: string, event: React.MouseEvent) => {
    // Не открываем подробнее если клик был на ActionsMenu или чекбоксе
    if ((event.target as HTMLElement).closest('[data-actions-menu]') || 
        (event.target as HTMLElement).closest('[data-checkbox="true"]')) {
      return;
    }
    
    if (onRowClick) {
      onRowClick(rowId);
    }
  };

  if (data.length === 0 && emptyState) {
    return (
      <div className={`${styles.tableContainer} ${className || ''}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              {showCheckboxes && (
                <th className={styles.checkboxHeader}>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={onSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`${column.className || ''}`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {showActions && <th className={styles.actionsHeader}></th>}
            </tr>
          </thead>
          <tbody>
            <tr className={styles.emptyRow}>
              <td 
                colSpan={showCheckboxes ? columns.length + 2 : columns.length + 1} 
                className={styles.emptyCell}
              >
                {emptyState}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={`${styles.tableContainer} ${className || ''}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {showCheckboxes && (
              <th className={styles.checkboxHeader}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={onSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th 
                key={column.key}
                className={`${column.className || ''}`}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
            {showActions && <th className={styles.actionsHeader}></th>}
          </tr>
        </thead>
        <tbody>
                     {data.map((row) => (
             <tr 
               key={row.id} 
               className={styles.tableRow}
               onClick={(e) => handleRowClick(row.id, e)}
               style={{ cursor: onRowClick ? 'pointer' : 'default' }}
             >
              {showCheckboxes && (
                <td className={styles.checkboxCell}>
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => onRowSelect(row.id)}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} className={column.className}>
                  {column.render ? column.render(row[column.key], row) : String(row[column.key] || '')}
                </td>
              ))}
                             {showActions && (
                 <td className={styles.actionsCell}>
                   <div data-actions-menu>
                                           <ActionsMenu
                        onDelete={onDelete ? () => onDelete(row.id) : undefined}
                        onRename={onRename ? () => onRename(row.id) : undefined}
                        onDetails={onDetails ? () => onDetails(row.id) : undefined}
                        onRepeatCurrent={onRepeatCurrent ? () => onRepeatCurrent(row.id) : undefined}
                        onRepeatOriginal={onRepeatOriginal ? () => onRepeatOriginal(row.id) : undefined}
                        status={String(row.status || '')}
                      />
                   </div>
                 </td>
               )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
