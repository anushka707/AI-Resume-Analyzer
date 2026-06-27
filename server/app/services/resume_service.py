import json

from fastapi import HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.models.job_description import JobDescription
from app.models.resume import Resume
from app.models.user import User
from app.schemas.resume import JobDescriptionResponse, ResumeAnalysis
from app.services.analyzer_service import analyze_resume_text, compare_resume_to_job


class ResumeService:
    def __init__(self, db: Session):
        self.db = db

    def create_resume(self, user: User, file_name: str, resume_text: str) -> Resume:
        analysis = analyze_resume_text(resume_text)
        resume = Resume(
            user_id=user.id,
            file_name=file_name,
            resume_text=resume_text,
            ats_score=analysis.ats_score,
            analysis=analysis.model_dump_json(),
        )
        self.db.add(resume)
        self.db.commit()
        self.db.refresh(resume)
        return resume

    def analyze_text(self, resume_text: str) -> ResumeAnalysis:
        return analyze_resume_text(resume_text)

    def list_resumes(self, user: User) -> list[Resume]:
        return list(
            self.db.scalars(
                select(Resume).where(Resume.user_id == user.id).order_by(desc(Resume.created_at))
            )
        )

    def get_resume(self, user: User, resume_id: int) -> Resume:
        resume = self.db.scalar(
            select(Resume).where(Resume.id == resume_id, Resume.user_id == user.id)
        )
        if not resume:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found.")
        return resume

    def delete_resume(self, user: User, resume_id: int) -> None:
        resume = self.get_resume(user, resume_id)
        self.db.delete(resume)
        self.db.commit()

    def compare_job_description(
        self, user: User, description: str, resume_id: int | None
    ) -> JobDescriptionResponse:
        resume = (
            self.get_resume(user, resume_id)
            if resume_id
            else self.db.scalar(
                select(Resume)
                .where(Resume.user_id == user.id)
                .order_by(desc(Resume.created_at))
                .limit(1)
            )
        )
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Upload a resume before comparing a job description.",
            )

        result = compare_resume_to_job(resume.resume_text, description)
        comparison = JobDescription(
            user_id=user.id,
            description=description,
            match_score=result.match_score,
            missing_keywords=json.dumps(result.missing_keywords),
        )
        self.db.add(comparison)
        self.db.commit()
        return result

