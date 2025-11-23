import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RunRow } from '@/api/mockData';
import { mockRunsData } from '@/api/mockData';

interface RunsState {
  items: RunRow[];
  selectedIds: string[];
  isLoading: boolean;
  error: string | null;
  filters: {
    searchQuery: string;
    statusFilters: string[];
    dateRange: {
      startDate: string;
      endDate: string;
    };
  };
  pagination: {
    currentPage: number;
    rowsPerPage: number;
  };
}

const initialState: RunsState = {
  items: [...mockRunsData],
  selectedIds: [],
  isLoading: false,
  error: null,
  filters: {
    searchQuery: '',
    statusFilters: [],
    dateRange: {
      startDate: '',
      endDate: '',
    },
  },
  pagination: {
    currentPage: 1,
    rowsPerPage: 8,
  },
};

const runsSlice = createSlice({
  name: 'runs',
  initialState,
  reducers: {
    loadRuns: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadRunsSuccess: (state, action: PayloadAction<RunRow[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    loadRunsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    addRun: (state, action: PayloadAction<RunRow>) => {
      state.items.unshift(action.payload);
    },

    deleteRun: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
    },

    deleteRuns: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(item => !action.payload.includes(item.id));
      state.selectedIds = [];
    },

    selectRun: (state, action: PayloadAction<string>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
      } else {
        state.selectedIds.push(action.payload);
      }
    },

    selectAllRuns: (state) => {
      if (state.selectedIds.length === state.items.length) {
        state.selectedIds = [];
      } else {
        state.selectedIds = state.items.map(item => item.id);
      }
    },

    clearSelection: (state) => {
      state.selectedIds = [];
    },

    setFilters: (state, action: PayloadAction<{
      searchQuery?: string;
      statusFilters?: string[];
      dateRange?: { startDate: string; endDate: string };
    }>) => {
      if (action.payload.searchQuery !== undefined) {
        state.filters.searchQuery = action.payload.searchQuery;
        state.pagination.currentPage = 1;
      }
      if (action.payload.statusFilters !== undefined) {
        state.filters.statusFilters = action.payload.statusFilters;
        state.pagination.currentPage = 1;
      }
      if (action.payload.dateRange !== undefined) {
        state.filters.dateRange = action.payload.dateRange;
        state.pagination.currentPage = 1;
      }
    },

    setPagination: (state, action: PayloadAction<{ currentPage?: number; rowsPerPage?: number }>) => {
      if (action.payload.currentPage !== undefined) {
        state.pagination.currentPage = action.payload.currentPage;
      }
      if (action.payload.rowsPerPage !== undefined) {
        state.pagination.rowsPerPage = action.payload.rowsPerPage;
        state.pagination.currentPage = 1;
      }
    },
  },
});

export const {
  loadRuns,
  loadRunsSuccess,
  loadRunsFailure,
  addRun,
  deleteRun,
  deleteRuns,
  selectRun,
  selectAllRuns,
  clearSelection,
  setFilters,
  setPagination,
} = runsSlice.actions;

export default runsSlice.reducer;

