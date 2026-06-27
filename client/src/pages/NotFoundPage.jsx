import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="max-w-md text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-ocean">404</p>
        <h1 className="mt-3 text-4xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-md bg-ocean px-5 text-sm font-semibold text-white"
        >
          Go home
        </Link>
      </section>
    </main>
  );
}

