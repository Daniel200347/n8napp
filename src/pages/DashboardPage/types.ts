export interface Automation {
  id: string;
  name: string;
  lastRun: string;
  status: 'enabled' | 'disabled';
  isActive: boolean;
  isDuplicated?: boolean;
  [key: string]: unknown;
}

export interface RunRow {
  id: string;
  automationName: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  startTime: string;
  duration: string;
  steps: number;
  completedSteps: number;
  trigger: string;
  [key: string]: unknown;
}

export interface ApiKey {
  id: string;
  name: string;
  service: string;
  added: string;
  lastUpdate: string;
  status: 'connected' | 'disconnected' | 'requires_setup';
  [key: string]: unknown;
}

