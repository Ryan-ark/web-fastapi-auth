from collections.abc import Generator

from collections.abc import Callable, Generator
from uuid import UUID

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from backend.app.core.database import get_db_session
from backend.app.core.config import get_settings
from backend.app.schemas.user import UserRead, UserRole
from backend.app.services.auth_service import AuthService
from backend.app.services.user_service import UserService


def get_db() -> Generator[Session, None, None]:
    yield from get_db_session()


def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(db)


def get_user_service(db: Session = Depends(get_db)) -> UserService:
    return UserService(db)


def get_current_user(
    request: Request,
    service: AuthService = Depends(get_auth_service),
) -> UserRead:
    access_token = request.cookies.get(get_settings().access_token_cookie_name)
    if not access_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return service.get_current_user(access_token)


def require_roles(*roles: UserRole) -> Callable[[UserRead], UserRead]:
    def dependency(current_user: UserRead = Depends(get_current_user)) -> UserRead:
        if current_user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have access to this resource.")
        return current_user

    return dependency
