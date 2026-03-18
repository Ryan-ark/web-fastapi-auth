from uuid import UUID

from fastapi import APIRouter, Depends

from backend.app.api.deps import get_user_service, require_roles
from backend.app.schemas.user import UserCreate, UserRead, UserRole, UserRoleUpdate, UserStatusUpdate
from backend.app.services.user_service import UserService


router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserRead], dependencies=[Depends(require_roles(UserRole.ADMIN))])
def list_users(service: UserService = Depends(get_user_service)) -> list[UserRead]:
    return service.list_users()


@router.post("", response_model=UserRead, dependencies=[Depends(require_roles(UserRole.ADMIN))])
def create_user(payload: UserCreate, service: UserService = Depends(get_user_service)) -> UserRead:
    return service.create_user(payload)


@router.patch(
    "/{user_id}/role",
    response_model=UserRead,
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def update_user_role(
    user_id: UUID,
    payload: UserRoleUpdate,
    service: UserService = Depends(get_user_service),
) -> UserRead:
    return service.update_role(user_id, payload)


@router.patch(
    "/{user_id}/status",
    response_model=UserRead,
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def update_user_status(
    user_id: UUID,
    payload: UserStatusUpdate,
    service: UserService = Depends(get_user_service),
) -> UserRead:
    return service.update_status(user_id, payload)
