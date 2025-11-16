import React from 'react';
import type { VersionData } from '../types/version';
import type { Node, Edge } from 'reactflow';

export const createMockVersions = (currentNodes?: Node[], currentEdges?: Edge[]): VersionData[] => {
  const now = new Date();
  
  const cleanNodesForSerialization = (nodes: Node[]): Node[] => {
    return nodes.map(node => {
      if (node.type === 'triggerCardNode' && node.data) {
        const { serviceIcon, ...restData } = node.data;
        const iconColor = (serviceIcon as any)?.props?.style?.backgroundColor || '#155DFC';
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
  };
  const currentVersion: VersionData = {
    id: 'current',
    publishedAt: new Date(),
    publishedBy: 'Текущая версия',
    versionNumber: 4,
    name: 'Автоматизация без названия',
    isCurrent: true,
    nodes: currentNodes ? JSON.parse(JSON.stringify(cleanNodesForSerialization(currentNodes))) : [],
    edges: currentEdges ? JSON.parse(JSON.stringify(currentEdges)) : []
  };
  
  const version3: VersionData = {
    id: 'v3',
    publishedAt: new Date(now.getTime() - 3600000),
    publishedBy: 'Alena Support',
    versionNumber: 3,
    name: 'Автоматизация без названия',
    isCurrent: false,
    nodes: [
      {
        id: 'trigger-1',
        type: 'triggerCardNode',
        position: { x: 100, y: 100 },
        data: {
          id: 'trigger-1',
          name: 'Webhook',
          serviceName: 'Webhook',
          serviceIcon: React.createElement('div', { style: { width: '36px', height: '36px', backgroundColor: '#155DFC', borderRadius: '8px' } }),
          status: 'default',
          number: 1,
          formData: {
            name: 'Webhook Trigger',
            description: 'Trigger description',
            option: 'Option 1',
            notes: 'Notes',
            password: 'password123',
            skipOnError: false,
            notifyMe: false
          }
        }
      },
      {
        id: 'trigger-2',
        type: 'triggerCardNode',
        position: { x: 100, y: 250 },
        data: {
          id: 'trigger-2',
          name: 'HTTP Request',
          serviceName: 'HTTP',
          serviceIcon: React.createElement('div', { style: { width: '36px', height: '36px', backgroundColor: '#2A9D90', borderRadius: '8px' } }),
          status: 'default',
          number: 2,
          formData: {
            name: 'HTTP Request',
            description: 'HTTP description',
            option: 'Option 2',
            notes: 'HTTP notes',
            password: 'http123',
            skipOnError: false,
            notifyMe: false
          }
        }
      }
    ],
    edges: [
      {
        id: 'edge-trigger-1-trigger-2',
        source: 'trigger-1',
        target: 'trigger-2',
        type: 'bezier'
      }
    ]
  };

  const version2: VersionData = {
    id: 'v2',
    publishedAt: new Date(now.getTime() - 86400000),
    publishedBy: 'Alena Support',
    versionNumber: 2,
    name: 'Автоматизация без названия',
    nodes: [
      {
        id: 'trigger-1-v2',
        type: 'triggerCardNode',
        position: { x: 100, y: 100 },
        data: {
          id: 'trigger-1-v2',
          name: 'Webhook',
          serviceName: 'Webhook',
          serviceIcon: React.createElement('div', { style: { width: '36px', height: '36px', backgroundColor: '#155DFC', borderRadius: '8px' } }),
          status: 'default',
          number: 1,
          formData: {
            name: 'Webhook Trigger',
            description: 'Trigger description',
            option: 'Option 1',
            notes: 'Notes',
            password: 'password123',
            skipOnError: false,
            notifyMe: false
          }
        }
      },
      {
        id: 'trigger-2-v2',
        type: 'triggerCardNode',
        position: { x: 100, y: 250 },
        data: {
          id: 'trigger-2-v2',
          name: 'Email',
          serviceName: 'Email',
          serviceIcon: React.createElement('div', { style: { width: '36px', height: '36px', backgroundColor: '#F59E0B', borderRadius: '8px' } }),
          status: 'default',
          number: 2,
          formData: {
            name: 'Email Trigger',
            description: 'Email description',
            option: 'Option 2',
            notes: 'Email notes',
            password: 'email123',
            skipOnError: false,
            notifyMe: false
          }
        }
      }
    ],
    edges: [
      {
        id: 'edge-trigger-1-v2-trigger-2-v2',
        source: 'trigger-1-v2',
        target: 'trigger-2-v2',
        type: 'bezier'
      }
    ]
  };

  const version1: VersionData = {
    id: 'v1',
    publishedAt: new Date(now.getTime() - 172800000),
    publishedBy: 'Alena Support',
    versionNumber: 1,
    name: 'Старая автоматизация',
    nodes: [
      {
        id: 'trigger-1-v1',
        type: 'triggerCardNode',
        position: { x: 100, y: 100 },
        data: {
          id: 'trigger-1-v1',
          name: 'Webhook',
          serviceName: 'Webhook',
          serviceIcon: React.createElement('div', { style: { width: '36px', height: '36px', backgroundColor: '#155DFC', borderRadius: '8px' } }),
          status: 'default',
          number: 1,
          formData: {
            name: 'Webhook Trigger',
            description: 'Trigger description',
            option: 'Option 1',
            notes: 'Notes',
            password: 'password123',
            skipOnError: false,
            notifyMe: false
          }
        }
      },
      {
        id: 'trigger-2-v1',
        type: 'triggerCardNode',
        position: { x: 100, y: 250 },
        data: {
          id: 'trigger-2-v1',
          name: 'Chat Model',
          serviceName: 'AI',
          serviceIcon: React.createElement('div', { style: { width: '36px', height: '36px', backgroundColor: '#8B5CF6', borderRadius: '8px' } }),
          status: 'error',
          number: 2,
          formData: {
            name: 'Chat Model',
            description: 'Chat description',
            option: '',
            notes: '',
            password: '',
            skipOnError: false,
            notifyMe: false
          }
        }
      },
      {
        id: 'trigger-3-v1',
        type: 'triggerCardNode',
        position: { x: 100, y: 400 },
        data: {
          id: 'trigger-3-v1',
          name: 'HTTP Request',
          serviceName: 'HTTP',
          serviceIcon: React.createElement('div', { style: { width: '36px', height: '36px', backgroundColor: '#2A9D90', borderRadius: '8px' } }),
          status: 'default',
          number: 3,
          formData: {
            name: 'HTTP Request',
            description: 'HTTP description',
            option: 'Option 1',
            notes: 'HTTP notes',
            password: 'http123',
            skipOnError: false,
            notifyMe: false
          }
        }
      }
    ],
    edges: [
      {
        id: 'edge-trigger-1-v1-trigger-2-v1',
        source: 'trigger-1-v1',
        target: 'trigger-2-v1',
        type: 'bezier'
      },
      {
        id: 'edge-trigger-2-v1-trigger-3-v1',
        source: 'trigger-2-v1',
        target: 'trigger-3-v1',
        type: 'bezier'
      }
    ]
  };

  if (currentNodes && currentNodes.length > 0) {
    return [currentVersion, version3, version2, version1].slice(0, 3);
  }
  
  return [version3, version2, version1];
};

