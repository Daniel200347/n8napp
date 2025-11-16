import type { Automation, RunRow, ApiKey } from './types';

export const mockAutomationsData: Automation[] = [
  { id: '1', name: 'Обработка заявок с формы сайта', lastRun: 'Сегодня, в 10:12', status: 'disabled', isActive: false },
  { id: '2', name: 'Синхронизация лидов с CRM', lastRun: 'Сегодня, в 08:47', status: 'enabled', isActive: true },
  { id: '3', name: 'Уведомления в Slack о новых клиентах', lastRun: 'Вчера, в 22:15', status: 'disabled', isActive: false },
  { id: '4', name: 'Автоматический отчёт о продажах', lastRun: '21 августа, в 14:03', status: 'disabled', isActive: false },
  { id: '5', name: 'Ежедневная выгрузка данных в Google Sheets', lastRun: '19 августа, в 09:27', status: 'disabled', isActive: false },
  { id: '6', name: 'Автоматический отчёт о продажах', lastRun: '19 августа, в 06:11', status: 'disabled', isActive: false },
  { id: '7', name: 'Синхронизация лидов с CRM', lastRun: '16 августа, в 14:51', status: 'disabled', isActive: false },
  { id: '8', name: 'Проверка ошибок в интеграциях', lastRun: '15 августа, в 02:32', status: 'disabled', isActive: false },
];

export const mockRunsData: RunRow[] = [
  { id: '1', automationName: 'Обработка заявок с формы сайта', status: 'failed', startTime: 'Сегодня, в 21:06:46', duration: '24ms', steps: 5, completedSteps: 3, trigger: 'По расписанию' },
  { id: '2', automationName: 'Синхронизация лидов с CRM', status: 'completed', startTime: 'Сегодня, в 08:47:02', duration: '16ms', steps: 8, completedSteps: 8, trigger: 'Вручную' },
  { id: '3', automationName: 'Уведомления в Slack о новых клиентах', status: 'failed', startTime: 'Вчера, в 22:15:32', duration: '32ms', steps: 3, completedSteps: 1, trigger: 'По расписанию' },
  { id: '4', automationName: 'Автоматический отчёт о продажах', status: 'failed', startTime: '21 августа, в 14:03:44', duration: '24ms', steps: 6, completedSteps: 0, trigger: 'Вручную' },
  { id: '5', automationName: 'Ежедневная выгрузка данных в Google Sheets', status: 'failed', startTime: '19 августа, в 09:27:12', duration: '18ms', steps: 4, completedSteps: 4, trigger: 'По расписанию' },
  { id: '6', automationName: 'Автоматический отчёт о продажах', status: 'failed', startTime: '19 августа, в 06:11:31', duration: '28ms', steps: 7, completedSteps: 5, trigger: 'Вручную' },
  { id: '7', automationName: 'Синхронизация лидов с CRM', status: 'failed', startTime: '16 августа, в 14:51:06', duration: '12ms', steps: 3, completedSteps: 1, trigger: 'По расписанию' },
  { id: '8', automationName: 'Проверка ошибок в интеграциях', status: 'failed', startTime: '15 августа, в 02:32:08', duration: '240ms', steps: 6, completedSteps: 0, trigger: 'Вручную' },
  { id: '9', automationName: 'Резервное копирование базы данных', status: 'completed', startTime: '14 августа, в 23:45:12', duration: '45ms', steps: 4, completedSteps: 4, trigger: 'По расписанию' },
  { id: '10', automationName: 'Отправка еженедельного отчёта', status: 'failed', startTime: '14 августа, в 09:15:30', duration: '18ms', steps: 6, completedSteps: 2, trigger: 'Вручную' },
  { id: '11', automationName: 'Синхронизация с внешним API', status: 'failed', startTime: '13 августа, в 16:22:45', duration: '33ms', steps: 5, completedSteps: 1, trigger: 'По расписанию' },
  { id: '12', automationName: 'Обновление статусов заказов', status: 'completed', startTime: '13 августа, в 11:08:20', duration: '22ms', steps: 3, completedSteps: 3, trigger: 'Вручную' },
];

export const mockApiKeysData: ApiKey[] = [
  { id: '1', name: 'Аккаунт YandexGPT', service: 'YandexGPT', added: 'Сегодня, в 10:12', lastUpdate: 'Сегодня, в 10:12', status: 'disconnected' },
  { id: '2', name: 'Аккаунт Mail.ru', service: 'Mail.ru API', added: 'Сегодня, в 08:47', lastUpdate: 'Сегодня, в 08:47', status: 'requires_setup' },
  { id: '3', name: 'Аккаунт GigaChat', service: 'GigaChat', added: '15 августа, в 02:32', lastUpdate: '15 августа, в 02:32', status: 'connected' },
];

