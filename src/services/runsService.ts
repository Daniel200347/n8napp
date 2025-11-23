import type { RunRow } from '@/api/mockData';
import { mockRunsData } from '@/api/mockData';

export const runsService = {
  async getRuns(): Promise<RunRow[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockRunsData]);
      }, 300);
    });
  },
  async getRun(id: string): Promise<RunRow> {
    const run = mockRunsData.find(r => r.id === id);
    if (!run) {
      throw new Error('Запуск не найден');
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(run), 200);
    });
  },
  async deleteRun(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  },
  async repeatCurrentWorkflow(runId: string): Promise<RunRow> {
    const run = mockRunsData.find(r => r.id === runId);
    if (!run) {
      throw new Error('Запуск не найден');
    }
    const newRun: RunRow = {
      ...run,
      id: Date.now().toString(),
      startTime: 'Только что',
      status: 'running',
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(newRun), 300);
    });
  },
  async repeatOriginalWorkflow(runId: string): Promise<RunRow> {
    const run = mockRunsData.find(r => r.id === runId);
    if (!run) {
      throw new Error('Запуск не найден');
    }
    const newRun: RunRow = {
      ...run,
      id: Date.now().toString(),
      startTime: 'Только что',
      status: 'running',
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(newRun), 300);
    });
  },
};

