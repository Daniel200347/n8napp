import { configureStore } from '@reduxjs/toolkit';
import automationsReducer from './slices/automationsSlice';
import runsReducer from './slices/runsSlice';
import apiKeysReducer from './slices/apiKeysSlice';
import editorReducer from './slices/editorSlice';
import authReducer from './slices/authSlice';
import templatesReducer from './slices/templatesSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    automations: automationsReducer,
    runs: runsReducer,
    apiKeys: apiKeysReducer,
    editor: editorReducer,
    auth: authReducer,
    templates: templatesReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['editor/setNodes', 'editor/setEdges'],
        ignoredActionPaths: ['payload.nodes', 'payload.edges', 'payload.serviceIcon'],
        ignoredPaths: ['editor.nodes', 'editor.edges'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

