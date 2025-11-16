import type { Automation } from '../types';

const STORAGE_KEY = 'duplicatedAutomations';

export const loadDuplicatedAutomations = (): Automation[] => {
  try {
    const duplicated = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return duplicated.map((item: any) => ({
      id: item.id,
      name: item.name,
      lastRun: item.lastRun || 'Никогда',
      status: item.status || 'disabled',
      isActive: item.isActive || false,
      isDuplicated: true,
    }));
  } catch (e) {
    return [];
  }
};

export const useDuplicatedAutomationsSync = (
  callback: (duplicated: Automation[]) => void
) => {
  const handleStorageChange = () => {
    const duplicated = loadDuplicatedAutomations();
    callback(duplicated);
  };

  return {
    handleStorageChange,
    loadDuplicatedAutomations,
  };
};

