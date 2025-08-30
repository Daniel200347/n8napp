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

1. Создайте репозиторий на GitHub с именем `n8napp`
2. Инициализируйте Git и подключите репозиторий:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/n8napp.git
git push -u origin main
```

3. Установите gh-pages:
```bash
npm install
```

4. Запустите деплой:
```bash
npm run deploy
```

5. В настройках репозитория на GitHub:
   - Перейдите в Settings → Pages
   - В Source выберите "Deploy from a branch"
   - Выберите ветку "gh-pages" и папку "/ (root)"
   - Нажмите Save

Ваше приложение будет доступно по адресу: `https://YOUR_USERNAME.github.io/n8napp/`

## Структура проекта

```
src/
├── components/     # Переиспользуемые компоненты
├── pages/         # Страницы приложения
├── sections/      # Секции страниц
└── ui/           # UI компоненты
```
