# Opkit Task

Task manager app: NestJS backend, React frontend, Postgres database, with live updates over WebSocket.

## Run with Docker (recommended)

Requires Docker and Docker Compose.

```
docker compose up -d --build
```

This starts:
- Postgres on port 5433 (mapped from the container's 5432)
- Backend API on http://localhost:8000 (runs database migrations automatically on startup)
- Frontend on http://localhost:5173

Open http://localhost:5173 in your browser.

To stop everything:
```
docker compose down
```

## Run locally without Docker

Requires Node.js 20+ and a running Postgres instance.

### Backend

```
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<db>?schema=public"
JWT_SECRET="<a long random string>"
PORT=8000
```

Apply migrations and start the server:
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

Open http://localhost:5173.

Note: the backend only allows CORS from http://localhost:5173 by default. Set `FRONTEND_URL` in the backend's `.env` if you run the frontend on a different port.
