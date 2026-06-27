# Architecture

AI Resume Analyzer is organized around a clean separation between presentation, API routing, database models, schemas, and service-layer business logic.

- The React client owns UI state, routing, forms, authenticated navigation, and API calls.
- The FastAPI server owns authentication, resume parsing, scoring, persistence, and response shaping.
- PostgreSQL stores users, resumes, and job description comparisons.

The backend service layer is intentionally deterministic for local development and interview demos. A future AI provider can be added behind the same service interface.

