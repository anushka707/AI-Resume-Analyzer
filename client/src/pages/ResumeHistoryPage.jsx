import { useQuery } from '@tanstack/react-query';

import LoadingSpinner from '../components/LoadingSpinner';
import ResumeCard from '../components/ResumeCard';
import { getResumeHistory } from '../services/resumeService';

export default function ResumeHistoryPage() {
  const { data: resumes = [], isLoading } = useQuery({
    queryKey: ['resume-history'],
    queryFn: getResumeHistory,
  });

  if (isLoading) {
    return <LoadingSpinner label="Loading resume history" />;
  }

  return (
    <section className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold text-ink">Resume history</h1>
      <div className="mt-6 grid gap-4">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
        {!resumes.length ? (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Your analyzed resumes will appear here.
          </div>
        ) : null}
      </div>
    </section>
  );
}

