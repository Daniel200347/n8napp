import React from 'react';
import type { ChartData, TooltipData } from '../types';
import styles from '../StatisticsPage.module.css';

interface BarChartProps {
  data: ChartData[];
  maxValue: number;
  showSuccessful: boolean;
  showFailed: boolean;
  onBarMouseEnter: (event: React.MouseEvent, data: ChartData) => void;
  onBarMouseLeave: () => void;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  showSuccessful,
  showFailed,
  onBarMouseEnter,
  onBarMouseLeave,
}) => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.yAxisLabels}>
        {[15, 10, 5, 0].map((value) => (
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
      </div>

      <div className={styles.chartBars}>
        {data.map((item, index) => (
          <div
            key={index}
            className={styles.barGroup}
            onMouseEnter={(e) => onBarMouseEnter(e, item)}
            onMouseLeave={onBarMouseLeave}
          >
            {showSuccessful && (
              <div
                className={styles.bar}
                style={{
                  height: `${(item.successful / maxValue) * 100}%`,
                  backgroundColor: '#2A9D90',
                }}
              ></div>
            )}
            {showFailed && (
              <div
                className={styles.bar}
                style={{
                  height: `${(item.failed / maxValue) * 100}%`,
                  backgroundColor: '#E76E50',
                }}
              ></div>
            )}
          </div>
        ))}
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

