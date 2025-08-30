import { useState, useEffect, useRef } from 'react'
import { Sidebar } from '@/components/ui/Sidebar'
import { ChevronDownIcon } from '@/components/ui/Icons'
import styles from './StatisticsPage.module.css'



interface ChartData {
  date: string
  successful: number
  failed: number
}

interface LineChartData {
  date: string
  value: number
}

interface TooltipData {
  x: number
  y: number
  successful?: number
  failed?: number
  value?: number
  date: string
}

const timeRanges = [
  { id: '24h', label: 'Последние 24 часа' },
  { id: '7d', label: 'Последние 7 дней' },
  { id: '14d', label: 'Последние 14 дней' },
  { id: '30d', label: 'Последние 30 дней' },
  { id: '90d', label: 'Последние 90 дней' },
  { id: '6m', label: '6 месяцев' },
  { id: '1y', label: '1 год' }
]

const generateChartData = (timeRange: string): ChartData[] => {
  const baseData = [
    { date: 'Июл 1', successful: 8, failed: 2 },
    { date: 'Июл 7', successful: 12, failed: 3 },
    { date: 'Июл 14', successful: 6, failed: 1 },
    { date: 'Июл 21', successful: 15, failed: 4 }
  ]

  const multipliers = {
    '24h': 0.3,
    '7d': 0.5,
    '14d': 0.7,
    '30d': 1,
    '90d': 1.5,
    '6m': 2,
    '1y': 3
  }

  const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1

  return baseData.map(data => ({
    ...data,
    successful: Math.round(data.successful * multiplier),
    failed: Math.round(data.failed * multiplier)
  }))
}

const generateLineChartData = (timeRange: string): LineChartData[] => {
  const baseData = [
    { date: 'Июл 1', value: 2.5 },
    { date: 'Июл 7', value: 3.2 },
    { date: 'Июл 14', value: 1.8 },
    { date: 'Июл 21', value: 4.1 }
  ]

  const multipliers = {
    '24h': 0.3,
    '7d': 0.5,
    '14d': 0.7,
    '30d': 1,
    '90d': 1.5,
    '6m': 2,
    '1y': 3
  }

  const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1

  return baseData.map(data => ({
    ...data,
    value: Math.round(data.value * multiplier * 10) / 10
  }))
}

const generateStatistics = (timeRange: string, activeStatistic: string | null) => {
  const baseStats = [
    {
      id: 'automations',
      title: 'Запущенные автоматизации',
      subtitle: 'За последние 30 дней',
      value: '4'
    },
    {
      id: 'failed',
      title: 'Неудачные запуски',
      subtitle: 'За последние 30 дней',
      value: '12'
    },
    {
      id: 'errorRate',
      title: 'Процент ошибок',
      subtitle: 'За последние 30 дней',
      value: '24,5%'
    },
    {
      id: 'savedTime',
      title: 'Сэкономлено времени',
      subtitle: 'За последние 30 дней',
      value: '~15s'
    },
    {
      id: 'avgTime',
      title: 'Среднее время выполнения',
      subtitle: 'За последние 30 дней',
      value: '2s'
    }
  ]

  const multipliers = {
    '24h': 0.1,
    '7d': 0.25,
    '14d': 0.5,
    '30d': 1,
    '90d': 2.5,
    '6m': 5,
    '1y': 10
  }

  const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1

  return baseStats.map(stat => ({
    ...stat,
    subtitle: `За ${timeRanges.find(range => range.id === timeRange)?.label.toLowerCase()}`,
    value: stat.id === 'errorRate' || stat.id === 'avgTime' 
      ? stat.value 
      : stat.id === 'automations' || stat.id === 'failed'
      ? Math.round(parseInt(stat.value) * multiplier).toString()
      : stat.value,
    isActive: activeStatistic === stat.id
  }))
}

