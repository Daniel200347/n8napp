import type { Node, Edge } from 'reactflow';

export interface VersionData {
  id: string;
  publishedAt: Date;
  publishedBy: string;
  versionNumber: number;
  name?: string;
  nodes: Node[];
  edges: Edge[];
  isCurrent?: boolean;
}

