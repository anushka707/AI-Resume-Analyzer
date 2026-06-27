import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../components/Button';
import { compareJobDescription, getResumeHistory } from '../services/resumeService';

export default function JobComparisonPage() {
  const [description, setDescription] = useState('');
  const [resumeId, setResumeId] = useState('');
  const { data: resumes = [] } = useQuery({
    queryKey: ['resume-history'],
    queryFn: getResumeHistory,
  });
  const comparison = useMutation({
    mutationFn: compareJobDescription,
    onError: (error) => toast.error(error.response?.data?.detail || 'Comparison failed.'),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    comparison.mutate({
      description,
      resume_id: resumeId ? Number(resumeId) : null,
    });
  };

  return (
    <section className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold text-ink">Job description comparison</h1>
      <p className="mt-2 text-slate-600">Compare a resume against a target role and find keyword gaps.</p>
      <form onSubmit={handleSubmit} className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Resume</span>
          <select
            value={resumeId}
            onChange={(event) => setResumeId(event.target.value)}
            className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-cyan-100"
          >
            <option value="">Latest uploaded resume</option>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.file_name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Job description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={10}
            minLength={40}
            required
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-cyan-100"
          />
        </label>
        <Button type="submit" className="mt-5" isLoading={comparison.isPending}>
          Compare
        </Button>
      </form>
      {comparison.data ? (
        <div className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-slate-500">Match percentage</p>
          <p className="mt-1 text-4xl font-bold text-ocean">{comparison.data.match_score}%</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h2 className="font-bold text-ink">Missing keywords</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {comparison.data.missing_keywords.map((keyword) => (
                  <span key={keyword} className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-ink">Feedback</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {comparison.data.feedback.map((item) => (
                  <li key={item} className="rounded-md bg-cyan-50 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

