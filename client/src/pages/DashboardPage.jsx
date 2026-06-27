import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import ResumeCard from '../components/ResumeCard';
import StatCard from '../components/StatCard';
import { useAuth } from '../hooks/useAuth';
import { getResumeHistory } from '../services/resumeService';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: resumes = [] } = useQuery({
    queryKey: ['resume-history'],
    queryFn: getResumeHistory,
  });
  const latestScore = resumes[0]?.ats_score ?? 0;
  const averageScore = resumes.length
    ? Math.round(resumes.reduce((sum, resume) => sum + resume.ats_score, 0) / resumes.length)
    : 0;

  return (
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 text-slate-600">Welcome back, {user?.name}.</p>
        </div>
        <Link
          to="/dashboard/upload"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-ocean px-5 text-sm font-semibold text-white shadow-soft"
        >
          Upload resume
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Uploaded resumes" value={resumes.length} tone="ocean" />
        <StatCard label="Latest ATS score" value={`${latestScore}%`} tone="mint" />
        <StatCard label="Average score" value={`${averageScore}%`} tone="amber" />
      </div>
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">Recent resumes</h2>
          <Link to="/dashboard/history" className="text-sm font-semibold text-ocean">
            View all
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {resumes.slice(0, 4).map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
          {!resumes.length ? (
            <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-semibold text-ink">No resumes uploaded yet.</p>
              <p className="mt-2 text-sm text-slate-600">Upload a PDF to get your first analysis.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

