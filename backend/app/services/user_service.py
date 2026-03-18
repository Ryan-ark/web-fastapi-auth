from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.app.core.security import hash_password
from backend.app.models.user import User
from backend.app.repositories.user_repository import UserRepository
from backend.app.schemas.user import UserCreate, UserRead, UserRole, UserRoleUpdate, UserStatusUpdate


class UserService:
    def __init__(self, db: Session) -> None:
        self.users = UserRepository(db)

    def list_users(self) -> list[UserRead]:
        return [UserRead.model_validate(user) for user in self.users.list()]

    def create_user(self, payload: UserCreate) -> UserRead:
        if self.users.get_by_email(payload.email) is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists.")

        user = User(
            email=payload.email.lower().strip(),
            full_name=payload.full_name.strip(),
            password_hash=hash_password(payload.password),
            role=payload.role.value,
            is_active=payload.is_active,
        )
        return UserRead.model_validate(self.users.create(user))

    def update_role(self, user_id: UUID, payload: UserRoleUpdate) -> UserRead:
        user = self._get_existing_user(user_id)
        user.role = payload.role.value
        return UserRead.model_validate(self.users.update(user))

    def update_status(self, user_id: UUID, payload: UserStatusUpdate) -> UserRead:
        user = self._get_existing_user(user_id)
        user.is_active = payload.is_active
        return UserRead.model_validate(self.users.update(user))

    def _get_existing_user(self, user_id: UUID) -> User:
        user = self.users.get_by_id(user_id)
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
        return user
