import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiKey } from '@/api/mockData';
import { mockApiKeysData } from '@/api/mockData';

interface ApiKeysState {
  items: ApiKey[];
  selectedIds: string[];
  isLoading: boolean;
  error: string | null;
  filters: {
    searchQuery: string;
    statusFilters: string[];
  };
  pagination: {
    currentPage: number;
    rowsPerPage: number;
  };
}

const initialState: ApiKeysState = {
  items: [...mockApiKeysData],
  selectedIds: [],
  isLoading: false,
  error: null,
  filters: {
    searchQuery: '',
    statusFilters: [],
  },
  pagination: {
    currentPage: 1,
    rowsPerPage: 8,
  },
};

const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    loadApiKeys: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadApiKeysSuccess: (state, action: PayloadAction<ApiKey[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    loadApiKeysFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    addApiKey: (state, action: PayloadAction<ApiKey>) => {
      state.items.push(action.payload);
    },

    updateApiKey: (state, action: PayloadAction<Partial<ApiKey> & { id: string }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        Object.assign(item, action.payload);
      }
    },

    deleteApiKey: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
    },

    deleteApiKeys: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(item => !action.payload.includes(item.id));
      state.selectedIds = [];
    },

    selectApiKey: (state, action: PayloadAction<string>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
      } else {
        state.selectedIds.push(action.payload);
      }
    },

    selectAllApiKeys: (state) => {
      if (state.selectedIds.length === state.items.length) {
        state.selectedIds = [];
      } else {
        state.selectedIds = state.items.map(item => item.id);
      }
    },

    clearSelection: (state) => {
      state.selectedIds = [];
    },

    setFilters: (state, action: PayloadAction<{ searchQuery?: string; statusFilters?: string[] }>) => {
      if (action.payload.searchQuery !== undefined) {
        state.filters.searchQuery = action.payload.searchQuery;
        state.pagination.currentPage = 1;
      }
      if (action.payload.statusFilters !== undefined) {
        state.filters.statusFilters = action.payload.statusFilters;
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
  loadApiKeys,
  loadApiKeysSuccess,
  loadApiKeysFailure,
  addApiKey,
  updateApiKey,
  deleteApiKey,
  deleteApiKeys,
  selectApiKey,
  selectAllApiKeys,
  clearSelection,
  setFilters,
  setPagination,
} = apiKeysSlice.actions;

export default apiKeysSlice.reducer;

