# Development

## Local Services

- PostgreSQL runs through `docker-compose.yml`
- FastAPI runs with Uvicorn from `backend/`
- React runs with Vite from `frontend/`
- The project PostgreSQL container is exposed on host port `5433` to avoid conflicts with a system PostgreSQL on `5432`

## Recommended Commands

First-time setup:

1. Run `npm run setup`.

Normal local startup:

1. Run `npm run local`.

## What Setup Does

- installs root Node dependencies
- installs frontend dependencies
- creates the Python virtual environment if missing
- installs backend Python dependencies
- copies `.env.example` files into working `.env` files if needed

## What Local Does

- runs `docker compose up -d`
- runs `alembic upgrade head`
- starts the backend server
- starts the frontend dev server

## Adding Another Entity

Follow the same pattern as `products`:

1. Add model.
2. Add schema.
3. Add repository.
4. Add service.
5. Add endpoint file and include it in `router.py`.
6. Add frontend feature folder with API calls, hooks, components, and page entry.
