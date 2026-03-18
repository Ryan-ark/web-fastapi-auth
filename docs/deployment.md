# Deployment

## Vercel Deployment Guide

This guide is for deploying this repository to Vercel with:

- Frontend: Vite + React
- Backend: FastAPI on the Vercel Python runtime
- Database: PostgreSQL on Neon Free

It matches the current repository structure and Vercel project flow.

## What This Repository Deploys

This repository is deployed as one Vercel project:

- `frontend/dist` is the static frontend output
- `api/index.py` exposes the FastAPI app to Vercel
- `vercel.json` controls build output and rewrites

Important behavior:

- The React app is served as a SPA
- `/api/*` requests are routed to FastAPI
- All other routes are rewritten to `index.html`

## Files That Matter For Deployment

- `vercel.json`
- `api/index.py`
- `backend/app/main.py`
- `backend/requirements.txt`
- `backend/alembic.ini`
- `.python-version`
- `frontend/package.json`

## Before You Click Deploy

Make sure all of these are true first:

1. Your code is pushed to GitHub.
2. The repository root contains `vercel.json`.
3. The repository root contains `.python-version`.
4. You already created or will create a Neon Postgres database.
5. You are ready to add environment variables in Vercel before the first real deployment.

## Recommended Database Choice

Use Neon Free.

Reason:

- Plain PostgreSQL
- Good fit for Vercel serverless
- Free tier exists
- Easy connection string setup

Recommended connection type:

- Use a pooled connection string for the app
- Use an unpooled or direct connection string for manual migrations if Neon gives you both

## Step-By-Step In Vercel UI

You are currently on the New Project screen. Use these settings:

### Project Name

Use any name you want.

Example:

- `web-vite-react-fastapi-postgres`

### Root Directory

Keep:

- `./`

Do not change it to `frontend` or `backend`.

Reason:

- This repo depends on root-level `vercel.json`
- The build command runs from the repository root
- `api/index.py` must stay visible to Vercel

### Application Preset

Safe choice:

- Keep `Python`

Reason:

- The backend uses the Vercel Python runtime
- The project build and output are already explicitly controlled by `vercel.json`

Note:

- The preset is less important here than `vercel.json`
- Do not try to set this as a pure Vite frontend deployment

### Build And Output Settings

Recommended:

- Leave these at default in the UI unless Vercel forces you to fill them

Reason:

- This repository already defines `buildCommand`, `outputDirectory`, and rewrites in `vercel.json`

Current repo behavior:

- Build command: `cd frontend && npm install && npm run build`
- Output directory: `frontend/dist`

## Required Environment Variables

Add these before deployment.

### Required

`DATABASE_URL`

- Set this to your Neon pooled connection string
- It should usually include `sslmode=require`

Example shape:

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

`APP_ENV`

```env
APP_ENV=production
```

`API_V1_PREFIX`

```env
API_V1_PREFIX=/api/v1
```

`CORS_ORIGINS`

Set this to your Vercel domain.

Example:

```env
CORS_ORIGINS=https://your-project-name.vercel.app
```

If you also have a custom domain later:

```env
CORS_ORIGINS=https://your-project-name.vercel.app,https://yourdomain.com
```

### Not Required For Production

Do not set `VITE_API_BASE_URL` unless you have a very specific reason.

Reason:

- This frontend already falls back to `/api` in production
- Same-origin API calls are simpler and safer on Vercel

## Recommended Neon Setup

### Option A: Create Neon manually first

1. Create a Neon project.
2. Create or use the default database.
3. Copy the connection string.
4. Put that string into Vercel as `DATABASE_URL`.

### Option B: Use the Neon Vercel integration

If you use the official integration, Vercel can inject:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`
- Related `PG*` variables

Recommendation:

- Use injected `DATABASE_URL` for the app
- Use `DATABASE_URL_UNPOOLED` or a direct connection string for migrations if available

## Important Note About Migrations

Vercel deployment does not automatically run Alembic migrations for this repo.

You must run the initial migration yourself against Neon.

Without this, deployment may succeed but the app will fail when it tries to read or write the `products` table.

## How To Run Migrations Against Neon

Run this from your local machine after creating the Neon database.

### PowerShell

From the repository root:

```powershell
$env:DATABASE_URL="YOUR_NEON_CONNECTION_STRING"
.venv\Scripts\python -m alembic -c backend\alembic.ini upgrade head
$LASTEXITCODE
```

If Neon gives you both pooled and unpooled strings:

- Prefer the unpooled or direct one for Alembic

After the command succeeds, unset the variable if you want:

```powershell
Remove-Item Env:DATABASE_URL
```

### Git Bash

From the repository root:

```bash
export DATABASE_URL="YOUR_NEON_CONNECTION_STRING"
./.venv/Scripts/python.exe -m alembic -c backend/alembic.ini upgrade head
echo $?
unset DATABASE_URL
```

If Neon shows a URL starting with `postgresql://`, either:

