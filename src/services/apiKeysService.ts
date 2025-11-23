import type { ApiKey } from '@/api/mockData';
import { mockApiKeysData } from '@/api/mockData';

export const apiKeysService = {
  async getApiKeys(): Promise<ApiKey[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockApiKeysData]);
      }, 300);
    });
  },

  async getApiKey(id: string): Promise<ApiKey> {
    const apiKey = mockApiKeysData.find(k => k.id === id);
    if (!apiKey) {
      throw new Error('API ключ не найден');
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(apiKey), 200);
    });
  },

  async createApiKey(data: Omit<ApiKey, 'id' | 'added' | 'lastUpdate'>): Promise<ApiKey> {
    const timeString = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      name: data.name || 'Новый ключ',
      service: data.service || 'Unknown',
      status: data.status || 'disconnected',
      added: `Сегодня, в ${timeString}`,
      lastUpdate: `Сегодня, в ${timeString}`,
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(newApiKey), 300);
    });
  },

  async updateApiKey(id: string, data: Partial<ApiKey>): Promise<ApiKey> {
    const apiKey = mockApiKeysData.find(k => k.id === id);
    if (!apiKey) {
      throw new Error('API ключ не найден');
    }
    const timeString = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const updated: ApiKey = {
      ...apiKey,
      ...data,
      lastUpdate: `Сегодня, в ${timeString}`,
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(updated), 300);
    });
  },

  async deleteApiKey(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  },
};

