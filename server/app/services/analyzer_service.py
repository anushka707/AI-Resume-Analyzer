from app.schemas.resume import JobDescriptionResponse, ResumeAnalysis
from app.utils.text import normalize_words

CORE_SKILLS = {
    "python",
    "javascript",
    "typescript",
    "react",
    "fastapi",
    "sql",
    "postgresql",
    "docker",
    "aws",
    "testing",
    "api",
    "leadership",
    "architecture",
    "security",
    "ci",
    "git",
}

ACTION_VERBS = {
    "built",
    "designed",
    "delivered",
    "improved",
    "reduced",
    "increased",
    "automated",
    "led",
    "optimized",
}


def analyze_resume_text(resume_text: str) -> ResumeAnalysis:
    words = normalize_words(resume_text)
    detected_keywords = sorted(words.intersection(CORE_SKILLS))
    missing_skills = sorted(CORE_SKILLS.difference(words))[:8]
    has_metrics = any(char.isdigit() for char in resume_text)
    action_verb_count = len(words.intersection(ACTION_VERBS))

    score = 45 + min(len(detected_keywords) * 3.2, 32) + (12 if has_metrics else 0)
    score += min(action_verb_count * 2.5, 11)
    ats_score = round(min(score, 98), 1)

    feedback = [
        "Your resume includes relevant technical keywords for modern software engineering roles."
        if detected_keywords
        else "Add role-specific technical keywords so applicant tracking systems can classify your profile.",
        "Quantified impact is visible and strengthens the resume."
        if has_metrics
        else "Add measurable outcomes such as latency reduced, revenue protected, users served, or time saved.",
        "Use more action-led bullets that start with ownership and end with measurable business impact."
        if action_verb_count < 4
        else "Action verbs are present and help communicate ownership.",
    ]

    stronger_bullets = [
        "Designed and shipped a scalable service that reduced processing time by 35% for high-volume workflows.",
        "Led cross-functional delivery of a customer-facing feature, improving activation and reducing manual support.",
        "Automated regression checks in CI, cutting release validation time while increasing deployment confidence.",
    ]

    return ResumeAnalysis(
        ats_score=ats_score,
        feedback=feedback,
        stronger_bullets=stronger_bullets,
        missing_skills=missing_skills,
        detected_keywords=detected_keywords,
    )


def compare_resume_to_job(resume_text: str, job_description: str) -> JobDescriptionResponse:
    resume_words = normalize_words(resume_text)
    job_words = normalize_words(job_description)
    meaningful_job_words = {
        word for word in job_words if len(word) > 3 and word not in {"with", "that", "from", "this"}
    }
    matched_words = meaningful_job_words.intersection(resume_words)
    missing_keywords = sorted(meaningful_job_words.difference(resume_words))[:12]
    match_score = round((len(matched_words) / max(len(meaningful_job_words), 1)) * 100, 1)
    suggested_skills = [word for word in missing_keywords if word in CORE_SKILLS][:8]

    feedback = [
        "The resume aligns well with the job description."
        if match_score >= 70
        else "Tailor the summary and top experience bullets to mirror the job description's highest-value keywords.",
        "Add missing skills only where you can connect them to real project experience.",
        "Move the most relevant technologies into the first half of the resume for stronger recruiter scanning.",
    ]

    return JobDescriptionResponse(
        match_score=match_score,
        missing_keywords=missing_keywords,
        suggested_skills=suggested_skills,
        feedback=feedback,
    )

