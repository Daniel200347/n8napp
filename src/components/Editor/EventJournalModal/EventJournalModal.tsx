import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon, DotsVerticalIcon, SparklesIcon, DangerCircleIcon } from '../../ui/Icons';
import { Tabs } from '../../ui/Tabs';
import styles from './EventJournalModal.module.css';
import type { Node } from 'reactflow';

interface EventJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerNodes: Node[];
  onOpenEditTrigger?: (triggerId: string) => void;
  isOtherModalOpen?: boolean;
  onOpenAIAssistant?: () => void;
}

export const EventJournalModal: React.FC<EventJournalModalProps> = ({
  isOpen,
  onClose,
  triggerNodes,
  onOpenEditTrigger,
  isOtherModalOpen = false,
  onOpenAIAssistant
}) => {
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedTriggerId, setSelectedTriggerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('output');
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
      setOpenMenuId(null);
      setSelectedTriggerId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuRef = menuRefs.current[openMenuId];
        if (menuRef && !menuRef.contains(event.target as HTMLElement)) {
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

  const handleMenuToggle = (nodeId: string) => {
    setOpenMenuId(openMenuId === nodeId ? null : nodeId);
  };

  const handleMenuAction = (action: string, nodeId: string) => {
    setOpenMenuId(null);

    if (action === 'view') {
      handleViewTrigger(nodeId);
    }
  };

  const handleViewTrigger = (nodeId: string) => {
    const node = triggerNodes.find(n => n.id === nodeId);
    if (node) {
      setActiveTab(node.data?.status === 'error' ? 'output' : 'input');
      setSelectedTriggerId(nodeId);
      
      if (onOpenEditTrigger) {
        const triggerId = node.data?.id || nodeId;
        onOpenEditTrigger(triggerId);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedTriggerId(null);
  };

  const selectedTrigger = triggerNodes.find(n => n.id === selectedTriggerId);

  const getTriggerSpeed = (node: Node) => {
    if (node.data?.status === 'error') {
      return 'Ошибка';
    }
    const randomMs = (Math.random() * 5).toFixed(2);
    return `${randomMs} мс`;
  };

  const getTriggerColor = (node: Node) => {
    if (node.data?.status === 'error') {
      return '#CA6CD3';
    }
    const colors = ['#2A9D90', '#E76E50'];
    const index = parseInt(node.data?.number || '1') - 1;
    return colors[index % colors.length] || '#2A9D90';
  };

  const errorCount = triggerNodes.filter(node => node.data?.status === 'error').length;

  const formatDetailedDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatJsonWithColors = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);

      return formatted.split('\n')
        .filter(line => line.trim().length > 0)
        .map((line, index) => {
        const keyMatch = line.match(/^(\s*)("(?:[^"\\]|\\.)*")\s*:\s*(.*)$/);

        if (keyMatch) {
          const indent = keyMatch[1];
          const key = keyMatch[2];
          const valuePart = keyMatch[3];

          const parts: React.ReactNode[] = [];
          let currentIndex = 0;

          while (currentIndex < valuePart.length) {
            if (valuePart[currentIndex] === '"') {
              let endIndex = currentIndex + 1;
              let escaped = false;

              while (endIndex < valuePart.length) {
                if (escaped) {
                  escaped = false;
                  endIndex++;
                  continue;
                }
                if (valuePart[endIndex] === '\\') {
                  escaped = true;
                  endIndex++;
                  continue;
                }
                if (valuePart[endIndex] === '"') {
                  const value = valuePart.substring(currentIndex, endIndex + 1);
                  parts.push(
                    <span key={currentIndex} className={styles.jsonValue}>{value}</span>
                  );
                  currentIndex = endIndex + 1;
                  break;
                }
                endIndex++;
              }
              if (endIndex >= valuePart.length) break;
            }
            else if (/[\d-]/.test(valuePart[currentIndex])) {
              const numMatch = valuePart.substring(currentIndex).match(/^-?\d+\.?\d*/);
              if (numMatch) {
                parts.push(
                  <span key={currentIndex} className={styles.jsonValue}>{numMatch[0]}</span>
                );
                currentIndex += numMatch[0].length;
              } else {
                currentIndex++;
              }
            }
            else if (/[tfn]/.test(valuePart[currentIndex])) {
              const boolMatch = valuePart.substring(currentIndex).match(/^(true|false|null)/);
              if (boolMatch) {
                parts.push(
                  <span key={currentIndex} className={styles.jsonValue}>{boolMatch[0]}</span>
                );
                currentIndex += boolMatch[0].length;
              } else {
                parts.push(
                  <span key={currentIndex} className={styles.jsonRest}>{valuePart[currentIndex]}</span>
                );
                currentIndex++;
              }
            }
            else {
              parts.push(
                <span key={currentIndex} className={styles.jsonRest}>{valuePart[currentIndex]}</span>
              );
              currentIndex++;
            }
          }

          return (
            <div key={index} className={styles.jsonLine}>
              <span className={styles.jsonIndent}>{indent}</span>
              <span className={styles.jsonKey}>{key}</span>
              <span className={styles.jsonColon}>:</span>
              {parts.length > 0 ? parts : <span className={styles.jsonRest}>{valuePart}</span>}
            </div>
          );
        }

        return (
          <div key={index} className={styles.jsonLine}>
            <span className={styles.jsonPlain}>{line}</span>
          </div>
        );
      });
    } catch (e) {
      return jsonString.split('\n')
        .filter(line => line.trim().length > 0)
        .map((line, index) => (
          <div key={index} className={styles.jsonLine}>
            <span className={styles.jsonPlain}>{line}</span>
          </div>
        ));
    }
  };

  const getJsonLineCount = (jsonString: string): number => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      return formatted.split('\n').filter(line => line.trim().length > 0).length;
    } catch (e) {
      return jsonString.split('\n').filter(line => line.trim().length > 0).length;
    }
  };

  useEffect(() => {
    if (selectedTriggerId) {
      const updatedNode = triggerNodes.find(n => n.id === selectedTriggerId);
      if (updatedNode) {
        setActiveTab(updatedNode.data?.status === 'error' ? 'output' : 'input');
      }
    }
  }, [triggerNodes, selectedTriggerId]);

  const getTriggerDetails = (node: Node) => {
    const startDate = new Date();
    const speed = getTriggerSpeed(node);
    const errorCount = node.data?.status === 'error' ? 1 : 0;
    
    const jsonData = `[
  {
    "timestamp": "2025-09-04T17:20:05.217+03:00",
    "Readable date": "September 4th 2025, 5:20:05 pm",
    "Readable time": "5:20:05 pm",
    "Day of week": "Thursday",
    "Year": "2025",
    "Month": "September",
    "Day of month": "04",
    "Hour": "17",
    "Minute": "20",
    "Second": "05",
    "Timezone": "Europe/Moscow (UTC+03:00)"
  }
]`;

    const lineCount = getJsonLineCount(jsonData);

    return {
      startDate,
      speed,
      errorCount,
      jsonData,
      lineCount,
      errorMessage: node.data?.status === 'error'
        ? 'Дочерний узел Chat Model должен быть подключен и включен.'
        : null
    };
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (isOtherModalOpen) {
      const target = e.target as HTMLElement;
      const otherModal = document.querySelector('[data-modal-type="edit-trigger"]');
      if (otherModal && otherModal.contains(target)) {
        return;
      }
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`${styles.modalOverlay} ${showModal ? styles.open : ''} ${isOtherModalOpen ? styles.otherModalOpen : ''}`}
      onClick={handleOverlayClick}
      onMouseDown={(e) => {
        if (isOtherModalOpen) {
          const target = e.target as HTMLElement;
          const otherModal = document.querySelector('[data-modal-type="edit-trigger"]');
          if (otherModal && otherModal.contains(target)) {
            e.stopPropagation();
            return;
          }
        }
        e.stopPropagation();
      }}
      onMouseUp={(e) => {
        if (isOtherModalOpen) {
          const target = e.target as HTMLElement;
          const otherModal = document.querySelector('[data-modal-type="edit-trigger"]');
          if (otherModal && otherModal.contains(target)) {
            e.stopPropagation();
            return;
          }
        }
        e.stopPropagation();
      }}
      data-modal-type="event-journal"
      style={isOtherModalOpen ? { pointerEvents: 'none' } : undefined}
    >
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        style={isOtherModalOpen ? { pointerEvents: 'auto' } : undefined}
      >
        {selectedTrigger ? (
          <>
            <div className={styles.detailHeader}>
              <button className={styles.backButton} onClick={handleBackToList}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="#62748E" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className={styles.detailTitle}>
                {selectedTrigger.data?.number || ''}. {selectedTrigger.data?.name || 'Название триггера'}
              </h2>
            </div>

            <div className={styles.detailContent}>


              {(() => {
                const details = getTriggerDetails(selectedTrigger);
                return (
                  <>
                    <div className={styles.detailInfo}>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Начало</span>
                        <span className={styles.infoValue}>{formatDetailedDate(details.startDate)}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Время запуска</span>
                        <span className={styles.infoValue}>{details.speed}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Ошибки</span>
                        <span className={styles.infoValue}>{details.errorCount}</span>
                      </div>
                    </div>
                    <Tabs
                        items={[
                          { id: 'input', label: 'Вход' },
                          { id: 'output', label: 'Выход' }
                        ]}
                        activeTab={activeTab}
                        onTabChange={(tabId) => setActiveTab(tabId as 'input' | 'output')}
                    />

                    {details.errorMessage && (
                      <div className={styles.errorAlert}>
                        <div className={styles.errorAlertIcon}>
                          <DangerCircleIcon width={20} height={20} />
                        </div>
                        <div className={styles.errorAlertContent}>
                          <div className={styles.errorTextContainer}>
                            <p className={styles.errorText}>{details.errorMessage}</p>
                          </div>
                          <button 
                            className={styles.assistantButton}
                            onClick={() => {
                              if (onOpenAIAssistant) {
                                onOpenAIAssistant();
                              }
                            }}
                          >
                            <SparklesIcon width={20} height={20} />
                            <span>Спросить помощника</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className={styles.codeBlock}>
                      <div className={styles.codeLineNumbers}>
                        {Array.from({ length: details.lineCount }, (_, i) => i + 1).map((num) => (
                          <div key={num} className={styles.lineNumber}>{num}</div>
                        ))}
                      </div>
                      <div className={styles.codeContent}>
                        <div className={styles.codeText}>
                          {formatJsonWithColors(details.jsonData)}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        ) : (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>
                Журнал событий
              </h2>
              <button className={styles.closeButton} onClick={onClose}>
                <CloseIcon />
              </button>
            </div>

            {errorCount > 0 && (
              <div className={styles.errorMessage}>
                Найдена {errorCount} {errorCount === 1 ? 'ошибка' : 'ошибки'}
              </div>
            )}

            <div className={styles.serviceList}>
          {triggerNodes.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Нет триггеров на текущем поле</p>
            </div>
          ) : (
            triggerNodes.map((node, index) => {
            const speed = getTriggerSpeed(node);
            const color = getTriggerColor(node);
            const isError = node.data?.status === 'error';

            return (
              <div
                key={node.id}
                className={styles.serviceCard}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewTrigger(node.id);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
              >
                <div
                  className={styles.iconService}
                  style={{ backgroundColor: `${color}26` }}
                >
                </div>
                <div className={styles.statisticHeader}>
                  <div className={styles.statisticTitle}>
                    {node.data?.number || index + 1}. {node.data?.name || 'Название триггера'}
                  </div>
                  <div
                    className={styles.speedText}
                    style={{ color: isError ? '#E7000B' : '#2A9D90' }}
                  >
                    {speed}
                  </div>
                </div>
                <div
                  className={styles.menuContainer}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.menuButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuToggle(node.id);
                    }}
                  >
                    <DotsVerticalIcon size={16} />
                  </button>

                  {openMenuId === node.id && (
                    <div
                      ref={(el) => { if (el) menuRefs.current[node.id] = el; }}
                      className={styles.dropdownMenu}
                    >
                      <button
                        className={styles.menuItem}
                        onClick={() => handleMenuAction('view', node.id)}
                      >
                        Посмотреть
                      </button>
                      <button
                        className={styles.menuItem}
                        onClick={() => handleMenuAction('run', node.id)}
                      >
                        Запустить
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
          )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

