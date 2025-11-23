import type { Statistic } from '../types';
import { timeRanges } from '../config/constants';

const baseStats = [
  {
    id: 'automations',
    title: 'Запущенные автоматизации',
    subtitle: 'За последние 30 дней',
    value: '4',
  },
  {
    id: 'failed',
    title: 'Неудачные запуски',
    subtitle: 'За последние 30 дней',
    value: '12',
  },
  {
    id: 'errorRate',
    title: 'Процент ошибок',
    subtitle: 'За последние 30 дней',
    value: '24,5%',
  },
  {
    id: 'savedTime',
    title: 'Сэкономлено времени',
    subtitle: 'За последние 30 дней',
    value: '~15s',
  },
  {
    id: 'avgTime',
    title: 'Среднее время выполнения',
    subtitle: 'За последние 30 дней',
    value: '2s',
  },
];

const multipliers = {
  '24h': 0.1,
  '7d': 0.25,
  '14d': 0.5,
  '30d': 1,
  '90d': 2.5,
  '6m': 5,
  '1y': 10,
};

export const generateStatistics = (
  timeRange: string,
  activeStatistic: string | null
): Statistic[] => {
  const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1;
  const timeRangeLabel = timeRanges.find((range) => range.id === timeRange)?.label || '';

  return baseStats.map((stat) => ({
    ...stat,
    subtitle: `За ${timeRangeLabel.toLowerCase()}`,
    value:
      stat.id === 'errorRate' || stat.id === 'avgTime'
        ? stat.value
        : stat.id === 'automations' || stat.id === 'failed'
        ? Math.round(parseInt(stat.value) * multiplier).toString()
        : stat.value,
    isActive: activeStatistic === stat.id,
  }));
};

