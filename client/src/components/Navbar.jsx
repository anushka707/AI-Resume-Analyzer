import { FileText, LogOut, Menu } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { brand } from '../assets/brand';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white">
            <FileText size={19} />
          </span>
          <span>{brand.shortName}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-ocean' : '')}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'text-ocean' : '')}>
              Dashboard
            </NavLink>
          ) : null}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex min-h-10 items-center rounded-md bg-ink px-4 text-sm font-semibold text-white"
            >
              Login
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden"
            title="Menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}

