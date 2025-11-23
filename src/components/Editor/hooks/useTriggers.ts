import { useCallback, useState, useRef } from 'react';
import type { Node, Edge } from 'reactflow';
import React from 'react';

const getCenterPosition = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const centerX = (viewportWidth - 165) / 2;
  const centerY = (viewportHeight - 120) / 2;
  return { x: centerX, y: centerY };
};

const getIconColorByServiceName = (serviceName: string): string => {
  const colorMap: Record<string, string> = {
    'Webhook': '#155DFC',
    'HTTP': '#2A9D90',
    'Email': '#F59E0B',
    'AI': '#8B5CF6',
    'Google Drive': '#2A9D90',
    'Gmail': '#E76E50',
    'Slack': '#CA6CD3',
    'Trello': '#F4A462',
  };
  return colorMap[serviceName] || '#155DFC';
};

const restoreServiceIcon = (iconColor: string) => {
  return React.createElement('div', {
    style: {
      width: '36px',
      height: '36px',
      backgroundColor: iconColor,
      borderRadius: '8px'
    }
  });
};

export interface UseTriggersProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  isViewMode: boolean;
}

export interface UseTriggersReturn {
  isSidebarOpen: boolean;
  selectedTrigger: { name: string; serviceName: string; icon: React.ReactNode; formData?: any } | null;
  isConfirmationModalOpen: boolean;
  isDetailModalOpen: boolean;
  isEditModalOpen: boolean;
  editingTrigger: { id: string; name: string; serviceName: string; serviceIcon: React.ReactNode; formData?: any } | null;
  selectedService: { name: string; iconColor: string; triggerCount: number } | null;
  selectedTriggerSource: string | undefined;
  
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTrigger: React.Dispatch<React.SetStateAction<{ name: string; serviceName: string; icon: React.ReactNode; formData?: any } | null>>;
  setIsConfirmationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingTrigger: React.Dispatch<React.SetStateAction<{ id: string; name: string; serviceName: string; serviceIcon: React.ReactNode; formData?: any } | null>>;
  setSelectedService: React.Dispatch<React.SetStateAction<{ name: string; iconColor: string; triggerCount: number } | null>>;
  setSelectedTriggerSource: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  
  handleDeleteTrigger: (triggerId: string) => void;
  handleToggleTrigger: (triggerId: string) => void;
  handleDuplicateTrigger: (triggerId: string) => void;
  handleAddTrigger: (sourceTriggerId?: string) => void;
  handleCreateNewTrigger: (sourceTriggerId?: string, formData?: any) => void;
  handleCloseSidebar: () => void;
  handleServiceSelect: (service: { name: string; iconColor: string; triggerCount: number }) => void;
  handleBackToServices: () => void;
  handleCloseDetailModal: () => void;
  handleFormValidationChange: (isValid: boolean) => void;
  handleUpdateTrigger: (trigger: { name: string; serviceName: string; serviceIcon: React.ReactNode; formData?: any }, targetTriggerId?: string) => void;
  handleCreateTrigger: () => void;
  handleConfirmTrigger: (formData: any) => void;
  handleSaveEditedTrigger: (formData: any) => void;
  handleAutoSaveTrigger: (formData: any) => void;
  handleCloseEditModal: () => void;
  handleEditTrigger: (triggerId: string) => void;
  restoreServiceIcon: (iconColor: string) => React.ReactElement;
  getIconColorByServiceName: (serviceName: string) => string;
}

