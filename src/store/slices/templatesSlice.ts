import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Template } from '@/api/mockData';
import { mockTemplatesData } from '@/api/mockData';

interface TemplatesState {
  items: Template[];
  selectedTemplate: Template | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    searchQuery: string;
    categoryFilters: string[];
  };
}

const initialState: TemplatesState = {
  items: mockTemplatesData.map(template => ({
    ...template,
    icons: [],
  })) as Template[],
  selectedTemplate: null,
  isLoading: false,
  error: null,
  filters: {
    searchQuery: '',
    categoryFilters: [],
  },
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    loadTemplates: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadTemplatesSuccess: (state, action: PayloadAction<Template[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    loadTemplatesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    selectTemplate: (state, action: PayloadAction<Template | null>) => {
      state.selectedTemplate = action.payload;
    },

    setFilters: (state, action: PayloadAction<{
      searchQuery?: string;
      categoryFilters?: string[];
    }>) => {
      if (action.payload.searchQuery !== undefined) {
        state.filters.searchQuery = action.payload.searchQuery;
      }
      if (action.payload.categoryFilters !== undefined) {
        state.filters.categoryFilters = action.payload.categoryFilters;
      }
    },
  },
});

export const {
  loadTemplates,
  loadTemplatesSuccess,
  loadTemplatesFailure,
  selectTemplate,
  setFilters,
} = templatesSlice.actions;

export default templatesSlice.reducer;

