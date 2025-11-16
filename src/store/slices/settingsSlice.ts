import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '@/api/mockData';
import { mockUserProfile } from '@/api/mockData';

interface SettingsState {
  profile: UserProfile;
  isFormModified: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  profile: { ...mockUserProfile },
  isFormModified: false,
  isLoading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadProfile: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    loadProfileFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...action.payload };
      state.isFormModified = true;
    },

    saveProfile: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    saveProfileSuccess: (state) => {
      state.isFormModified = false;
      state.isLoading = false;
    },
    saveProfileFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    changePassword: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    changePasswordSuccess: (state) => {
      state.isLoading = false;
    },
    changePasswordFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    resetFormModified: (state) => {
      state.isFormModified = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadProfile,
  loadProfileSuccess,
  loadProfileFailure,
  updateProfile,
  saveProfile,
  saveProfileSuccess,
  saveProfileFailure,
  changePassword,
  changePasswordSuccess,
  changePasswordFailure,
  resetFormModified,
  clearError,
} = settingsSlice.actions;

export default settingsSlice.reducer;

