import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon, DotsVerticalIcon } from '../../ui/Icons';
import styles from './VersionHistoryModal.module.css';
import type { VersionData } from '../types/version';
import { createMockVersions } from '../utils/mockVersions';
import type { Node, Edge } from 'reactflow';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewVersion?: (version: VersionData) => void;
  onDuplicateVersion?: (version: VersionData) => void;
  onUseVersion?: (version: VersionData) => void;
  currentNodes?: Node[];
  currentEdges?: Edge[];
  versions?: VersionData[];
  onVersionsChange?: (versions: VersionData[]) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ 
  isOpen, 
  onClose,
  onViewVersion,
  onDuplicateVersion,
  onUseVersion,
  currentNodes,
  currentEdges,
  versions: externalVersions,
  onVersionsChange
}) => {
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [internalVersions, setInternalVersions] = useState<VersionData[]>(() => createMockVersions(currentNodes, currentEdges));
  const hasUpdatedVersionsRef = useRef(false);

  const versions = externalVersions || internalVersions;
  const setVersions = onVersionsChange || setInternalVersions;

  useEffect(() => {
    if (isOpen && !hasUpdatedVersionsRef.current) {
      if (externalVersions && onVersionsChange) {
        const normalizedCurrentNodes = (currentNodes || []).map(node => {
          if (node.type === 'triggerCardNode' && node.data) {
            const { serviceIcon, ...restData } = node.data;
            const iconColor = (node.data as any).iconColor || '#155DFC';
            return {
              ...node,
              data: {
                ...restData,
                iconColor: iconColor
              }
            };
          }
          return node;
        });
        
        const currentVersion = externalVersions.find(v => v.isCurrent);
        if (currentVersion) {
          const normalizedNodesStr = JSON.stringify(normalizedCurrentNodes);
          const normalizedEdgesStr = JSON.stringify(currentEdges || []);
          const currentNodesStr = JSON.stringify(currentVersion.nodes);
          const currentEdgesStr = JSON.stringify(currentVersion.edges);
          
          if (normalizedNodesStr !== currentNodesStr || normalizedEdgesStr !== currentEdgesStr) {
            onVersionsChange(externalVersions.map(v => {
              if (v.isCurrent) {
                return {
                  ...v,
                  nodes: JSON.parse(normalizedNodesStr),
                  edges: JSON.parse(normalizedEdgesStr),
                  publishedAt: new Date(),
                };
              }
              return v;
            }));
          }
        }
        hasUpdatedVersionsRef.current = true;
      } else {
        setInternalVersions(createMockVersions(currentNodes, currentEdges));
      }
    }
    
    if (!isOpen) {
      hasUpdatedVersionsRef.current = false;
    }
  }, [isOpen, currentNodes, currentEdges, externalVersions, onVersionsChange]);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
      setOpenMenuId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuRef = menuRefs.current[openMenuId];
        if (menuRef && !menuRef.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const formatDate = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (dateOnly.getTime() === today.getTime()) {
      return `Сегодня, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    } else if (dateOnly.getTime() === yesterday.getTime()) {
      return `Вчера, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    } else if (dateOnly.getTime() === dayBeforeYesterday.getTime()) {
      return `Позавчера, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  };

  const handleMenuToggle = (versionId: string) => {
    setOpenMenuId(openMenuId === versionId ? null : versionId);
  };

  const handleMenuAction = (action: string, versionId: string) => {
    setOpenMenuId(null);
    
    const version = versions.find(v => v.id === versionId);
    if (!version) return;

    if (action === 'view' && onViewVersion) {
      onViewVersion(version);
      onClose();
    } else if (action === 'duplicate' && onDuplicateVersion) {
      onDuplicateVersion(version);
    } else if (action === 'use' && onUseVersion) {
      onUseVersion(version);
      onClose();
    }
  };

  const handleCardClick = (version: VersionData) => {
    if (onViewVersion) {
      onViewVersion(version);
      onClose();
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${showModal ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            История версий
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.versionList}>
          {versions
            .slice()
            .sort((a, b) => {
              const dateA = a.publishedAt instanceof Date ? a.publishedAt : new Date(a.publishedAt);
              const dateB = b.publishedAt instanceof Date ? b.publishedAt : new Date(b.publishedAt);
              return dateB.getTime() - dateA.getTime();
            })
            .map((version) => (
            <div 
              key={version.id} 
              className={styles.versionCard}
              onClick={() => handleCardClick(version)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.versionInfo}>
                <div className={styles.versionTitle}>
                  {formatDate(version.publishedAt)}
                </div>
                <div className={styles.versionName}>
                  {version.publishedBy}, v{version.versionNumber}
                </div>
              </div>
              
              {version.isCurrent && (
                <div className={styles.badge}>
                  Текущая
                </div>
              )}

              <div 
                className={styles.menuContainer}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className={styles.menuButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuToggle(version.id);
                  }}
                >
                  <DotsVerticalIcon width={16} height={16} />
                </button>

                {openMenuId === version.id && (
                  <div 
                    ref={(el) => menuRefs.current[version.id] = el}
                    className={styles.dropdownMenu}
                  >
                    <button 
                      className={styles.menuItem}
                      onClick={() => handleMenuAction('view', version.id)}
                    >
                      Посмотреть
                    </button>
                    <button 
                      className={styles.menuItem}
                      onClick={() => handleMenuAction('duplicate', version.id)}
                    >
                      Дублировать
                    </button>
                    <button 
                      className={styles.menuItem}
                      onClick={() => handleMenuAction('use', version.id)}
                    >
                      Использовать
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

