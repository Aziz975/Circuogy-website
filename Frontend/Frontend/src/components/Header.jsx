import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth.js";

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-ink-900 text-white" : "text-ink-800 hover:bg-white"
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const adminLoggedIn = isAuthenticated();
  const isAdminArea = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-30 border-b border-ink-800/10 bg-ink-50/90 backdrop-blur">
      <div className="page-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-sm font-bold text-white">
            NJ
          </span>
          <span className="text-lg font-semibold tracking-tight">Northline Journal</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          {adminLoggedIn && isAdminArea ? (
            <NavLink to="/admin/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          ) : (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <button
          type="button"
          className="rounded-full border border-ink-800/15 px-3 py-2 text-sm sm:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="page-shell flex flex-col gap-2 pb-4 sm:hidden">
          <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to={adminLoggedIn && isAdminArea ? "/admin/dashboard" : "/admin"}
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            {adminLoggedIn && isAdminArea ? "Dashboard" : "Admin"}
          </NavLink>
        </div>
      ) : null}
    </header>
  );
}
