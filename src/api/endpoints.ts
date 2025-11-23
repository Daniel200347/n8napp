const validateId = (id: string, entityName: string): string => {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error(`Invalid ${entityName} ID`);
  }
  return encodeURIComponent(id.trim());
};

const validateVersionId = (id: string, versionId: string): { id: string; versionId: string } => {
  return {
    id: validateId(id, 'workflow'),
    versionId: validateId(versionId, 'version'),
  };
};

export const endpoints = {
  automations: {
    list: '/automations',
    get: (id: string) => `/automations/${validateId(id, 'automation')}`,
    create: '/automations',
    update: (id: string) => `/automations/${validateId(id, 'automation')}`,
    delete: (id: string) => `/automations/${validateId(id, 'automation')}`,
    duplicate: (id: string) => `/automations/${validateId(id, 'automation')}/duplicate`,
    toggleStatus: (id: string) => `/automations/${validateId(id, 'automation')}/toggle-status`,
    execute: (id: string) => `/automations/${validateId(id, 'automation')}/execute`,
  },

  runs: {
    list: '/runs',
    get: (id: string) => `/runs/${validateId(id, 'run')}`,
    delete: (id: string) => `/runs/${validateId(id, 'run')}`,
    repeatCurrent: (id: string) => `/runs/${validateId(id, 'run')}/repeat-current`,
    repeatOriginal: (id: string) => `/runs/${validateId(id, 'run')}/repeat-original`,
  },

  apiKeys: {
    list: '/api-keys',
    get: (id: string) => `/api-keys/${validateId(id, 'apiKey')}`,
    create: '/api-keys',
    update: (id: string) => `/api-keys/${validateId(id, 'apiKey')}`,
    delete: (id: string) => `/api-keys/${validateId(id, 'apiKey')}`,
  },

  editor: {
    getWorkflow: (id: string) => `/workflows/${validateId(id, 'workflow')}`,
    saveWorkflow: (id: string) => `/workflows/${validateId(id, 'workflow')}`,
    getVersions: (id: string) => `/workflows/${validateId(id, 'workflow')}/versions`,
    publishVersion: (id: string, versionId: string) => {
      const { id: validId, versionId: validVersionId } = validateVersionId(id, versionId);
      return `/workflows/${validId}/versions/${validVersionId}/publish`;
    },
  },

  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },

  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile',
    changePassword: '/user/change-password',
  },

  templates: {
    list: '/templates',
    get: (id: string) => `/templates/${validateId(id, 'template')}`,
    use: (id: string) => `/templates/${validateId(id, 'template')}/use`,
  },

  statistics: {
    dashboard: '/statistics/dashboard',
    automations: '/statistics/automations',
    runs: '/statistics/runs',
  },
} as const;
