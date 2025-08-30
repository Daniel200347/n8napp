import React from 'react';
import styles from './SideMenu.module.css';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      
      {/* Side Menu */}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuContent}>
          <div className={styles.menuBody}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

