import { ClipboardCheck, FileClock, Gauge, Upload, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Overview', icon: Gauge },
  { to: '/dashboard/upload', label: 'Upload', icon: Upload },
  { to: '/dashboard/history', label: 'History', icon: FileClock },
  { to: '/dashboard/compare', label: 'Compare', icon: ClipboardCheck },
  { to: '/dashboard/profile', label: 'Profile', icon: UserRound },
];

export default function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white lg:min-h-[calc(100vh-4rem)] lg:w-64 lg:border-b-0 lg:border-r">
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:block lg:px-4">
        {links.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `mb-1 flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                isActive ? 'bg-cyan-50 text-ocean' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

