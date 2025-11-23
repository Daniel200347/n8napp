import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { generateChartData, generateLineChartData } from './utils/chartDataGenerators';
import { generateStatistics } from './utils/statisticsGenerator';
import { BarChart } from './components/BarChart';
import { LineChart } from './components/LineChart';
import { TimeRangeSelector } from './components/TimeRangeSelector';
import { StatisticsCards } from './components/StatisticsCards';
import type { ChartData, LineChartData, TooltipData } from './types';
import styles from './StatisticsPage.module.css';

export const StatisticsPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeStatistic, setActiveStatistic] = useState<string | null>(null);
  const [showSuccessful, setShowSuccessful] = useState(true);
  const [showFailed, setShowFailed] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const chartData = generateChartData(selectedTimeRange);
  const lineChartData = generateLineChartData(selectedTimeRange);
  const statistics = generateStatistics(selectedTimeRange, activeStatistic);
  const maxValue = Math.max(...chartData.map((d) => Math.max(d.successful, d.failed)));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatisticClick = (id: string) => {
    setActiveStatistic(activeStatistic === id ? null : id);
  };

  const handleTimeRangeSelect = (rangeId: string) => {
    setSelectedTimeRange(rangeId);
    setIsDropdownOpen(false);
  };

  const toggleLegendItem = (type: 'successful' | 'failed') => {
    if (type === 'successful') {
      setShowSuccessful(!showSuccessful);
    } else {
      setShowFailed(!showFailed);
    }
  };

  const handleBarMouseEnter = (event: React.MouseEvent, data: ChartData) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      successful: data.successful,
      failed: data.failed,
      date: data.date,
    });
  };

  const handleLineMouseEnter = (event: React.MouseEvent, data: LineChartData) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      value: data.value,
      date: data.date,
    });
  };

  const handleBarMouseLeave = () => {
    setTooltip(null);
  };

  const renderChart = () => {
    if (activeStatistic === 'savedTime' || activeStatistic === 'avgTime') {
      return (
        <LineChart
          data={lineChartData}
          onLineMouseEnter={handleLineMouseEnter}
          onLineMouseLeave={handleBarMouseLeave}
        />
      );
    }

    return (
      <BarChart
        data={chartData}
        maxValue={maxValue}
        showSuccessful={showSuccessful}
        showFailed={showFailed}
        onBarMouseEnter={handleBarMouseEnter}
        onBarMouseLeave={handleBarMouseLeave}
      />
    );
  };

  return (
    <div className={styles.statisticsPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Статистика</h1>
          </header>

          <div className={styles.statisticsSection}>
            <TimeRangeSelector
              selectedTimeRange={selectedTimeRange}
              isDropdownOpen={isDropdownOpen}
              onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
              onSelect={handleTimeRangeSelect}
              dropdownRef={dropdownRef}
            />

            <div className={styles.statisticsContainer}>
              <StatisticsCards
                statistics={statistics}
                onStatisticClick={handleStatisticClick}
              />

              <div className={styles.divider}></div>

              <div className={styles.chartSection}>
                {renderChart()}

                {activeStatistic !== 'savedTime' && activeStatistic !== 'avgTime' && (
                  <div className={styles.legend}>
                    <div
                      className={`${styles.legendItem} ${
                        !showSuccessful ? styles.legendItemDisabled : ''
                      }`}
                      onClick={() => toggleLegendItem('successful')}
                    >
                      <div
                        className={styles.legendIcon}
                        style={{ backgroundColor: '#2A9D90' }}
                      ></div>
                      <span className={styles.legendText}>Успешно</span>
                    </div>
                    <div
                      className={`${styles.legendItem} ${
                        !showFailed ? styles.legendItemDisabled : ''
                      }`}
                      onClick={() => toggleLegendItem('failed')}
                    >
                      <div
                        className={styles.legendIcon}
                        style={{ backgroundColor: '#E76E50' }}
                      ></div>
                      <span className={styles.legendText}>Неудачно</span>
                    </div>
                  </div>
                )}

                {tooltip && (
                  <div
                    className={styles.tooltip}
                    style={{
                      left: tooltip.x,
                      top: tooltip.y,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className={styles.tooltipDate}>{tooltip.date}</div>
                    {tooltip.successful !== undefined && showSuccessful && (
                      <div className={styles.tooltipItem}>
                        <span className={styles.tooltipLabel}>Успешно:</span>
                        <span className={styles.tooltipValue}>{tooltip.successful}</span>
                      </div>
                    )}
                    {tooltip.failed !== undefined && showFailed && (
                      <div className={styles.tooltipItem}>
                        <span className={styles.tooltipLabel}>Неудачно:</span>
                        <span className={styles.tooltipValue}>{tooltip.failed}</span>
                      </div>
                    )}
                    {tooltip.value !== undefined && (
                      <div className={styles.tooltipItem}>
                        <span className={styles.tooltipLabel}>Значение:</span>
                        <span className={styles.tooltipValue}>{tooltip.value}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

