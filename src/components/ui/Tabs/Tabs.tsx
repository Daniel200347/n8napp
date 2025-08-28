import React from 'react';
import styles from './Tabs.module.css';

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ 
  items, 
  activeTab, 
  onTabChange,
  className 
}) => {
  return (
    <div className={`${styles.tabs} ${className || ''}`}>
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles.tabItem} ${activeTab === item.id ? styles.active : ''}`}
          onClick={() => onTabChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

