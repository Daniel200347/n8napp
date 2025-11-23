import { useState, useMemo } from 'react';

export interface UseFilteringOptions<T> {
  data: T[];
  searchFields?: (keyof T)[];
  filterBy?: (item: T, searchQuery: string, statusFilters: string[]) => boolean;
}

export interface UseFilteringReturn<T> {
  searchQuery: string;
  statusFilters: string[];
  filteredData: T[];
  setSearchQuery: (query: string) => void;
  setStatusFilters: (filters: string[]) => void;
}

const defaultFilterFn = <T extends Record<string, any>>(
  item: T,
  searchQuery: string,
  statusFilters: string[],
  searchFields?: (keyof T)[]
): boolean => {
  const matchesSearch =
    searchQuery === '' ||
    (searchFields || []).some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(searchQuery.toLowerCase());
    });

  const matchesStatus =
    statusFilters.length === 0 ||
    (item.status && statusFilters.includes(item.status));

  return matchesSearch && matchesStatus;
};

export const useFiltering = <T extends Record<string, any>>({
  data,
  searchFields,
  filterBy,
}: UseFilteringOptions<T>): UseFilteringReturn<T> => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (filterBy) {
        return filterBy(item, searchQuery, statusFilters);
      }
      return defaultFilterFn(item, searchQuery, statusFilters, searchFields);
    });
  }, [data, searchQuery, statusFilters, filterBy, searchFields]);

  return {
    searchQuery,
    statusFilters,
    filteredData,
    setSearchQuery,
    setStatusFilters,
  };
};

