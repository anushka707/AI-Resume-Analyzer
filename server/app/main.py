from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.resumes import router as resumes_router
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine
from app.middleware.errors import register_exception_handlers

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0",
    description="Resume parsing, ATS analysis, and job description matching API.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(auth_router)
app.include_router(resumes_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}

