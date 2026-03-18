from pydantic import BaseModel, EmailStr, Field

from backend.app.schemas.user import UserRead


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class AuthSessionRead(BaseModel):
    user: UserRead
