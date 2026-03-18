# ADR 001: Repository Architecture

## Status

Accepted

## Decision

Use a single repository with:

- `frontend/` for the Vite React app
- `backend/` for the FastAPI app
- `api/index.py` as the Vercel adapter

Use a modular monolith backend and a feature-oriented frontend.

## Rationale

- A single repo keeps local development simple.
- The backend does not need microservices for a CRUD foundation.
- The frontend stays understandable by grouping domain code together.
- Vercel support remains straightforward because the serverless adapter is isolated.

## Consequences

- The repository has explicit boundaries without the operational cost of multiple repos.
- Adding a new entity requires touching predictable files in predictable locations.
- Platform-specific deployment code is minimized.
