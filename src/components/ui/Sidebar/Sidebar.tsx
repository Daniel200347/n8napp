import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Sidebar.module.css'
import { Logo } from '@/components/ui/Logo'
import { Progress } from '@/components/ui/Progress'
import { Avatar } from '@/components/ui/Avatar'

interface SidebarProps {
  className?: string
}

interface MenuItemData {
  id: string
  icon: ReactNode
  label: string
  href: string
}

interface MenuItemProps {
  icon: ReactNode
  label: string
  href: string
  isActive?: boolean
  className?: string
}

const MenuItem = ({ icon, label, href, isActive, className }: MenuItemProps) => {
  return (
    <Link
      to={href}
      className={clsx(
        styles.menuItem,
        {
          [styles.menuItemActive]: isActive,
        },
        className
      )}
    >
      <div className={styles.menuItemIcon}>{icon}</div>
      <span className={styles.menuItemLabel}>{label}</span>
    </Link>
  )
}

const DashedSquareIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.5"
      y="2.5"
      width="15"
      height="15"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3.5 3.5"
    />
  </svg>
)

const menuItems: MenuItemData[] = [
  { id: 'overview', icon: <DashedSquareIcon />, label: 'Обзор', href: '/overview' },
  { id: 'statistics', icon: <DashedSquareIcon />, label: 'Статистика', href: '/statistics' },
  { id: 'templates', icon: <DashedSquareIcon />, label: 'Шаблоны', href: '/templates' },
  { id: 'settings', icon: <DashedSquareIcon />, label: 'Настройки', href: '/settings' },
]

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation()

  return (
    <aside className={clsx(styles.sidebar, className)}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navigation}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={location.pathname === item.href}
          />
        ))}
      </nav>

      {/* Usage Card */}
      <div className={styles.usageCard}>
        <div className={styles.usageHeader}>
          <div className={styles.usageInfo}>
            <span className={styles.usageTitle}>Кредиты</span>
            <span className={styles.usageValue}>300/1,000</span>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <Progress value={300} max={1000} />
        </div>

        <div className={styles.trialInfo}>
          <span className={styles.trialLabel}>Пробный период осталось</span>
          <span className={styles.trialValue}>13 дней</span>
        </div>

        <button className={styles.upgradeButton}>
          Обновить план
        </button>
      </div>

      {/* User Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <Avatar fallback="ИФ" size="md" />
          <span className={styles.profileName}>Alena Support</span>
        </div>
        <button className={styles.profileMenuButton} aria-label="Profile menu">
          <DashedSquareIcon />
        </button>
      </div>
    </aside>
  )
}
