import { Mail, UserRound } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-ink">Profile</h1>
      <div className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-md bg-cyan-50 text-ocean">
            <UserRound size={26} />
          </span>
          <div>
            <p className="text-xl font-bold text-ink">{user?.name}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
              <Mail size={16} />
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

