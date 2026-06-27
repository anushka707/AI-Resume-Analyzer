from datetime import datetime

from pydantic import BaseModel, Field


class ResumeAnalysis(BaseModel):
    ats_score: float
    feedback: list[str]
    stronger_bullets: list[str]
    missing_skills: list[str]
    detected_keywords: list[str]


class ResumeResponse(BaseModel):
    id: int
    file_name: str
    resume_text: str
    ats_score: float
    analysis: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ResumeSummary(BaseModel):
    id: int
    file_name: str
    ats_score: float
    created_at: datetime

    model_config = {"from_attributes": True}


class AnalyzeResumeRequest(BaseModel):
    resume_text: str = Field(min_length=40)


class JobDescriptionRequest(BaseModel):
    description: str = Field(min_length=40)
    resume_id: int | None = None


class JobDescriptionResponse(BaseModel):
    match_score: float
    missing_keywords: list[str]
    suggested_skills: list[str]
    feedback: list[str]

