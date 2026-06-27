import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  'ATS readiness scoring',
  'Job description matching',
  'Missing keyword discovery',
  'Bullet point strengthening',
];

export default function LandingPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-ocean">
              <Sparkles size={16} />
              Interview-ready resume intelligence
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-ink sm:text-5xl lg:text-6xl">
              AI Resume Analyzer
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Upload a PDF resume, get a practical ATS score, compare against real job
              descriptions, and turn vague bullets into stronger engineering impact statements.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ocean px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-cyan-800"
              >
                Start analyzing <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                I already have an account
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="text-mint" size={18} />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-5 shadow-soft">
            <div className="rounded-md bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Resume score</p>
                  <p className="text-4xl font-bold text-ocean">86%</p>
                </div>
                <FileSearch className="text-ocean" size={42} />
              </div>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>ATS keywords</span>
                    <span>Strong</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-4/5 rounded-full bg-ocean" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>Impact metrics</span>
                    <span>Needs work</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-1/2 rounded-full bg-amber" />
                  </div>
                </div>
                <div className="rounded-md border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <div className="mb-2 flex items-center gap-2 font-bold">
                    <ShieldCheck size={18} />
                    Recommended action
                  </div>
                  Add quantified outcomes to the top two project bullets and include PostgreSQL,
                  Docker, and API security where relevant.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
