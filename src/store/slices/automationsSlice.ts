import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Automation } from '@/api/mockData';
import { mockAutomationsData } from '@/api/mockData';

interface AutomationsState {
  items: Automation[];
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

const initialState: AutomationsState = {
  items: [...mockAutomationsData],
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

const automationsSlice = createSlice({
  name: 'automations',
  initialState,
  reducers: {
    loadAutomations: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadAutomationsSuccess: (state, action: PayloadAction<Automation[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    loadAutomationsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    addAutomation: (state, action: PayloadAction<Automation>) => {
      state.items.push(action.payload);
    },

    updateAutomation: (state, action: PayloadAction<Partial<Automation> & { id: string }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        Object.assign(item, action.payload);
      }
    },

    deleteAutomation: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
    },

    deleteAutomations: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(item => !action.payload.includes(item.id));
      state.selectedIds = [];
    },

    toggleAutomationStatus: (state, action: PayloadAction<{ id: string; isActive: boolean }>) => {
      const automation = state.items.find(item => item.id === action.payload.id);
      if (automation) {
        automation.isActive = action.payload.isActive;
        automation.status = action.payload.isActive ? 'enabled' : 'disabled';
      }
    },

    selectAutomation: (state, action: PayloadAction<string>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
      } else {
        state.selectedIds.push(action.payload);
      }
    },

    selectAllAutomations: (state) => {
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

    loadDuplicatedAutomations: (state) => {
      try {
        const duplicated = JSON.parse(localStorage.getItem('duplicatedAutomations') || '[]');
        const duplicatedAutomations: Automation[] = duplicated.map((item: any) => ({
          id: item.id,
          name: item.name,
          lastRun: item.lastRun || 'Никогда',
          status: item.status || 'disabled',
          isActive: item.isActive || false,
          isDuplicated: true
        }));
        const existingIds = new Set(state.items.map(item => item.id));
        const newItems = duplicatedAutomations.filter(item => !existingIds.has(item.id));
        state.items = [...state.items, ...newItems];
      } catch (e) {
      }
    },
  },
});

export const {
  loadAutomations,
  loadAutomationsSuccess,
  loadAutomationsFailure,
  addAutomation,
  updateAutomation,
  deleteAutomation,
  deleteAutomations,
  toggleAutomationStatus,
  selectAutomation,
  selectAllAutomations,
  clearSelection,
  setFilters,
  setPagination,
  loadDuplicatedAutomations,
} = automationsSlice.actions;

export default automationsSlice.reducer;

