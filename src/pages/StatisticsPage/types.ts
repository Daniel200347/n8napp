export interface ChartData {
  date: string;
  successful: number;
  failed: number;
}

export interface LineChartData {
  date: string;
  value: number;
}

export interface TooltipData {
  x: number;
  y: number;
  successful?: number;
  failed?: number;
  value?: number;
  date: string;
}

export interface Statistic {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  isActive: boolean;
}

export interface TimeRange {
  id: string;
  label: string;
}

