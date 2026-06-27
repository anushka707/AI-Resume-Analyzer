from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.schemas.auth import SignupRequest


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def signup(self, payload: SignupRequest) -> tuple[User, str]:
        existing_user = self.db.scalar(select(User).where(User.email == payload.email.lower()))
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists.",
            )

        user = User(
            name=payload.name.strip(),
            email=payload.email.lower(),
            hashed_password=hash_password(payload.password),
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user, create_access_token(str(user.id), {"email": user.email})

    def login(self, email: str, password: str) -> tuple[User, str]:
        user = self.db.scalar(select(User).where(User.email == email.lower()))
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )
        return user, create_access_token(str(user.id), {"email": user.email})

