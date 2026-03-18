from datetime import datetime, timezone
from uuid import UUID

import jwt
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.app.core.auth import get_refresh_expiry
from backend.app.core.security import (
    create_access_token,
    decode_access_token,
    generate_refresh_token,
    hash_password,
    hash_refresh_token,
    verify_password,
)
from backend.app.models.session import UserSession
from backend.app.models.user import User
from backend.app.repositories.session_repository import SessionRepository
from backend.app.repositories.user_repository import UserRepository
from backend.app.schemas.auth import LoginRequest
from backend.app.schemas.user import UserCreate, UserRead, UserRole


class AuthService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.users = UserRepository(db)
        self.sessions = SessionRepository(db)

    def authenticate(self, payload: LoginRequest) -> User:
        user = self.users.get_by_email(payload.email)
        if user is None or not verify_password(payload.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your account is inactive.",
            )

        return user

    def login(self, payload: LoginRequest, *, user_agent: str | None, ip_address: str | None) -> tuple[UserRead, str, str]:
        user = self.authenticate(payload)
        refresh_token = generate_refresh_token()
        session = UserSession(
            user_id=user.id,
            refresh_token_hash=hash_refresh_token(refresh_token),
            user_agent=user_agent,
            ip_address=ip_address,
            expires_at=get_refresh_expiry(),
        )
        created_session = self.sessions.create(session)
        access_token = create_access_token(user_id=user.id, role=user.role, session_id=created_session.id)
        return UserRead.model_validate(user), access_token, refresh_token

    def refresh(self, refresh_token: str) -> tuple[UserRead, str, str]:
        session = self.sessions.get_by_refresh_token_hash(hash_refresh_token(refresh_token))
        user = self._validate_session_with_user(session)

        next_refresh_token = generate_refresh_token()
        session.refresh_token_hash = hash_refresh_token(next_refresh_token)
        session.expires_at = get_refresh_expiry()
        updated_session = self.sessions.update(session)
        access_token = create_access_token(user_id=user.id, role=user.role, session_id=updated_session.id)
        return UserRead.model_validate(user), access_token, next_refresh_token

    def logout(self, refresh_token: str | None) -> None:
        if not refresh_token:
            return

        session = self.sessions.get_by_refresh_token_hash(hash_refresh_token(refresh_token))
        if session is None or session.revoked_at is not None:
            return

        self.sessions.revoke(session)

    def get_current_user(self, access_token: str) -> UserRead:
        try:
            payload = decode_access_token(access_token)
        except jwt.InvalidTokenError as exc:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.") from exc

        session_id = payload.get("session_id")
        user_id = payload.get("sub")
        if not session_id or not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")

        session = self.sessions.get_by_id(UUID(session_id))
        user = self._validate_session_with_user(session, expected_user_id=UUID(user_id))
        return UserRead.model_validate(user)

    def ensure_default_admin(self, payload: UserCreate) -> None:
        if self.users.get_by_email(payload.email) is not None:
            return

        user = User(
            email=payload.email.lower().strip(),
            full_name=payload.full_name.strip(),
            password_hash=hash_password(payload.password),
            role=payload.role.value,
            is_active=payload.is_active,
        )
        self.users.create(user)

    def _validate_session_with_user(self, session: UserSession | None, *, expected_user_id: UUID | None = None) -> User:
        now = datetime.now(timezone.utc)
        if session is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")

        expires_at = session.expires_at
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if session.revoked_at is not None or expires_at <= now:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")

        user = self.users.get_by_id(session.user_id)
        if user is None or not user.is_active:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")

        if expected_user_id is not None and user.id != expected_user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")

        return user
