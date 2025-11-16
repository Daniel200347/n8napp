# N8N App

Современное веб-приложение для автоматизации процессов, построенное на React, TypeScript и Vite.

## Технологии

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
- Redux Toolkit

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Деплой на GitHub Pages

1. Убедитесь, что репозиторий публичный
2. Запустите деплой:
```bash
npm run deploy
```

3. В настройках репозитория на GitHub:
   - Перейдите в Settings → Pages
   - В Source выберите "Deploy from a branch"
   - Выберите ветку "gh-pages" и папку "/ (root)"
   - Нажмите Save

Ваше приложение будет доступно по адресу: `https://daniel200347.github.io/n8napp/`

## Структура проекта

```
src/
├── components/     # Переиспользуемые компоненты
├── pages/         # Страницы приложения 
├── sections/      # Секции страниц
└── ui/           # UI компоненты
```

## Важные замечания

- Используется HashRouter для совместимости с GitHub Pages
- Базовый путь настроен на `/n8napp/`
- Добавлен файл 404.html для правильной работы роутинга
