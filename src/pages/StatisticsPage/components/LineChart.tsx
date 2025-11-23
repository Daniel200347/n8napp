import React from 'react';
import type { LineChartData } from '../types';
import styles from '../StatisticsPage.module.css';

interface LineChartProps {
  data: LineChartData[];
  onLineMouseEnter: (event: React.MouseEvent, data: LineChartData) => void;
  onLineMouseLeave: () => void;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  onLineMouseEnter,
  onLineMouseLeave,
}) => {
  return (
    <div className={styles.lineChartContainer}>
      <div className={styles.yAxisLabels}>
        {[5, 4, 3, 2, 1, 0].map((value) => (
          <div key={value} className={styles.yAxisLabel}>
            <span className={styles.yAxisText}>{value}</span>
            <div className={styles.yAxisLine}></div>
          </div>
        ))}
      </div>

      <div className={styles.gridLines}>
        <div className={styles.gridLine}></div>
        <div className={styles.gridLine}></div>
        <div className={styles.gridLine}></div>
        <div className={styles.gridLine}></div>
        <div className={styles.gridLine}></div>
        <div className={styles.gridLine}></div>
      </div>

      <div className={styles.lineChart}>
        <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#155DFC" stopOpacity="1" />
              <stop offset="100%" stopColor="#155DFC" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={`M 0 ${200 - (data[0]?.value || 0) * 40} ${data
              .map((item) => `L ${(data.indexOf(item) + 1) * 100} ${200 - item.value * 40}`)
              .join(' ')} L 400 200 L 0 200 Z`}
            fill="url(#lineGradient)"
          />

          <path
            d={`M 0 ${200 - (data[0]?.value || 0) * 40} ${data
              .map((item) => `L ${(data.indexOf(item) + 1) * 100} ${200 - item.value * 40}`)
              .join(' ')}`}
            stroke="#155DFC"
            strokeWidth="2"
            fill="none"
          />

          {data.map((item) => (
            <circle
              key={item.date}
              cx={(data.indexOf(item) + 1) * 100}
              cy={200 - item.value * 40}
              r="4"
              fill="#155DFC"
              onMouseEnter={(e) => onLineMouseEnter(e, item)}
              onMouseLeave={onLineMouseLeave}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </svg>
      </div>

      <div className={styles.xAxisLabels}>
        {data.map((item, index) => (
          <span key={index} className={styles.xAxisText}>
            {item.date}
          </span>
        ))}
      </div>
    </div>
  );
};

