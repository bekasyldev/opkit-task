# Opkit Task

Менеджер задач: backend на NestJS, frontend на React, база данных PostgreSQL, статусы задач обновляются в реальном времени через WebSocket.

## Технологии

Backend:
- NestJS
- Prisma (ORM)
- PostgreSQL
- JWT-аутентификация
- Socket.io (WebSocket)

Frontend:
- React + Vite
- TypeScript
- React Router
- Zustand (хранение состояния)
- Socket.io-client

## Структура проекта

```
backend/
  src/
    auth/      — регистрация, логин, JWT
    tasks/     — CRUD задач и WebSocket-гейтвей
    prisma/    — модуль подключения к базе данных
  prisma/      — схема базы данных и миграции

frontend/
  src/
    pages/      — страницы (Login, Register, Tasks)
    components/ — переиспользуемые компоненты (карточка задачи, колонка канбана)
    store/      — Zustand store с задачами
    lib/        — API-клиент и socket-клиент
    context/    — контекст авторизации
    types/      — типы данных (Task, User и т.д.)

docker-compose.yml — поднимает базу, backend и frontend одной командой
```

## Запуск через Docker (проще всего)

Нужен установленный Docker.

```
docker compose up -d --build
```

Поднимутся три контейнера:
- PostgreSQL — порт 5433
- Backend — http://localhost:8000 (миграции применяются автоматически при старте)
- Frontend — http://localhost:5173

Открыть в браузере http://localhost:5173.

Остановить:
```
docker compose down
```

## Запуск локально без Docker

Нужны Node.js 20+ и запущенный PostgreSQL.

### Backend

```
cd backend
npm install
```

Создать файл `.env` в папке `backend/`:
```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<db>?schema=public"
JWT_SECRET="<длинная случайная строка>"
PORT=8000
```

Применить миграции и запустить сервер:
```
npx prisma migrate dev
npm run start:dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Открыть http://localhost:5173.

Примечание: backend по умолчанию разрешает запросы только с http://localhost:5173 (CORS). Если фронтенд запущен на другом порту — укажи его в `FRONTEND_URL` в `.env` backend'а.