export const useTriggers = ({
  nodes,
  setNodes,
  setEdges,
  isViewMode,
}: UseTriggersProps): UseTriggersReturn => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<{ name: string; serviceName: string; icon: React.ReactNode; formData?: any } | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTrigger, setEditingTrigger] = useState<{ id: string; name: string; serviceName: string; serviceIcon: React.ReactNode; formData?: any } | null>(null);
  const [selectedService, setSelectedService] = useState<{ name: string; iconColor: string; triggerCount: number } | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedTriggerSource, setSelectedTriggerSource] = useState<string | undefined>(undefined);
  const autoSaveTriggerRef = useRef<{ triggerId: string; formData: string } | null>(null);
  
  const handlersRef = useRef<{
    handleEditTrigger?: (triggerId: string) => void;
    handleDeleteTrigger?: (triggerId: string) => void;
    handleToggleTrigger?: (triggerId: string) => void;
    handleDuplicateTrigger?: (triggerId: string) => void;
    handleAddTrigger?: (sourceTriggerId?: string) => void;
  }>({});

  const handleEditTrigger = useCallback((triggerId: string) => {
    setNodes((currentNodes) => {
      const triggerNode = currentNodes.find(node =>
        node.type === 'triggerCardNode' && node.data?.id === triggerId
      );

      if (triggerNode && triggerNode.data) {
        setEditingTrigger({
          id: triggerId,
          name: triggerNode.data.name,
          serviceName: triggerNode.data.serviceName,
          serviceIcon: triggerNode.data.serviceIcon,
          formData: triggerNode.data.formData
        });
        setIsEditModalOpen(true);
      }

      return currentNodes;
    });
  }, [setNodes]);
  
  const handleAddTrigger = useCallback((sourceTriggerId?: string) => {
    setSelectedTriggerSource(sourceTriggerId);
    setIsSidebarOpen(true);
  }, []);

  const handleDeleteTrigger = useCallback((triggerId: string) => {
    setNodes((nds) => {
      const filteredNodes = nds.filter((node) => node.id !== triggerId);
      const remainingTriggers = filteredNodes.filter(node => node.type === 'triggerCardNode');

      if (remainingTriggers.length === 0) {
        const centerPos = getCenterPosition();
        const addTriggerNode: Node = {
          id: 'add-trigger',
          type: 'triggerNode',
          position: centerPos,
          data: {
            type: 'add-trigger',
            onAddTrigger: () => {
              setSelectedTriggerSource(undefined);
              setIsSidebarOpen(true);
            },
            isViewMode: false,
          },
        };
        return [addTriggerNode];
      }

      const sortedTriggers = filteredNodes
        .filter(n => n.type === 'triggerCardNode')
        .sort((a, b) => a.position.y - b.position.y);

      const triggerIndexMap = new Map(sortedTriggers.map((n, idx) => [n.id, idx + 1]));

      return filteredNodes.map(node => {
        if (node.type === 'triggerCardNode') {
          const chainNumber = triggerIndexMap.get(node.id) || 1;
          return {
            ...node,
            data: {
              ...node.data,
              number: chainNumber
            }
          };
        }
        return node;
      });
    });

    setEdges((eds) => {
      return eds.filter(edge => edge.source !== triggerId && edge.target !== triggerId);
    });
  }, [setNodes, setEdges]);

  const handleToggleTrigger = useCallback((triggerId: string) => {
    setNodes((nds) => {
      return nds.map(node => {
        if (node.id === triggerId && node.type === 'triggerCardNode') {
          const newStatus = node.data.status === 'disabled' ? 'default' : 'disabled';
          return {
            ...node,
            data: {
              ...node.data,
              status: newStatus
            }
          };
        }
        return node;
      });
    });
  }, [setNodes]);

  const handleDuplicateTrigger = useCallback((triggerId: string) => {
    setNodes((nds) => {
      const originalTrigger = nds.find(node => node.id === triggerId);
      if (!originalTrigger || !originalTrigger.data) return nds;

      const newTriggerId = `trigger-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const originalName = originalTrigger.data.name || '';
      const originalFormData = originalTrigger.data.formData || {
        name: '',
        description: '',
        option: '',
        notes: '',
        password: '',
        skipOnError: false,
        notifyMe: false
      };
      
      const copiedFormData = { ...originalFormData };
      
      const duplicatedTrigger: Node = {
        id: newTriggerId,
        type: 'triggerCardNode',
        position: {
          x: originalTrigger.position.x,
          y: originalTrigger.position.y + 250
        },
        data: {
          id: newTriggerId,
          name: originalName.includes('(копия)') ? originalName : `${originalName} (копия)`,
          serviceName: originalTrigger.data.serviceName || '',
          serviceIcon: originalTrigger.data.serviceIcon,
          status: originalTrigger.data.status || 'default',
          number: originalTrigger.data.number,
          formData: copiedFormData,
          onEdit: () => handlersRef.current.handleEditTrigger?.(newTriggerId),
          onDelete: () => handlersRef.current.handleDeleteTrigger?.(newTriggerId),
          onRun: () => {},
          onDuplicate: () => handlersRef.current.handleDuplicateTrigger?.(newTriggerId),
          onToggle: () => handlersRef.current.handleToggleTrigger?.(newTriggerId),
          onAddTrigger: () => handlersRef.current.handleAddTrigger?.(newTriggerId)
        },
      };

      const updatedNodes = [...nds, duplicatedTrigger];
      const sortedTriggers = updatedNodes
        .filter(n => n.type === 'triggerCardNode')
        .sort((a, b) => a.position.y - b.position.y);

      const triggerIndexMap = new Map(sortedTriggers.map((n, idx) => [n.id, idx + 1]));

      return updatedNodes.map(node => {
        if (node.type === 'triggerCardNode') {
          const chainNumber = triggerIndexMap.get(node.id) || 1;
          return {
            ...node,
            data: {
              ...node.data,
              number: chainNumber
            }
          };
        }
        return node;
      });
    });
  }, [setNodes]);

  const handleCreateNewTrigger = useCallback((sourceTriggerId?: string, formData?: any) => {
    if (!selectedTrigger) return;

    setNodes((nds) => {
      const triggerNodes = nds.filter(node => node.type === 'triggerCardNode');

      if (triggerNodes.length === 0) {
        return nds;
      }

      let sourceTrigger;
      if (sourceTriggerId) {
        sourceTrigger = triggerNodes.find(node => node.id === sourceTriggerId);
      }

      if (!sourceTrigger) {
        sourceTrigger = triggerNodes.reduce((bottom, current) => {
          return current.position.y > bottom.position.y ? current : bottom;
        });
      }

      const newTriggerId = `trigger-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newTriggerNode: Node = {
        id: newTriggerId,
        type: 'triggerCardNode',
        position: {
          x: sourceTrigger.position.x,
          y: sourceTrigger.position.y + 230
        },
        data: {
          id: newTriggerId,
          name: selectedTrigger.name,
          serviceName: selectedTrigger.serviceName,
          serviceIcon: selectedTrigger.icon,
          status: isFormValid ? 'default' : 'error',
          number: triggerNodes.length + 1,
          formData: formData,
          onEdit: () => handlersRef.current.handleEditTrigger?.(newTriggerId),
          onDelete: () => handlersRef.current.handleDeleteTrigger?.(newTriggerId),
          onRun: () => {},
          onDuplicate: () => handlersRef.current.handleDuplicateTrigger?.(newTriggerId),
          onToggle: () => handlersRef.current.handleToggleTrigger?.(newTriggerId),
          onAddTrigger: () => handlersRef.current.handleAddTrigger?.(newTriggerId)
        },
      };

      const edgeId = `edge-${sourceTrigger.id}-${newTriggerId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newEdge: Edge = {
        id: edgeId,
        source: sourceTrigger.id,
        target: newTriggerId,
        type: 'bezier',
        animated: false,
        style: { stroke: '#E2E8F0', strokeWidth: 2 }
      };

      const updatedNodes = [...nds, newTriggerNode];
      const sortedTriggers = updatedNodes
        .filter(n => n.type === 'triggerCardNode')
        .sort((a, b) => a.position.y - b.position.y);

      const triggerIndexMap = new Map(sortedTriggers.map((n, idx) => [n.id, idx + 1]));

      const updatedNodesWithNumbers = updatedNodes.map(node => {
        if (node.type === 'triggerCardNode') {
          const chainNumber = triggerIndexMap.get(node.id) || 1;
          return {
            ...node,
            data: {
              ...node.data,
              number: chainNumber
            }
          };
        }
        return node;
      });

      setEdges((eds) => {
        const existingEdge = eds.find(
          edge => edge.source === sourceTrigger.id && edge.target === newTriggerId
        );

        const existingEdgeById = eds.find(edge => edge.id === edgeId);

        if (existingEdge || existingEdgeById) {
          return eds;
        }

        return [...eds, newEdge];
      });

      return updatedNodesWithNumbers;
    });
  }, [selectedTrigger, isFormValid, setNodes, setEdges]);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleServiceSelect = useCallback((service: { name: string; iconColor: string; triggerCount: number }) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
    setIsSidebarOpen(false);
  }, []);

  const handleBackToServices = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedService(null);
    setIsSidebarOpen(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedService(null);
  }, []);

  const handleFormValidationChange = useCallback((isValid: boolean) => {
    setIsFormValid(isValid);
  }, []);

  const handleUpdateTrigger = useCallback((trigger: { name: string; serviceName: string; serviceIcon: React.ReactNode; formData?: any }, targetTriggerId?: string) => {
    setNodes((nds) => {
      if (targetTriggerId) {
        return nds.map(node => {
          if (node.id === targetTriggerId && node.type === 'triggerCardNode') {
            return {
              ...node,
              data: {
                ...node.data,
                name: trigger.name,
                serviceName: trigger.serviceName,
                serviceIcon: trigger.serviceIcon,
                status: isFormValid ? 'default' : 'error',
                formData: trigger.formData
              }
            };
          }
          return node;
        });
      }

      const addTriggerNode = nds.find(node => node.id === 'add-trigger' || node.id.startsWith('add-trigger-'));

      if (addTriggerNode) {
        const newTriggerId = `trigger-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const triggerCardNode: Node = {
          id: newTriggerId,
          type: 'triggerCardNode',
          position: {
            x: addTriggerNode.position.x - 90,
            y: addTriggerNode.position.y
          },
          data: {
            id: newTriggerId,
            name: trigger.name,
            serviceName: trigger.serviceName,
            serviceIcon: trigger.serviceIcon,
            status: isFormValid ? 'default' : 'error',
            number: 1,
            formData: trigger.formData,
            onEdit: () => handlersRef.current.handleEditTrigger?.(triggerCardNode.id),
            onDelete: () => handlersRef.current.handleDeleteTrigger?.(triggerCardNode.id),
            onRun: () => {},
            onDuplicate: () => handlersRef.current.handleDuplicateTrigger?.(triggerCardNode.id),
            onToggle: () => handlersRef.current.handleToggleTrigger?.(triggerCardNode.id),
            onAddTrigger: () => handlersRef.current.handleAddTrigger?.(newTriggerId),
          },
        };

        const filteredNodes = nds.filter(node => node.id !== addTriggerNode.id);

        return [...filteredNodes, triggerCardNode];
      }

      return nds;
    });
  }, [isFormValid, setNodes]);

  const handleCreateTrigger = useCallback(() => {
    setIsConfirmationModalOpen(false);
    setSelectedTrigger(null);
  }, []);

  const handleConfirmTrigger = useCallback((formData: any) => {
    if (selectedTrigger) {
      const newTrigger = {
        id: Date.now().toString(),
        name: selectedTrigger.name,
        serviceName: selectedTrigger.serviceName,
        serviceIcon: selectedTrigger.icon,
        status: isFormValid ? 'default' : 'error',
        formData
      };

      if (selectedTriggerSource) {
        handleCreateNewTrigger(selectedTriggerSource, formData);
        setSelectedTriggerSource(undefined);
      } else {
        handleUpdateTrigger(newTrigger);
      }
    }

    setIsConfirmationModalOpen(false);
    setSelectedTrigger(null);
  }, [selectedTrigger, isFormValid, selectedTriggerSource, handleUpdateTrigger, handleCreateNewTrigger, setSelectedTriggerSource]);

  const handleSaveEditedTrigger = useCallback((formData: any) => {
    if (isViewMode) {
      setIsEditModalOpen(false);
      setEditingTrigger(null);
      return;
    }
    
    if (editingTrigger) {
      const updatedTrigger = {
        name: editingTrigger.name,
        serviceName: editingTrigger.serviceName,
        serviceIcon: editingTrigger.serviceIcon,
        formData: formData
      };
      handleUpdateTrigger(updatedTrigger, editingTrigger.id);
    }
    setIsEditModalOpen(false);
    setEditingTrigger(null);
  }, [editingTrigger, handleUpdateTrigger, isViewMode]);

  const handleAutoSaveTrigger = useCallback((formData: any) => {
    if (!editingTrigger) return;

    const isValid = formData.name?.trim() !== '' &&
                   formData.option?.trim() !== '' &&
                   formData.notes?.trim() !== '' &&
                   formData.password?.trim() !== '';

    const newFormDataStr = JSON.stringify(formData);
    const triggerId = editingTrigger.id;

    if (autoSaveTriggerRef.current && 
        autoSaveTriggerRef.current.triggerId === triggerId && 
        autoSaveTriggerRef.current.formData === newFormDataStr) {
      return;
    }

    autoSaveTriggerRef.current = { triggerId, formData: newFormDataStr };

    setNodes((currentNodes) => {
      let hasChanges = false;
      
      const updatedNodes = currentNodes.map(node => {
        const isTargetNode = (node.type === 'triggerCardNode' &&
                             (node.data?.id === editingTrigger.id || node.id === editingTrigger.id));

        if (isTargetNode) {
          const currentStatus = node.data?.status || 'default';
          const newStatus = isValid ? 'default' : 'error';

          const currentFormDataStr = JSON.stringify(node.data?.formData || {});
          const currentStatusMatches = currentStatus === newStatus;
          
          if (currentFormDataStr === newFormDataStr && currentStatusMatches) {
            return node;
          }

          hasChanges = true;
          return {
            ...node,
            data: {
              ...node.data,
              name: editingTrigger.name,
              serviceName: editingTrigger.serviceName,
              serviceIcon: editingTrigger.serviceIcon,
              status: newStatus,
              formData: JSON.parse(newFormDataStr)
            }
          };
        }
        return node;
      });

      return hasChanges ? updatedNodes : currentNodes;
    });

    const currentFormDataStr = JSON.stringify(editingTrigger.formData || {});
    if (currentFormDataStr !== newFormDataStr) {
      setEditingTrigger({
        ...editingTrigger,
        formData: formData
      });
    }
  }, [editingTrigger, setNodes]);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingTrigger(null);
  }, []);

  handlersRef.current.handleEditTrigger = handleEditTrigger;
  handlersRef.current.handleDeleteTrigger = handleDeleteTrigger;
  handlersRef.current.handleToggleTrigger = handleToggleTrigger;
  handlersRef.current.handleDuplicateTrigger = handleDuplicateTrigger;
  handlersRef.current.handleAddTrigger = handleAddTrigger;

  return {
    isSidebarOpen,
    selectedTrigger,
    isConfirmationModalOpen,
    isDetailModalOpen,
    isEditModalOpen,
    editingTrigger,
    selectedService,
    selectedTriggerSource,
    
    setIsSidebarOpen,
    setSelectedTrigger,
    setIsConfirmationModalOpen,
    setIsDetailModalOpen,
    setIsEditModalOpen,
    setEditingTrigger,
    setSelectedService,
    setSelectedTriggerSource,
    setIsFormValid,
    
    handleDeleteTrigger,
    handleToggleTrigger,
    handleDuplicateTrigger,
    handleAddTrigger,
    handleCreateNewTrigger,
    handleCloseSidebar,
    handleServiceSelect,
    handleBackToServices,
    handleCloseDetailModal,
    handleFormValidationChange,
    handleUpdateTrigger,
    handleCreateTrigger,
    handleConfirmTrigger,
    handleSaveEditedTrigger,
    handleAutoSaveTrigger,
    handleCloseEditModal,
    handleEditTrigger,
    restoreServiceIcon,
    getIconColorByServiceName,
  };
};

