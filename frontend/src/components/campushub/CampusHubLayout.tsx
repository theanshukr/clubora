import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CampusHubLogoMark } from './CampusHubLogo';

interface CampusHubLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

export default function CampusHubLayout({ children, isAdmin }: CampusHubLayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = location.pathname;

  const navLinks = isAdmin
    ? [
        { to: '/campushub/admin', label: 'Dashboard', icon: GridIcon },
        { to: '/campushub/admin/events', label: 'Events', icon: CalendarIcon },
        { to: '/campushub/admin/clubs', label: 'Clubs', icon: ClubIcon },
        { to: '/campushub/admin/registrations', label: 'Registrations', icon: UsersIcon },
      ]
    : [
        { to: '/campushub', label: 'Home', icon: HomeIcon },
        { to: '/campushub/events', label: 'Events', icon: CalendarIcon },
        { to: '/campushub/clubs', label: 'Clubs', icon: ClubIcon },
        { to: '/campushub/about', label: 'About', icon: InfoIcon },
      ];

  const isActive = (to: string) => {
    if (to === '/campushub' || to === '/campushub/admin') return path === to;
    return path === to || path.startsWith(to + '/');
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '0 20px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <Link to={isAdmin ? "/campushub/admin" : "/campushub"} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(225,29,72,0.35))' }}>
            <CampusHubLogoMark size={36} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px', color: '#111', fontFamily: "'Righteous', sans-serif" }}>CampusHub</span>
            {isAdmin && (
              <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', background: '#FFF1F2', color: '#E11D48', padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(225,29,72,0.2)' }}>
                Admin
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hide-mobile" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {navLinks.map(link => {
            const active = isActive(link.to);
            return (
              <Link key={link.to} to={link.to} style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 10, border: 'none',
                  background: active ? '#FFF1F2' : 'transparent',
                  color: active ? '#E11D48' : '#475569',
                  fontWeight: active ? 700 : 500,
                  fontSize: 14, cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.18s ease',
                  borderBottom: active ? '2px solid #E11D48' : '2px solid transparent'
                }}>
                  <link.icon size={16} color={active ? '#E11D48' : '#64748B'} />
                  {link.label}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {!isAdmin && (
            <Link to="/campushub/admin" style={{ textDecoration: 'none' }}>
              <button id="admin-btn" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 10, border: '1.5px solid #E11D48',
                background: 'transparent', color: '#E11D48',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.18s',
              }}>
                <ShieldIcon size={14} color="#E11D48" />
                <span>Admin</span>
              </button>
            </Link>
          )}
          {!isAdmin && (
            <Link to="/campushub/events" className="hide-mobile" style={{ textDecoration: 'none' }}>
              <button id="hero-explore-btn" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 10,
                background: 'linear-gradient(135deg, #E11D48, #7C3AED)',
                border: 'none', color: '#fff',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 4px 14px rgba(225,29,72,0.35)',
              }}>
                Explore
                <ArrowRightIcon size={14} color="#fff" />
              </button>
            </Link>
          )}
          {isAdmin && (
            <Link to="/campushub" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 10, border: '1.5px solid #CBD5E1',
                background: '#fff', color: '#334155',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.18s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <ArrowLeftIcon size={14} color="#475569" />
                <span>Student View</span>
              </button>
            </Link>
          )}

          {/* Mobile hamburger for both admin and public view */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              background: '#fff',
              cursor: 'pointer'
            }}
            className="show-mobile-flex"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#334155' }}>
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
          animation: 'fadeInUp 0.2s ease',
          position: 'sticky',
          top: 64,
          zIndex: 99
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', padding: '4px 8px' }}>
            {isAdmin ? 'Admin Navigation' : 'Menu'}
          </div>
          {navLinks.map(link => {
            const active = isActive(link.to);
            return (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 8,
                  background: active ? '#FFF1F2' : 'transparent',
                  color: active ? '#E11D48' : '#334155',
                  fontWeight: active ? 700 : 500,
                  fontSize: 14,
                }}>
                  <link.icon size={16} color={active ? '#E11D48' : '#64748B'} />
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <main>{children}</main>

      {/* Footer */}
      {!isAdmin && (
        <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '48px 32px 28px', marginTop: 80 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ filter: 'drop-shadow(0 2px 6px rgba(225,29,72,0.4))' }}>
                  <CampusHubLogoMark size={34} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', fontFamily: "'Righteous', sans-serif" }}>CampusHub</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>Discover. Register. Experience Campus. Your one-stop platform for all college club events.</p>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Links</div>
              {[
                { to: '/campushub', label: 'Home' },
                { to: '/campushub/events', label: 'All Events' },
                { to: '/campushub/about', label: 'About' },
              ].map(l => (
                <div key={l.to} style={{ marginBottom: 8 }}>
                  <Link to={l.to} style={{ color: '#94A3B8', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}>{l.label}</Link>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tagline</div>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#E11D48', fontFamily: "'Righteous', sans-serif", lineHeight: 1.4 }}>"Discover. Register.<br/>Experience Campus."</p>
            </div>
          </div>
          <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: 13 }}>
            © 2026 CampusHub. Built for students, by students.
          </div>
        </footer>
      )}
    </div>
  );
}

// ── Inline SVG Icons ────────────────────────────────────────────────────────────
function HomeIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function CalendarIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function GridIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}
function UsersIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function InfoIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}
function ShieldIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function ArrowRightIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function ClubIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}
function ArrowLeftIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}
