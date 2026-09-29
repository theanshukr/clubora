import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// ─── CampusHub pages (code-split) ─────────────────────────────────────────────
const CampusHubHome        = lazy(() => import('./components/campushub/CampusHubHome'));
const CampusHubEvents      = lazy(() => import('./components/campushub/CampusHubEvents'));
const CampusHubEventDetail = lazy(() => import('./components/campushub/CampusHubEventDetail'));
const CampusHubRegister    = lazy(() => import('./components/campushub/CampusHubRegister'));
const CampusHubAdmin       = lazy(() => import('./components/campushub/CampusHubAdmin'));
const CampusHubAbout       = lazy(() => import('./components/campushub/CampusHubAbout'));
const CampusHubClubsPage   = lazy(() => import('./components/campushub/CampusHubClubs').then(m => ({ default: m.CampusHubClubsPage })));
const CampusHubClubDetail  = lazy(() => import('./components/campushub/CampusHubClubs').then(m => ({ default: m.CampusHubClubDetail })));

// ─── Suspense fallback ────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          border: '3px solid #f1f5f9',
          borderTopColor: '#E11D48',
          animation: 'spin 1s linear infinite'
        }} />
        <span style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Loading...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* Redirect root → CampusHub */}
        <Route path="/" element={<Navigate to="/campushub" replace />} />

        {/* CampusHub */}
        <Route path="/campushub"                        element={<CampusHubHome />} />
        <Route path="/campushub/events"                 element={<CampusHubEvents />} />
        <Route path="/campushub/events/:id"             element={<CampusHubEventDetail />} />
        <Route path="/campushub/events/:id/register"    element={<CampusHubRegister />} />
        <Route path="/campushub/about"                  element={<CampusHubAbout />} />
        <Route path="/campushub/clubs"                  element={<CampusHubClubsPage />} />
        <Route path="/campushub/clubs/:clubId"          element={<CampusHubClubDetail />} />
        <Route path="/campushub/admin"                  element={<CampusHubAdmin />} />
        <Route path="/campushub/admin/events"           element={<CampusHubAdmin />} />
        <Route path="/campushub/admin/clubs"            element={<CampusHubAdmin />} />
        <Route path="/campushub/admin/registrations"    element={<CampusHubAdmin />} />

        {/* Catch-all → CampusHub */}
        <Route path="*" element={<Navigate to="/campushub" replace />} />
      </Routes>
    </Suspense>
  );
}
