from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.resume import (
    AnalyzeResumeRequest,
    JobDescriptionRequest,
    JobDescriptionResponse,
    ResumeAnalysis,
    ResumeResponse,
    ResumeSummary,
)
from app.services.pdf_service import extract_pdf_text
from app.services.resume_service import ResumeService

router = APIRouter(tags=["Resumes"])


@router.post("/upload-resume", response_model=ResumeResponse, status_code=201)
async def upload_resume(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    file: UploadFile = File(...),
) -> ResumeResponse:
    resume_text = await extract_pdf_text(file)
    return ResumeService(db).create_resume(current_user, file.filename or "resume.pdf", resume_text)


@router.post("/analyze-resume", response_model=ResumeAnalysis)
def analyze_resume(
    payload: AnalyzeResumeRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> ResumeAnalysis:
    return ResumeService(db).analyze_text(payload.resume_text)


@router.post("/compare-job-description", response_model=JobDescriptionResponse)
def compare_job_description(
    payload: JobDescriptionRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> JobDescriptionResponse:
    return ResumeService(db).compare_job_description(
        current_user, payload.description, payload.resume_id
    )


@router.get("/resume-history", response_model=list[ResumeSummary])
def resume_history(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> list[ResumeSummary]:
    return ResumeService(db).list_resumes(current_user)


@router.get("/resume/{resume_id}", response_model=ResumeResponse)
def resume_details(
    resume_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> ResumeResponse:
    return ResumeService(db).get_resume(current_user, resume_id)


@router.delete("/resume/{resume_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_resume(
    resume_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> None:
    ResumeService(db).delete_resume(current_user, resume_id)

