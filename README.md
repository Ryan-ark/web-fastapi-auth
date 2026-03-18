# Product Control Center 

Product Control Center is a sample CRUD application built with Vite, React, FastAPI, and PostgreSQL. The repository is organized to stay easy to scale and easy for AI tools to navigate.

## Stack

- Frontend: Vite + React + TypeScript
- Backend: FastAPI + SQLAlchemy + Alembic
- Database: PostgreSQL
- Deployment target: Vercel + Neon Free

## Repository Layout

- `frontend/`: React application with feature-oriented folders
- `backend/`: FastAPI application with layered modules
- `api/index.py`: thin Vercel adapter that exposes the FastAPI app
- `docs/`: architecture, development, deployment, and decision records

## Where To Change What

- Add or change API routes: `backend/app/api/v1/endpoints/`
- Add or change business rules: `backend/app/services/`
- Add or change database access: `backend/app/repositories/`
- Add or change ORM models: `backend/app/models/`
- Add or change frontend product UI: `frontend/src/features/products/`
- Add or change shared UI: `frontend/src/components/`
- Add or change local/dev/deploy docs: `docs/`

## Local Development

First-time setup:

```powershell
npm run setup
```

Normal local startup:

```powershell
npm run local
```

What `npm run local` does:

- starts PostgreSQL with Docker Compose
- runs Alembic migrations
- starts the FastAPI backend
- starts the Vite frontend

If PostgreSQL is already running and migrations are already applied:

```powershell
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:8000`.
Project PostgreSQL runs on `localhost:5433`.
For local development, the frontend talks directly to `http://127.0.0.1:8000/api`.

## Testing

Backend tests:

```powershell
npm run test
```

## Vercel

The repository includes:
- `api/index.py` for the Python runtime
- `vercel.json` for SPA rewrites and build output

Use a hosted PostgreSQL database such as Neon Free and set `DATABASE_URL` in Vercel project settings.