export const StatisticsPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeStatistic, setActiveStatistic] = useState<string | null>(null)
  const [showSuccessful, setShowSuccessful] = useState(true)
  const [showFailed, setShowFailed] = useState(true)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  const chartData = generateChartData(selectedTimeRange)
  const lineChartData = generateLineChartData(selectedTimeRange)
  const statistics = generateStatistics(selectedTimeRange, activeStatistic)
  const maxValue = Math.max(...chartData.map(d => Math.max(d.successful, d.failed)))

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleStatisticClick = (id: string) => {
    setActiveStatistic(activeStatistic === id ? null : id)
  }

  const handleTimeRangeSelect = (rangeId: string) => {
    setSelectedTimeRange(rangeId)
    setIsDropdownOpen(false)
  }

  const getSelectedTimeRangeLabel = () => {
    return timeRanges.find(range => range.id === selectedTimeRange)?.label || 'Последние 30 дней'
  }

  const toggleLegendItem = (type: 'successful' | 'failed') => {
    if (type === 'successful') {
      setShowSuccessful(!showSuccessful)
    } else {
      setShowFailed(!showFailed)
    }
  }

  const handleBarMouseEnter = (event: React.MouseEvent, data: ChartData) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      successful: data.successful,
      failed: data.failed,
      date: data.date
    })
  }

  const handleLineMouseEnter = (event: React.MouseEvent, data: LineChartData) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      value: data.value,
      date: data.date
    })
  }

  const handleBarMouseLeave = () => {
    setTooltip(null)
  }

  const renderChart = () => {
    if (activeStatistic === 'savedTime' || activeStatistic === 'avgTime') {
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

          {/* Grid Lines for Line Chart */}
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
                d={`M 0 ${200 - (lineChartData[0]?.value || 0) * 40} ${lineChartData.map((data) => 
                  `L ${(lineChartData.indexOf(data) + 1) * 100} ${200 - data.value * 40}`
                ).join(' ')} L 400 200 L 0 200 Z`}
                fill="url(#lineGradient)"
              />
              
              <path
                d={`M 0 ${200 - (lineChartData[0]?.value || 0) * 40} ${lineChartData.map((data) => 
                  `L ${(lineChartData.indexOf(data) + 1) * 100} ${200 - data.value * 40}`
                ).join(' ')}`}
                stroke="#155DFC"
                strokeWidth="2"
                fill="none"
              />
              
                          {lineChartData.map((data) => (
              <circle
                key={data.date}
                cx={(lineChartData.indexOf(data) + 1) * 100}
                cy={200 - data.value * 40}
                r="4"
                fill="#155DFC"
                onMouseEnter={(e) => handleLineMouseEnter(e, data)}
                onMouseLeave={handleBarMouseLeave}
                style={{ cursor: 'pointer' }}
              />
            ))}
            </svg>
          </div>

          <div className={styles.xAxisLabels}>
            {lineChartData.map((data, index) => (
              <span key={index} className={styles.xAxisText}>
                {data.date}
              </span>
            ))}
          </div>
        </div>
      )
    }

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

        {/* Grid Lines */}
        <div className={styles.gridLines}>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div>
        </div>

        <div className={styles.chartBars}>
          {chartData.map((data, index) => (
            <div 
              key={index} 
              className={styles.barGroup}
              onMouseEnter={(e) => handleBarMouseEnter(e, data)}
              onMouseLeave={handleBarMouseLeave}
            >
              {showSuccessful && (
                <div
                  className={styles.bar}
                  style={{
                    height: `${(data.successful / maxValue) * 100}%`,
                    backgroundColor: '#2A9D90'
                  }}
                ></div>
              )}
              {showFailed && (
                <div
                  className={styles.bar}
                  style={{
                    height: `${(data.failed / maxValue) * 100}%`,
                    backgroundColor: '#E76E50'
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.xAxisLabels}>
          {chartData.map((data, index) => (
            <span key={index} className={styles.xAxisText}>
              {data.date}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.statisticsPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Статистика</h1>
          </header>
          
          <div className={styles.statisticsSection}>
            <div className={styles.timeRangeSelector} ref={dropdownRef}>
              <div 
                className={styles.timeRangeInput}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className={styles.timeRangeText}>{getSelectedTimeRangeLabel()}</span>
                <ChevronDownIcon className={`${styles.timeRangeIcon} ${isDropdownOpen ? styles.timeRangeIconRotated : ''}`} />
              </div>
              
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {timeRanges.map((range) => (
                    <div
                      key={range.id}
                      className={`${styles.menuItem} ${selectedTimeRange === range.id ? styles.menuItemActive : ''}`}
                      onClick={() => handleTimeRangeSelect(range.id)}
                    >
                      <span className={styles.menuItemText}>{range.label}</span>
                      {selectedTimeRange === range.id && (
                        <div className={styles.checkIcon}>✓</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.statisticsContainer}>
              <div className={styles.statisticsGrid}>
                {statistics.map((stat) => (
                  <div
                    key={stat.id}
                    className={`${styles.statisticCard} ${stat.isActive ? styles.statisticCardActive : ''}`}
                    onClick={() => handleStatisticClick(stat.id)}
                  >
                    <div className={styles.statisticHeader}>
                      <h3 className={styles.statisticTitle}>{stat.title}</h3>
                      <p className={styles.statisticSubtitle}>{stat.subtitle}</p>
                    </div>
                    <div className={styles.statisticValue}>{stat.value}</div>
                  </div>
                ))}
              </div>
              
              <div className={styles.divider}></div>

              <div className={styles.chartSection}>
                {renderChart()}

                {activeStatistic !== 'savedTime' && activeStatistic !== 'avgTime' && (
                  <div className={styles.legend}>
                    <div 
                      className={`${styles.legendItem} ${!showSuccessful ? styles.legendItemDisabled : ''}`}
                      onClick={() => toggleLegendItem('successful')}
                    >
                      <div 
                        className={styles.legendIcon}
                        style={{ backgroundColor: '#2A9D90' }}
                      ></div>
                      <span className={styles.legendText}>Успешно</span>
                    </div>
                    <div 
                      className={`${styles.legendItem} ${!showFailed ? styles.legendItemDisabled : ''}`}
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
                      transform: 'translateX(-50%)'
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
  )
}
