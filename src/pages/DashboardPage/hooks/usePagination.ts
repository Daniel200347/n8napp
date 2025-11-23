import { useState, useMemo } from 'react';

export interface UsePaginationOptions<T> {
  data: T[];
  initialPage?: number;
  initialRowsPerPage?: number;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  paginatedData: T[];
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
}

export const usePagination = <T>({
  data,
  initialPage = 1,
  initialRowsPerPage = 8,
}: UsePaginationOptions<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data.length / rowsPerPage)),
    [data.length, rowsPerPage]
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, rowsPerPage]);

  const handleSetRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return {
    currentPage,
    rowsPerPage,
    totalPages,
    paginatedData,
    setCurrentPage,
    setRowsPerPage: handleSetRowsPerPage,
  };
};

