import type { Automation } from '@/api/mockData';
import { mockAutomationsData } from '@/api/mockData';

export const automationsService = {
  async getAutomations(): Promise<Automation[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockAutomationsData]);
      }, 300);
    });
  },

  async getAutomation(id: string): Promise<Automation> {
    const automation = mockAutomationsData.find(a => a.id === id);
    if (!automation) {
      throw new Error('Автоматизация не найдена');
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(automation), 200);
    });
  },

  async createAutomation(data: Omit<Automation, 'id'>): Promise<Automation> {
    const newAutomation: Automation = {
      ...data,
      id: Date.now().toString(),
      name: data.name || 'Новая автоматизация',
      lastRun: data.lastRun || 'Никогда',
      status: data.status || 'disabled',
      isActive: data.isActive ?? false,
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(newAutomation), 300);
    });
  },

  async updateAutomation(id: string, data: Partial<Automation>): Promise<Automation> {
    const automation = mockAutomationsData.find(a => a.id === id);
    if (!automation) {
      throw new Error('Автоматизация не найдена');
    }
    const updated = { ...automation, ...data };
    return new Promise((resolve) => {
      setTimeout(() => resolve(updated), 300);
    });
  },

  async deleteAutomation(_id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  },
  async duplicateAutomation(_id: string): Promise<Automation> {
    const automation = mockAutomationsData.find(a => a.id === _id);
    if (!automation) {
      throw new Error('Автоматизация не найдена');
    }
    const duplicated: Automation = {
      ...automation,
      id: Date.now().toString(),
      name: `${automation.name} (копия)`,
      isDuplicated: true,
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(duplicated), 300);
    });
  },
  async toggleAutomationStatus(id: string, isActive: boolean): Promise<Automation> {
    const automation = mockAutomationsData.find(a => a.id === id);
    if (!automation) {
      throw new Error('Автоматизация не найдена');
    }
    const updated: Automation = {
      ...automation,
      isActive,
      status: isActive ? 'enabled' : 'disabled',
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(updated), 300);
    });
  },
};

