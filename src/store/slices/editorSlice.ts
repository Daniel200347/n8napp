import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Node, Edge } from 'reactflow';
import type { VersionData } from '@/components/Editor/types/version';

interface EditorState {
  nodes: Node[];
  edges: Edge[];
  isPanMode: boolean;
  isViewMode: boolean;
  viewingVersion: VersionData | null;
  originalNodes: Node[];
  originalEdges: Edge[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EditorState = {
  nodes: [],
  edges: [],
  isPanMode: false,
  isViewMode: false,
  viewingVersion: null,
  originalNodes: [],
  originalEdges: [],
  isLoading: false,
  error: null,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },

    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },

    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },

    updateNode: (state, action: PayloadAction<{ id: string; data: Partial<Node['data']> }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node) {
        node.data = { ...node.data, ...action.payload.data };
      }
    },

    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(n => n.id !== action.payload);
      state.edges = state.edges.filter(
        e => e.source !== action.payload && e.target !== action.payload
      );
    },

    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
    },

    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter(e => e.id !== action.payload);
    },

    setPanMode: (state, action: PayloadAction<boolean>) => {
      state.isPanMode = action.payload;
    },

    setViewMode: (state, action: PayloadAction<boolean>) => {
      state.isViewMode = action.payload;
    },

    setViewingVersion: (state, action: PayloadAction<VersionData | null>) => {
      state.viewingVersion = action.payload;
      if (action.payload) {
        if (state.originalNodes.length === 0) {
          state.originalNodes = [...state.nodes];
          state.originalEdges = [...state.edges];
        }
        state.nodes = action.payload.nodes;
        state.edges = action.payload.edges;
        state.isViewMode = true;
      } else {
        if (state.originalNodes.length > 0) {
          state.nodes = state.originalNodes;
          state.edges = state.originalEdges;
          state.originalNodes = [];
          state.originalEdges = [];
        }
        state.isViewMode = false;
      }
    },

    resetEditor: (state) => {
      state.nodes = [];
      state.edges = [];
      state.isPanMode = false;
      state.isViewMode = false;
      state.viewingVersion = null;
      state.originalNodes = [];
      state.originalEdges = [];
    },

    loadWorkflow: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadWorkflowSuccess: (state, action: PayloadAction<{ nodes: Node[]; edges: Edge[] }>) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
      state.isLoading = false;
    },
    loadWorkflowFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    saveWorkflow: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    saveWorkflowSuccess: (state) => {
      state.isLoading = false;
    },
    saveWorkflowFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  updateNode,
  removeNode,
  addEdge,
  removeEdge,
  setPanMode,
  setViewMode,
  setViewingVersion,
  resetEditor,
  loadWorkflow,
  loadWorkflowSuccess,
  loadWorkflowFailure,
  saveWorkflow,
  saveWorkflowSuccess,
  saveWorkflowFailure,
} = editorSlice.actions;

export default editorSlice.reducer;

