from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from backend.app.api.v1.router import api_router
from backend.app.core.config import get_settings
from backend.app.core.logging import configure_logging


configure_logging()
settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_v1_prefix)

static_dir = Path(__file__).resolve().parent / "static"
index_file = static_dir / "index.html"


@app.get("/", include_in_schema=False)
def serve_spa_root() -> FileResponse:
    if index_file.exists():
        return FileResponse(index_file)

    raise HTTPException(status_code=404, detail="Not Found")


@app.get("/{full_path:path}", include_in_schema=False)
def serve_spa(full_path: str) -> FileResponse:
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="Not Found")

    if static_dir.exists():
        requested_path = (static_dir / full_path).resolve()

        if static_dir.resolve() in requested_path.parents and requested_path.is_file():
            return FileResponse(requested_path)

        if index_file.exists():
            return FileResponse(index_file)

    raise HTTPException(status_code=404, detail="Not Found")
