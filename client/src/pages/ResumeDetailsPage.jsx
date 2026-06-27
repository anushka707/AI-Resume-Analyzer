import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { deleteResume, getResume } from '../services/resumeService';

export default function ResumeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: resume, isLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => getResume(id),
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume-history'] });
      toast.success('Resume deleted.');
      navigate('/dashboard/history');
    },
    onError: () => toast.error('Could not delete resume.'),
  });

  if (isLoading) {
    return <LoadingSpinner label="Loading resume" />;
  }

  const analysis = JSON.parse(resume.analysis);

  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-ink">{resume.file_name}</h1>
          <p className="mt-1 text-slate-600">ATS score: {resume.ats_score}%</p>
        </div>
        <Button
          className="bg-coral hover:bg-red-700"
          isLoading={deleteMutation.isPending}
          onClick={() => deleteMutation.mutate()}
        >
          <Trash2 size={17} />
          Delete
        </Button>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">AI feedback</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {analysis.feedback.map((item) => (
              <li key={item} className="rounded-md bg-slate-50 p-3">
                {item}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 font-bold text-ink">Suggested stronger bullets</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-700">
            {analysis.stronger_bullets.map((item) => (
              <li key={item} className="rounded-md border border-slate-200 p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Extracted resume text</h2>
          <p className="mt-4 max-h-[620px] overflow-auto whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {resume.resume_text}
          </p>
        </div>
      </div>
    </section>
  );
}

