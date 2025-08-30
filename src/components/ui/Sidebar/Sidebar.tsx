import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Sidebar.module.css'
import { Logo } from '@/components/ui/Logo'
import { Progress } from '@/components/ui/Progress'
import { Avatar } from '@/components/ui/Avatar'
import {
  ChartIcon,
  DashboardIcon,
  TemplateIcon,
  SettingsIcon
} from '@/components/ui/Icons'
import {LogoutIcon} from "@/components/ui/Icons";

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

const menuItems: MenuItemData[] = [
  { id: 'overview', icon: <DashboardIcon />, label: 'Дашборд', href: '/dashboard' },
  { id: 'statistics', icon: <ChartIcon />, label: 'Статистика', href: '/statistics' },
  { id: 'templates', icon: <TemplateIcon />, label: 'Шаблоны', href: '/templates' },
  { id: 'settings', icon: <SettingsIcon />, label: 'Настройки', href: '/settings' },
]

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation()

  const getIconWithColor = (iconType: string, isActive: boolean) => {
    const color = isActive ? "#020618" : "#62748E";

    switch (iconType) {
      case 'overview':
        return <DashboardIcon color={color} />;
      case 'statistics':
        return <ChartIcon color={color} />;
      case 'templates':
        return <TemplateIcon color={color} />;
      case 'settings':
        return <SettingsIcon color={color} />;
      default:
        return <DashboardIcon color={color} />;
    }
  };

  return (
    <aside className={clsx(styles.sidebar, className)}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navigation}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <MenuItem
              key={item.id}
              icon={getIconWithColor(item.id, isActive)}
              label={item.label}
              href={item.href}
              isActive={isActive}
            />
          );
        })}
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
          <span className={styles.profileName}>
            Alena Support</span>
        </div>
        <button className={styles.profileMenuButton} aria-label="Profile menu">
          <LogoutIcon  />
        </button>
      </div>
    </aside>
  )
}
