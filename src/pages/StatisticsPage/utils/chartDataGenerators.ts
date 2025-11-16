import type { ChartData, LineChartData } from '../types';

const multipliers = {
  '24h': 0.3,
  '7d': 0.5,
  '14d': 0.7,
  '30d': 1,
  '90d': 1.5,
  '6m': 2,
  '1y': 3,
};

export const generateChartData = (timeRange: string): ChartData[] => {
  const baseData: ChartData[] = [
    { date: 'Июл 1', successful: 8, failed: 2 },
    { date: 'Июл 7', successful: 12, failed: 3 },
    { date: 'Июл 14', successful: 6, failed: 1 },
    { date: 'Июл 21', successful: 15, failed: 4 },
  ];

  const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1;

  return baseData.map((data) => ({
    ...data,
    successful: Math.round(data.successful * multiplier),
    failed: Math.round(data.failed * multiplier),
  }));
};

export const generateLineChartData = (timeRange: string): LineChartData[] => {
  const baseData: LineChartData[] = [
    { date: 'Июл 1', value: 2.5 },
    { date: 'Июл 7', value: 3.2 },
    { date: 'Июл 14', value: 1.8 },
    { date: 'Июл 21', value: 4.1 },
  ];

  const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1;

  return baseData.map((data) => ({
    ...data,
    value: Math.round(data.value * multiplier * 10) / 10,
  }));
};

