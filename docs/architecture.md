# Architecture

## Overview

The repository uses a modular monolith backend and a feature-oriented frontend. This keeps the first version simple while leaving clear extension points for more entities and more UI domains.

## Backend Flow

Request flow:

1. Endpoint receives HTTP input.
2. Endpoint calls a service.
3. Service applies business rules.
4. Service uses a repository for database access.
5. Repository returns ORM entities.
6. Service maps entities into response schemas.

## Backend Folders

- `backend/app/api/`: transport layer only
- `backend/app/services/`: business logic
- `backend/app/repositories/`: persistence logic
- `backend/app/models/`: SQLAlchemy models
- `backend/app/schemas/`: request and response contracts
- `backend/app/core/`: configuration and infrastructure

## Frontend Flow

Frontend modules are centered around features. The `products` feature owns its API calls, hooks, route page, and feature-specific UI.

## Frontend Folders

- `frontend/src/app/`: application wiring
- `frontend/src/components/`: shared layout and UI primitives
- `frontend/src/features/`: domain features
- `frontend/src/lib/`: low-level shared utilities
- `frontend/src/pages/`: app-wide routes like 404

## Why This Is AI-Friendly

- File names match responsibilities.
- No hidden autoloading or dynamic module discovery.
- Route, service, repository, and model concerns are separated.
- Feature code is kept close together on the frontend.
