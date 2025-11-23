# Redux Store Structure

Этот проект использует Redux Toolkit для управления состоянием приложения.

## Структура

```
src/
├── store/
│   ├── index.ts          # Главный store
│   ├── hooks.ts          # Типизированные хуки
│   └── slices/           # Redux слайсы
│       ├── automationsSlice.ts
│       ├── runsSlice.ts
│       ├── apiKeysSlice.ts
│       ├── editorSlice.ts
│       ├── authSlice.ts
│       ├── templatesSlice.ts
│       └── settingsSlice.ts
├── api/
│   ├── client.ts         # HTTP клиент
│   ├── endpoints.ts      # API эндпоинты
│   └── mockData.ts       # Моковые данные
└── services/
    ├── automationsService.ts
    ├── runsService.ts
    └── apiKeysService.ts
```

## Использование

### Базовое использование в компоненте

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAutomation, toggleAutomationStatus } from '@/store/slices/automationsSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const automations = useAppSelector(state => state.automations.items);
  const selectedIds = useAppSelector(state => state.automations.selectedIds);

  const handleToggle = (id: string) => {
    dispatch(toggleAutomationStatus({ id, isActive: true }));
  };

  return (
    // ваш TSX
  );
}
```

### Работа с фильтрами и пагинацией

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters, setPagination } from '@/store/slices/automationsSlice';

function FiltersComponent() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.automations.filters);
  const pagination = useAppSelector(state => state.automations.pagination);

  const handleSearch = (query: string) => {
    dispatch(setFilters({ searchQuery: query }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPagination({ currentPage: page }));
  };

  return (
    // ваш TSX
  );
}
```

### Работа с асинхронными действиями (thunks)

В будущем можно добавить thunks для асинхронных операций:

```typescript
// Пример thunk (можно добавить в слайсы)
import { createAsyncThunk } from '@reduxjs/toolkit';
import { automationsService } from '@/services/automationsService';

export const fetchAutomations = createAsyncThunk(
  'automations/fetch',
  async () => {
    const data = await automationsService.getAutomations();
    return data;
  }
);
```

## Подключение реального бекенда

1. Установите переменную окружения `VITE_API_BASE_URL` в `.env`:
   ```
   VITE_API_BASE_URL=http://your-api-url.com/api
   ```

2. Обновите сервисы в `src/services/` - раскомментируйте реальные API вызовы

3. Все моковые данные сохранены в `src/api/mockData.ts` для демонстрации

## Состояние приложения

- **automations** - автоматизации (список, фильтры, пагинация)
- **runs** - запуски автоматизаций
- **apiKeys** - API ключи
- **editor** - состояние редактора workflow
- **auth** - аутентификация пользователя
- **templates** - шаблоны автоматизаций
- **settings** - настройки пользователя

