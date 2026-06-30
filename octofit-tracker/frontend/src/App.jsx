import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import { Activities } from './components/Activities.jsx';
import { Leaderboard } from './components/Leaderboard.jsx';
import { Teams } from './components/Teams.jsx';
import { Users } from './components/Users.jsx';
import { Workouts } from './components/Workouts.jsx';
import { apiBaseUrl, codespaceName, codespaceNote } from './lib/api.js';

const navigationItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <section className="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row gap-4 align-items-lg-center justify-content-between">
          <div>
            <p className="text-uppercase text-secondary fw-semibold mb-2">OctoFit Tracker</p>
            <h1 className="display-6 fw-bold mb-3">React 19 presentation tier</h1>
            <p className="lead mb-0">
              Use the navigation to load users, teams, activities, leaderboard, and workouts from the
              API.
            </p>
          </div>
          <div className="text-lg-end">
            <div className="small text-uppercase text-secondary fw-semibold">API Base URL</div>
            <div className="fw-semibold text-break">{apiBaseUrl}</div>
            <div className="small text-secondary mt-2">
              {codespaceName ? `Codespaces environment: ${codespaceName}` : 'Running locally'}
            </div>
          </div>
        </div>

        <div className="alert alert-info mt-4 mb-0" role="note">
          <strong>Environment note:</strong> {codespaceNote} Define <code>VITE_CODESPACE_NAME</code> in
          <code>.env.local</code> when running inside Codespaces.
        </div>
      </div>
    </section>
  );
}

export function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-white sticky-top">
        <div className="container py-3 d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="brand-mark">OF</div>
            <div>
              <div className="fw-bold">OctoFit Tracker</div>
              <div className="small text-secondary">Multi-tier fitness dashboard</div>
            </div>
          </div>
          <nav className="d-flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  `btn btn-sm rounded-pill ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
    </div>
  );
}