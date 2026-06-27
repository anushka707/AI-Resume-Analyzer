# AI Resume Analyzer

AI Resume Analyzer is a production-style full-stack portfolio project for uploading resumes, extracting text, scoring ATS readiness, comparing resumes to job descriptions, and tracking resume analysis history.

## Architecture

The project uses a monorepo layout with a React 19/Vite frontend and a FastAPI backend backed by PostgreSQL. Authentication uses JWT access tokens and hashed passwords. Resume analysis is implemented as a deterministic service layer so the application works locally without external AI keys.

```text
AI-Resume-Analyzer/
  client/          React, Vite, Tailwind CSS
  server/          FastAPI, SQLAlchemy, Alembic
  docs/            Project documentation
  screenshots/     Product screenshots for GitHub
```

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, React Router, Axios, React Query, React Hook Form, Context API
- Backend: FastAPI, SQLAlchemy, PostgreSQL, JWT, Pydantic, Alembic, Uvicorn
- Tooling: Docker, Docker Compose, ESLint, Prettier

## Installation

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Start the full stack:

```bash
docker compose up --build
```

3. Open the app:

```text
http://localhost:5173
```

API docs are available at:

```text
http://localhost:8000/docs
```

## Local Development

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend:

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | SQLAlchemy PostgreSQL connection string |
| `JWT_SECRET_KEY` | Secret key used to sign JWT tokens |
| `JWT_ALGORITHM` | JWT signing algorithm |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | Access token lifetime |
| `VITE_API_BASE_URL` | Frontend API base URL |

## API Documentation

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/signup` | Create a user account |
| `POST` | `/login` | Authenticate and receive an access token |
| `POST` | `/upload-resume` | Upload a PDF resume and store extracted analysis |
| `POST` | `/analyze-resume` | Analyze raw resume text |
| `POST` | `/compare-job-description` | Compare latest resume against a job description |
| `GET` | `/resume-history` | List authenticated user's resumes |
| `GET` | `/resume/{id}` | Fetch resume details |
| `DELETE` | `/resume/{id}` | Delete a resume |

## Folder Structure

```text
client/src/
  assets/
  components/
  context/
  hooks/
  layouts/
  pages/
  routes/
  services/
  utils/

server/app/
  api/
  core/
  db/
  middleware/
  models/
  schemas/
  services/
  utils/
```

## Screenshots

Add screenshots to `screenshots/` and reference them here when publishing the project.

## Future Improvements

- Add OpenAI-powered feedback as an optional provider.
- Add asynchronous background processing for large resumes.
- Add exportable PDF reports.
- Add team workspaces and role-based access control.
- Add integration tests with a disposable PostgreSQL container.

## Deployment

The app can be deployed with Docker Compose on a VPS or split across managed services such as Vercel for the frontend, Render/Fly.io for the API, and Neon/RDS for PostgreSQL.

