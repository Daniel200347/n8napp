import React from 'react';
import styles from '../DashboardPage.module.css';

interface StatCard {
  title: string;
  subtitle: string;
  value: string;
}

interface StatisticsCardsProps {
  stats: StatCard[];
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  return (
    <div className={styles.statisticsGrid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>{stat.title}</h3>
            <p className={styles.statSubtitle}>{stat.subtitle}</p>
          </div>
          <div className={styles.statValue}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

