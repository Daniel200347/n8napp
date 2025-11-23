import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import ReactFlow, {
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import type { Edge, Connection, Node } from 'reactflow';
import 'reactflow/dist/style.css';

import { AutomationNode } from './AutomationNode';
import { TriggerNode } from './AddTriggerButton/TriggerNode';
import { TriggerSidebar } from './AddTriggerButton/TriggerSidebar';
import { TriggerDetailModal } from './AddTriggerButton/TriggerDetailModal';
import { TriggerConfirmationModal } from './AddTriggerButton/TriggerConfirmationModal';
import { TriggerCardNode } from './AddTriggerButton/TriggerCardNode';
import { ZoomControlsProvider } from './ZoomControlsProvider';
import { ProjectContainer } from './ProjectContainer';
import { BottomControls } from './BottomControls';
import { Notification } from '../ui/Notification';
import { AIAssistantModal } from './AIAssistantModal';
import { EventJournalModal } from './EventJournalModal/EventJournalModal';
import { VersionHistoryModal } from './VersionHistoryModal/VersionHistoryModal';
import type { VersionData } from './types/version';
import { createMockVersions } from './utils/mockVersions';

import styles from './Editor.module.css';
import {TopControls} from "@/components/Editor/TopControls/TopControls.tsx";
import { useTriggers } from './hooks/useTriggers';

const nodeTypes = {
  automation: AutomationNode,
  triggerNode: TriggerNode,
  triggerCardNode: TriggerCardNode,
};

const initialEdges: Edge[] = [];

const getCenterPosition = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const centerX = (viewportWidth - 165) / 2;
  const centerY = (viewportHeight - 120) / 2;
  return { x: centerX, y: centerY };
};

const normalizeNode = (node: Node): Node => {
  if (node.type === 'triggerCardNode' && node.data) {
    return {
      ...node,
      data: {
        ...node.data,
        serviceIcon: undefined
      }
    };
  }
  return node;
};

