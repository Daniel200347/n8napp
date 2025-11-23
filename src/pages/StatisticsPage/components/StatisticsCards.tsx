import React from 'react';
import type { Statistic } from '../types';
import styles from '../StatisticsPage.module.css';

interface StatisticsCardsProps {
  statistics: Statistic[];
  onStatisticClick: (id: string) => void;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  statistics,
  onStatisticClick,
}) => {
  return (
    <div className={styles.statisticsGrid}>
      {statistics.map((stat) => (
        <div
          key={stat.id}
          className={`${styles.statisticCard} ${stat.isActive ? styles.statisticCardActive : ''}`}
          onClick={() => onStatisticClick(stat.id)}
        >
          <div className={styles.statisticHeader}>
            <h3 className={styles.statisticTitle}>{stat.title}</h3>
            <p className={styles.statisticSubtitle}>{stat.subtitle}</p>
          </div>
          <div className={styles.statisticValue}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