- Change it to `postgresql+psycopg://` before exporting it
- Or use the backend as-is after the URL normalization fix in this repo

## Deploy Sequence I Recommend

Use this order:

1. Create the Neon database.
2. Add Vercel environment variables.
3. Run the Alembic migration against Neon from your local machine.
4. Click `Deploy` in Vercel.
5. Wait for build and function deployment.
6. Open the deployed site.
7. Test create, list, update, and delete.

## What To Expect On First Deploy

If everything is correct:

- Frontend build should complete from `frontend`
- Vercel should publish static assets from `frontend/dist`
- `/api/v1/health` should respond from FastAPI
- The homepage should load
- CRUD should work if the database is migrated

## Post-Deploy Verification Checklist

Check these in order:

1. Open `https://your-project-name.vercel.app`.
2. Confirm the UI loads.
3. Visit `https://your-project-name.vercel.app/api/v1/health`.
4. Confirm it returns a healthy response.
5. Create a product in the UI.
6. Refresh the page.
7. Confirm the product still exists.
8. Edit the product.
9. Delete the product.

## If Deployment Fails

### Case 1: Build fails before deploy completes

Likely causes:

- Wrong root directory
- Environment variables missing
- Dependency install issue
- `vercel.json` not being used because the root directory is wrong

Check:

- Root directory is `./`
- Project is deploying from the repo root
- `frontend/package.json` exists
- `backend/requirements.txt` exists
- `.python-version` exists at the repo root

### Case 2: Site deploys but API fails

Likely causes:

- `DATABASE_URL` missing
- Wrong database credentials
- Missing `sslmode=require`
- Migration was never run
- `CORS_ORIGINS` wrong

Check:

- `DATABASE_URL` is valid
- The database is reachable
- The `products` table exists

### Case 3: Frontend loads but CRUD fails

Likely causes:

- Migrations not applied
- Backend function error
- Database connection error

Check:

- `/api/v1/health`
- Vercel function logs
- Neon connection string
- Alembic migration status

## Exact Values To Use In Vercel For This Repo

Use these unless you intentionally change the app:

```env
APP_ENV=production
API_V1_PREFIX=/api/v1
```

Use your actual domain here:

```env
CORS_ORIGINS=https://your-project-name.vercel.app
```

Use your actual Neon connection string here:

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

## Recommended First Deploy Routine

If you want the safest path:

1. Add all Vercel env vars first.
2. Run the migration against Neon locally.
3. Deploy.
4. If deploy succeeds, test `/api/v1/health` immediately.
5. Only then test the UI CRUD flow.

## Notes About Current Production Behavior

- Local development uses explicit local env files
- Production should rely on Vercel env vars
- The frontend should use same-origin `/api` in production
- The backend is exposed through `api/index.py`
- Vercel rewrites are already defined in `vercel.json`
- Keep the Vercel adapter thin; the real app should continue to live under `backend/app/`
- Do not rely on in-memory state in request handlers

## If Vercel Asks For Manual Build Settings

Use these exact values:

Build Command:

```text
cd frontend && npm install && npm run build
```

Output Directory:

```text
frontend/dist
```

Install Command:

```text
npm install
```

Do not set the root directory to `frontend`.

## Preview Environments

This repo can work with Vercel preview deployments, but database branching should be handled intentionally.

Best path:

- Use the Neon Vercel integration if you want isolated preview databases

If you do not set that up:

- Preview deployments may point at the same database as production
- That is usually not what you want long term

## Official References

- Vercel FastAPI: https://vercel.com/docs/frameworks/backend/fastapi
- Vercel Python runtime: https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python
- Vercel Vite: https://vercel.com/docs/frameworks/frontend/vite
- Vercel rewrites: https://vercel.com/docs/rewrites
- Neon connection guide: https://neon.com/docs/get-started-with-neon/connect-neon
- Neon Vercel integration: https://neon.com/docs/guides/vercel/
