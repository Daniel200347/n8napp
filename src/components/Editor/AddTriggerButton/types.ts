export type TriggerStatus = 'default' | 'error' | 'disabled' | 'hover' | 'active';

export interface Trigger {
  id: string;
  name: string;
  serviceName: string;
  serviceIcon: React.ReactNode;
  status: TriggerStatus;
  formData?: {
    name?: string;
    description?: string;
    option?: string;
    notes?: string;
    password?: string;
    skipOnError?: boolean;
    notifyMe?: boolean;
  };
}
