from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.models.session import UserSession


class SessionRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, session_id: UUID) -> UserSession | None:
        return self.db.get(UserSession, session_id)

    def get_by_refresh_token_hash(self, refresh_token_hash: str) -> UserSession | None:
        statement = select(UserSession).where(UserSession.refresh_token_hash == refresh_token_hash)
        return self.db.scalar(statement)

    def create(self, session: UserSession) -> UserSession:
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def update(self, session: UserSession) -> UserSession:
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def revoke(self, session: UserSession) -> UserSession:
        session.revoked_at = datetime.now(timezone.utc)
        return self.update(session)
