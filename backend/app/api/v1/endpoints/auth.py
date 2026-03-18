from fastapi import APIRouter, Depends, Request, Response, status

from backend.app.api.deps import get_auth_service, get_current_user
from backend.app.core.auth import clear_auth_cookies, set_auth_cookies
from backend.app.core.config import get_settings
from backend.app.schemas.auth import AuthSessionRead, LoginRequest
from backend.app.schemas.user import UserRead
from backend.app.services.auth_service import AuthService


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=AuthSessionRead)
def login(
    payload: LoginRequest,
    request: Request,
    response: Response,
    service: AuthService = Depends(get_auth_service),
) -> AuthSessionRead:
    user, access_token, refresh_token = service.login(
        payload,
        user_agent=request.headers.get("user-agent"),
        ip_address=request.client.host if request.client else None,
    )
    set_auth_cookies(response, access_token=access_token, refresh_token=refresh_token)
    return AuthSessionRead(user=user)


@router.post("/refresh", response_model=AuthSessionRead)
def refresh(
    request: Request,
    response: Response,
    service: AuthService = Depends(get_auth_service),
) -> AuthSessionRead:
    refresh_token = request.cookies.get(get_settings().refresh_token_cookie_name)
    user, access_token, next_refresh_token = service.refresh(refresh_token or "")
    set_auth_cookies(response, access_token=access_token, refresh_token=next_refresh_token)
    return AuthSessionRead(user=user)


@router.post("/logout", status_code=204)
def logout(
    request: Request,
    response: Response,
    service: AuthService = Depends(get_auth_service),
) -> Response:
    refresh_token = request.cookies.get(get_settings().refresh_token_cookie_name)
    service.logout(refresh_token)
    clear_auth_cookies(response)
    response.status_code = status.HTTP_204_NO_CONTENT
    return response


@router.get("/me", response_model=UserRead)
def me(current_user: UserRead = Depends(get_current_user)) -> UserRead:
    return current_user
