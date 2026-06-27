import { CalendarDays, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResumeCard({ resume }) {
  return (
    <Link
      to={`/dashboard/resume/${resume.id}`}
      className="block rounded-md border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-cyan-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-slate-100 text-slate-700">
            <FileText size={19} />
          </span>
          <div>
            <h3 className="font-semibold text-ink">{resume.file_name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <CalendarDays size={15} />
              {new Date(resume.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span className="rounded-md bg-cyan-50 px-3 py-1 text-sm font-bold text-ocean">
          {resume.ats_score}%
        </span>
      </div>
    </Link>
  );
}