const deepClone = <T,>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const Editor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanMode, setIsPanMode] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [zoomFunctions, setZoomFunctions] = useState<{
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleZoomReset: () => void;
  } | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [isExecuteLoading, setIsExecuteLoading] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isEventJournalOpen, setIsEventJournalOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [viewingVersion, setViewingVersion] = useState<VersionData | null>(null);
  const [originalNodes, setOriginalNodes] = useState<Node[]>([]);
  const [originalEdges, setOriginalEdges] = useState<Edge[]>([]);
  const [versions, setVersions] = useState<VersionData[]>(() => createMockVersions([], []));
  const [currentProjectName, setCurrentProjectName] = useState<string>('');
  const [canPublish, setCanPublish] = useState(false);
  const publishedNodesRef = useRef<string>('');

  const triggers = useTriggers({
    nodes,
    setNodes,
    setEdges,
    isViewMode,
  });

  const normalizedNodesRef = useRef<string>('');

  useEffect(() => {
    const normalizedNodes = nodes.map(normalizeNode);
    const nodesStr = JSON.stringify(normalizedNodes);
    
    if (normalizedNodesRef.current !== nodesStr) {
      normalizedNodesRef.current = nodesStr;
    if (publishedNodesRef.current && publishedNodesRef.current !== nodesStr) {
      setCanPublish(false);
    }
    }
  }, [nodes]);

  useEffect(() => {
    if (versions.length > 0 && !currentProjectName) {
      const currentVersion = versions.find(v => v.isCurrent);
      if (currentVersion?.name) {
        setCurrentProjectName(currentVersion.name);
      }
    }
  }, [versions.length, currentProjectName]);

  const handleProjectNameChange = useCallback((newName: string) => {
    setCurrentProjectName(newName);
    
    setVersions(prevVersions => {
      return prevVersions.map(v => {
        if (v.isCurrent) {
          return {
            ...v,
            name: newName || 'Автоматизация без названия'
          };
        }
        return v;
      });
    });
  }, []);

  const handleZoomFunctionsReady = useCallback((functions: {
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleZoomReset: () => void;
  }) => {
    setZoomFunctions(functions);
  }, []);

  const handleExecuteScenario = useCallback(() => {
    const triggerNodes = nodes.filter(node => node.type === 'triggerCardNode');
    if (triggerNodes.length === 0) {
      return;
    }

    setIsExecuteLoading(true);

    setTimeout(() => {
      const hasErrorTriggers = triggerNodes.some(node => node.data?.status === 'error');
      setIsExecuteLoading(false);

      if (hasErrorTriggers) {
        setNotificationType('error');
        setNotificationTitle('Инициализация сценария завершилась с ошибкой.');
        setShowNotification(true);
        setCanPublish(false);
      } else {
        setNotificationType('success');
        setNotificationTitle('Инициализация сценария выполнена успешно.');
        setShowNotification(true);
        setCanPublish(true);
        const normalizedNodes = nodes.map(normalizeNode);
        publishedNodesRef.current = JSON.stringify(normalizedNodes);
      }
    }, 2000);
  }, [nodes]);

  const closeAllModals = useCallback(() => {
    triggers.setIsSidebarOpen(false);
    triggers.setIsDetailModalOpen(false);
    triggers.setIsConfirmationModalOpen(false);
    triggers.setIsEditModalOpen(false);
  }, [triggers]);

  const handleAIAssistant = useCallback(() => {
    closeAllModals();
    setIsEventJournalOpen(false);
    setIsAIAssistantOpen(true);
  }, [closeAllModals]);

  const handleCloseAIAssistant = useCallback(() => {
    setIsAIAssistantOpen(false);
  }, []);

  const handleEventJournal = useCallback(() => {
    closeAllModals();
    setIsAIAssistantOpen(false);
    setIsEventJournalOpen(true);
  }, [closeAllModals]);

  const handleCloseEventJournal = useCallback(() => {
    setIsEventJournalOpen(false);
  }, []);

  const handleVersionHistory = useCallback(() => {
    closeAllModals();
    setIsAIAssistantOpen(false);
    setIsEventJournalOpen(false);
    setIsVersionHistoryOpen(true);
  }, [closeAllModals]);

  const handleCloseVersionHistory = useCallback(() => {
    setIsVersionHistoryOpen(false);
  }, []);

  const handleCloseNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    setEdges((eds) => {
      const nodeIds = new Set(nodes.map(n => n.id));
      const validEdges = eds.filter(
        edge => nodeIds.has(edge.source) && nodeIds.has(edge.target)
      );

      const edgeMap = new Map<string, Edge>();
      for (const edge of validEdges) {
        const key = `${edge.source}-${edge.target}`;
        if (!edgeMap.has(key)) {
          edgeMap.set(key, edge);
        }
      }

      const uniqueEdges = Array.from(edgeMap.values());

      if (validEdges.length !== uniqueEdges.length || eds.length !== uniqueEdges.length) {
        return uniqueEdges;
      }

      return eds;
    });
  }, [nodes, setEdges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => {
        const existingEdge = eds.find(
          edge => edge.source === params.source && edge.target === params.target
        );

        if (existingEdge) {
          return eds;
        }

        return addEdge(params, eds);
      });
    },
    [setEdges]
  );

  const isInitializedRef = useRef(false);

  useEffect(() => {
      if (isInitializedRef.current) return;

      const centerPos = getCenterPosition();
      const addTriggerNode: Node = {
        id: 'add-trigger',
        type: 'triggerNode',
        position: centerPos,
        data: {
          type: 'add-trigger',
          onAddTrigger: triggers.handleAddTrigger,
          isViewMode: false,
        },
      };

      setNodes([addTriggerNode]);
      if (versions.length === 0 || !versions.some(v => v.isCurrent)) {
        const initialVersions = createMockVersions([addTriggerNode], []);
        setVersions(initialVersions);
        const currentVersion = initialVersions.find(v => v.isCurrent);
        if (currentVersion?.name) {
          setCurrentProjectName(currentVersion.name);
        }
      }

      isInitializedRef.current = true;
    }, [triggers.handleAddTrigger, setNodes, versions.length]);

  const normalizeNodeForStorage = useCallback((node: Node): Node => {
    if (node.type === 'triggerCardNode' && node.data) {
      const iconColor = (node.data as any).iconColor ||
                       (node.data.serviceName ? triggers.getIconColorByServiceName(node.data.serviceName) : '#155DFC');
      return {
        ...node,
        data: {
          ...node.data,
          serviceIcon: undefined,
          iconColor: iconColor,
        }
      };
    }
    return node;
  }, [triggers]);

  const restoreNodeFromStorage = useCallback((node: Node): Node => {
    if (node.type === 'triggerCardNode' && node.data) {
      const iconColor = (node.data as any).iconColor ||
                       (node.data.serviceName ? triggers.getIconColorByServiceName(node.data.serviceName) : '#155DFC');
      return {
        ...node,
        data: {
          ...node.data,
          serviceIcon: triggers.restoreServiceIcon(iconColor),
          onEdit: () => triggers.handleEditTrigger(node.data.id || node.id),
          onDelete: () => triggers.handleDeleteTrigger(node.data.id || node.id),
          onRun: () => {},
          onDuplicate: () => triggers.handleDuplicateTrigger(node.data.id || node.id),
          onToggle: () => triggers.handleToggleTrigger(node.data.id || node.id),
          onAddTrigger: () => triggers.handleAddTrigger(node.data.id || node.id),
          isViewMode: false,
        }
      };
    }
    if (node.type === 'triggerNode' && node.data) {
      return {
        ...node,
        data: {
          ...node.data,
          isViewMode: false,
        }
      };
    }
    return node;
  }, [triggers]);

  const handleExitViewMode = useCallback(() => {
    if (originalNodes.length > 0 || originalEdges.length > 0) {
      const restoredNodes = originalNodes.map(restoreNodeFromStorage);
      setNodes(restoredNodes);
      setEdges(originalEdges);
    } else {
      const centerPos = getCenterPosition();
      const addTriggerNode: Node = {
        id: 'add-trigger',
        type: 'triggerNode',
        position: centerPos,
        data: {
          type: 'add-trigger',
          onAddTrigger: () => {
            triggers.setSelectedTriggerSource(undefined);
            triggers.setIsSidebarOpen(true);
          },
          isViewMode: false,
        },
      };
      setNodes([addTriggerNode]);
      setEdges([]);
    }

    setIsViewMode(false);
    setViewingVersion(null);
    setOriginalNodes([]);
    setOriginalEdges([]);
  }, [originalNodes, originalEdges, restoreNodeFromStorage, setNodes, setEdges, triggers]);

  const prepareNodeForView = useCallback((node: Node, isView: boolean): Node => {
      if (node.type === 'triggerCardNode' && node.data) {
        let serviceIcon = node.data.serviceIcon;
        if (!serviceIcon) {
          const iconColor = (node.data as any).iconColor || triggers.getIconColorByServiceName(node.data.serviceName || '');
          serviceIcon = triggers.restoreServiceIcon(iconColor);
        }

        return {
          ...node,
          data: {
            ...node.data,
            serviceIcon: serviceIcon,
          onEdit: isView ? undefined : () => triggers.handleEditTrigger(node.data.id || node.id),
          onDelete: isView ? undefined : () => triggers.handleDeleteTrigger(node.data.id || node.id),
          onRun: isView ? undefined : () => {},
          onDuplicate: isView ? undefined : () => triggers.handleDuplicateTrigger(node.data.id || node.id),
          onToggle: isView ? undefined : () => triggers.handleToggleTrigger(node.data.id || node.id),
          onAddTrigger: isView ? undefined : () => triggers.handleAddTrigger(node.data.id || node.id),
          isViewMode: isView,
          }
        };
      }
      if (node.type === 'triggerNode' && node.data) {
        return {
          ...node,
          data: {
            ...node.data,
          isViewMode: isView,
          }
        };
      }
      return node;
  }, [triggers]);

  const handleViewVersion = useCallback((version: VersionData) => {
    if (version.isCurrent && !isViewMode) {
      setIsVersionHistoryOpen(false);
      return;
    }
    if (version.isCurrent && isViewMode) {
      handleExitViewMode();
      setIsVersionHistoryOpen(false);
      return;
    }

    if (!isViewMode) {
      const normalizedNodes = nodes.map(normalizeNodeForStorage);
      setOriginalNodes(deepClone(normalizedNodes));
      setOriginalEdges(deepClone(edges));
    }

    const preparedNodes = version.nodes.map(node => prepareNodeForView(node, true));
    setNodes(preparedNodes);
    setEdges(version.edges);
    setViewingVersion(version);
    setIsViewMode(true);
    setIsVersionHistoryOpen(false);
  }, [nodes, edges, isViewMode, handleExitViewMode, triggers, normalizeNodeForStorage, prepareNodeForView, setNodes]);

  const getNextVersionNumber = useCallback((versions: VersionData[]): number => {
    if (versions.length === 0) return 1;
    return Math.max(...versions.map(v => v.versionNumber || 0)) + 1;
  }, []);

  const handlePublish = useCallback(() => {
    if (!canPublish) return;

    const normalizedNodes = nodes.map(normalizeNodeForStorage);
    const newVersion: VersionData = {
      id: `published-${Date.now()}`,
      publishedAt: new Date(),
      publishedBy: 'ADMIN',
      versionNumber: getNextVersionNumber(versions),
      name: currentProjectName || 'Автоматизация без названия',
      isCurrent: true,
      nodes: deepClone(normalizedNodes),
      edges: deepClone(edges)
    };

    setVersions(prevVersions => {
      const updatedVersions = prevVersions.map(v => ({
        ...v,
        isCurrent: false
      }));
      return [newVersion, ...updatedVersions];
    });

    publishedNodesRef.current = JSON.stringify(normalizedNodes);
    setCanPublish(false);

    setNotificationType('success');
    setNotificationTitle('Версия успешно опубликована');
    setShowNotification(true);
  }, [canPublish, nodes, edges, currentProjectName, versions, normalizeNodeForStorage, getNextVersionNumber]);

  const handleDuplicateVersion = useCallback((version: VersionData) => {
    const duplicatedVersion: VersionData = {
      ...version,
      id: `duplicate-${Date.now()}`,
      publishedAt: new Date(),
      publishedBy: 'Дублированная версия',
      versionNumber: version.versionNumber,
      name: version.name || 'Автоматизация без названия',
      isCurrent: false,
      nodes: deepClone(version.nodes),
      edges: deepClone(version.edges)
    };

    const duplicatedAutomations = JSON.parse(localStorage.getItem('duplicatedAutomations') || '[]');
    duplicatedAutomations.push({
      id: duplicatedVersion.id,
      name: duplicatedVersion.name || 'Автоматизация без названия',
      lastRun: 'Никогда',
      status: 'disabled',
      isActive: false,
      isDuplicated: true,
      versionData: duplicatedVersion
    });
    localStorage.setItem('duplicatedAutomations', JSON.stringify(duplicatedAutomations));

    setNotificationType('success');
    setNotificationTitle('Версия успешно продублирована и добавлена в таблицу автоматизаций');
    setShowNotification(true);
  }, []);

  const handleUseVersion = useCallback((version: VersionData) => {
    const currentStateNodes = nodes.filter(node => node.type === 'triggerCardNode' || node.type === 'triggerNode');
    if (currentStateNodes.length > 0 || edges.length > 0) {
      const normalizedCurrentNodes = nodes.map(normalizeNodeForStorage);
      const currentVersionData: VersionData = {
        id: `current-${Date.now()}`,
        publishedAt: new Date(),
        publishedBy: 'ADMIN',
        versionNumber: getNextVersionNumber(versions),
        name: currentProjectName || 'Автоматизация без названия',
        isCurrent: false,
        nodes: deepClone(normalizedCurrentNodes),
        edges: deepClone(edges)
      };

      setVersions(prevVersions => {
        const updatedVersions = prevVersions.map(v => ({
          ...v,
          isCurrent: false
        }));

        const newVersions = [currentVersionData, ...updatedVersions];

        return newVersions.map(v =>
          v.id === version.id ? { ...v, isCurrent: true } : v
        );
      });
    } else {
      setVersions(prevVersions =>
        prevVersions.map(v => ({
          ...v,
          isCurrent: v.id === version.id
        }))
      );
    }

    const preparedNodes = version.nodes.map(node => prepareNodeForView(node, false));
    setNodes(preparedNodes);
    setEdges(version.edges);

    if (version.name) {
      setCurrentProjectName(version.name);
    }

    setIsViewMode(false);
    setViewingVersion(null);
    setOriginalNodes([]);
    setOriginalEdges([]);

    setNotificationType('success');
    setNotificationTitle('Версия применена и доступна для редактирования');
    setShowNotification(true);
  }, [nodes, edges, versions, currentProjectName, normalizeNodeForStorage, triggers, setNodes, setEdges, getNextVersionNumber, prepareNodeForView]);

  const handleZoomIn = useCallback(() => {
    zoomFunctions?.handleZoomIn();
  }, [zoomFunctions]);

  const handleZoomOut = useCallback(() => {
    zoomFunctions?.handleZoomOut();
  }, [zoomFunctions]);

  const handleZoomReset = useCallback(() => {
    zoomFunctions?.handleZoomReset();
  }, [zoomFunctions]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        (activeElement as HTMLElement).contentEditable === 'true'
      );

      if (isInputFocused) return;

      switch (event.key) {
        case ' ':
        case 'Space':
          event.preventDefault();
          if (!isPanMode) {
            setIsPanMode(true);
            setIsSpacePressed(true);
          }
          break;

        case '-':
        case '_':
          event.preventDefault();
          handleZoomOut();
          break;

        case '=':
        case '+':
          event.preventDefault();
          handleZoomIn();
          break;

        case '0':
          event.preventDefault();
          handleZoomReset();
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        if (isPanMode) {
          setIsPanMode(false);
          setIsSpacePressed(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPanMode, handleZoomIn, handleZoomOut, handleZoomReset]);

  const triggerNodes = useMemo(() => 
    nodes.filter(node => node.type === 'triggerCardNode'),
    [nodes]
  );

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  const editorClassName = useMemo(() => {
    return `${styles.editor} ${isAIAssistantOpen ? styles.aiAssistantOpen : ''} ${isEventJournalOpen ? styles.eventJournalOpen : ''} ${isVersionHistoryOpen ? styles.versionHistoryOpen : ''} ${triggers.isSidebarOpen ? styles.sidebarOpen : ''} ${triggers.isDetailModalOpen ? styles.sidebarOpen : ''} ${triggers.isConfirmationModalOpen ? styles.sidebarOpen : ''} ${triggers.isEditModalOpen ? styles.sidebarOpen : ''}`;
  }, [isAIAssistantOpen, isEventJournalOpen, isVersionHistoryOpen, triggers.isSidebarOpen, triggers.isDetailModalOpen, triggers.isConfirmationModalOpen, triggers.isEditModalOpen]);

  const hasTriggerNodes = useMemo(() => 
    nodes.some(node => node.type === 'triggerCardNode'),
    [nodes]
  );

  return (
    <div className={editorClassName}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={memoizedNodeTypes}
        defaultEdgeOptions={{ type: 'bezier' }}
        fitView={false}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        className={`${styles.flow} ${(isPanMode || isSpacePressed) ? styles.panMode : ''}`}
        data-pan-mode={isPanMode || isSpacePressed}
        panOnDrag={isPanMode || isSpacePressed}
        panOnScroll={false}
        selectionOnDrag={false}
        nodesDraggable={!isViewMode && !(isPanMode || isSpacePressed)}
        nodesConnectable={!isViewMode}
        elementsSelectable={true}
      >
        <BottomControls
          onExecuteScenario={handleExecuteScenario}
          isExecuteDisabled={!hasTriggerNodes}
          isExecuteLoading={isExecuteLoading}
          onZoomIn={zoomFunctions?.handleZoomIn || (() => {})}
          onZoomOut={zoomFunctions?.handleZoomOut || (() => {})}
          onZoomReset={zoomFunctions?.handleZoomReset || (() => {})}
          onAIAssistant={handleAIAssistant}
          isViewMode={isViewMode}
        />

        <ZoomControlsProvider
          onTogglePanMode={() => {}}
          isPanMode={false}
          isSpacePressed={false}
          onZoomFunctionsReady={handleZoomFunctionsReady}
        />

        <TopControls
          onEventJournal={isViewMode ? undefined : handleEventJournal}
          onVersionHistory={handleVersionHistory}
          viewingVersion={viewingVersion}
          onDuplicateVersion={handleDuplicateVersion}
          onUseVersion={handleUseVersion}
          onExitViewMode={isViewMode ? handleExitViewMode : undefined}
          onPublish={handlePublish}
          canPublish={canPublish}
        />

        <ProjectContainer 
          viewingVersion={viewingVersion}
          projectName={currentProjectName}
          onProjectNameChange={handleProjectNameChange}
        />
      </ReactFlow>

      <TriggerSidebar
        isOpen={triggers.isSidebarOpen}
        onClose={triggers.handleCloseSidebar}
        onServiceSelect={triggers.handleServiceSelect}
      />

      {triggers.selectedService && (
        <TriggerDetailModal
          isOpen={triggers.isDetailModalOpen}
          serviceName={triggers.selectedService.name}
          serviceIconColor={triggers.selectedService.iconColor}
          triggerCount={triggers.selectedService.triggerCount}
          onClose={triggers.handleCloseDetailModal}
          onBack={triggers.handleBackToServices}
          onTriggerSelect={(trigger) => {
            triggers.setSelectedTrigger(trigger);
            triggers.setIsConfirmationModalOpen(true);
            triggers.setIsDetailModalOpen(false);
          }}
          onCloseAll={triggers.handleCloseDetailModal}
        />
      )}

      {triggers.selectedTrigger && (
        <TriggerConfirmationModal
          isOpen={triggers.isConfirmationModalOpen}
          onClose={triggers.handleCreateTrigger}
          triggerName={triggers.selectedTrigger.name}
          serviceName={triggers.selectedTrigger.serviceName}
          serviceIcon={triggers.selectedTrigger.icon}
          onConfirm={triggers.handleConfirmTrigger}
          onFieldChange={triggers.handleFormValidationChange}
        />
      )}

      {triggers.editingTrigger && (
        <TriggerConfirmationModal
          isOpen={triggers.isEditModalOpen}
          onClose={triggers.handleCloseEditModal}
          triggerName={triggers.editingTrigger.name}
          serviceName={triggers.editingTrigger.serviceName}
          serviceIcon={triggers.editingTrigger.serviceIcon}
          onConfirm={triggers.handleSaveEditedTrigger}
          onFieldChange={triggers.handleFormValidationChange}
          initialFormData={triggers.editingTrigger.formData}
          isOtherModalOpen={isEventJournalOpen}
          onAutoSave={triggers.handleAutoSaveTrigger}
          isViewMode={isViewMode}
        />
      )}

      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={handleCloseAIAssistant}
      />

      <EventJournalModal
        isOpen={isEventJournalOpen}
        onClose={handleCloseEventJournal}
        triggerNodes={triggerNodes}
        onOpenEditTrigger={triggers.handleEditTrigger}
        isOtherModalOpen={triggers.isEditModalOpen}
        onOpenAIAssistant={handleAIAssistant}
      />
      <VersionHistoryModal
        isOpen={isVersionHistoryOpen}
        onClose={handleCloseVersionHistory}
        onViewVersion={handleViewVersion}
        onDuplicateVersion={handleDuplicateVersion}
        onUseVersion={handleUseVersion}
        currentNodes={nodes}
        currentEdges={edges}
        versions={versions}
        onVersionsChange={setVersions}
      />

      <Notification
        type={notificationType}
        title={notificationTitle}
        onClose={handleCloseNotification}
        isVisible={showNotification}
      />
    </div>
  );
};
