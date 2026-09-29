import React from 'react';
import { Link } from 'react-router-dom';
import CampusHubLayout from './CampusHubLayout';
import { CampusHubLogoMark } from './CampusHubLogo';

const CLUBS = [
  { name: 'Coding Club',        desc: 'Technical workshops, hackathons, and competitive programming.', color: '#2563EB', bg: 'rgba(37,99,235,0.08)',   id: 'coding-club',        icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { name: 'Cultural Committee', desc: 'Dance, music, drama, and cultural festivals.',                  color: '#7C3AED', bg: 'rgba(124,58,237,0.08)',  id: 'cultural-committee', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
  { name: 'Sports Committee',   desc: 'Cricket, football, basketball tournaments and more.',           color: '#059669', bg: 'rgba(5,150,105,0.08)',   id: 'sports-committee',   icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24"/><path d="M14.83 9.17l4.24-4.24"/><path d="M14.83 14.83l4.24 4.24"/><path d="M9.17 14.83l-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg> },
  { name: 'AI Club',            desc: 'Machine learning workshops and AI project showcases.',          color: '#0891B2', bg: 'rgba(8,145,178,0.08)',   id: 'ai-club',            icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h.01"/><path d="M12 8h.01"/><path d="M17 8h.01"/><path d="M7 12h10"/></svg> },
  { name: 'E-Cell',             desc: 'Entrepreneurship seminars, startup pitches, and mentorship.',   color: '#D97706', bg: 'rgba(217,119,6,0.08)',   id: 'ecell',              icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L8 8H3l4 4-1.5 6L12 15l6.5 3L17 12l4-4h-5z"/></svg> },
  { name: 'Literary Club',      desc: 'Debates, quizzes, writing competitions, and open mics.',        color: '#DC2626', bg: 'rgba(220,38,38,0.08)',   id: 'literary-club',      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
];

const STATS = [
  { value: '6+',    label: 'Active Clubs',     icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { value: '500+',  label: 'Students Joined',  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { value: '50+',   label: 'Events Hosted',    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { value: '₹1L+',  label: 'Prize Pool',       icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg> },
];

const VALUES = [
  { title: 'Community First',   desc: 'We build for students, by students. Every feature is designed around real campus needs.',       color: '#E11D48' },
  { title: 'Centralized Info',  desc: 'No more scattered WhatsApp groups. All events in one beautiful, searchable platform.',           color: '#7C3AED' },
  { title: 'Open to All',       desc: 'Every student, regardless of year or department, is welcome to explore and participate.',         color: '#2563EB' },
  { title: 'Always Improving',  desc: 'We constantly iterate based on student feedback to make CampusHub better every semester.',       color: '#059669' },
];

export default function CampusHubAbout() {
  return (
    <CampusHubLayout>

      {/* ── Hero banner ────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', padding: '64px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(225,29,72,0.15), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ filter: 'drop-shadow(0 4px 16px rgba(225,29,72,0.5))' }}>
              <CampusHubLogoMark size={56} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#FDA4AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>About Us</div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', margin: 0, fontFamily: "'Righteous', sans-serif" }}>
                About <span style={{ background: 'linear-gradient(135deg, #FB7185, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CampusHub</span>
              </h1>
            </div>
          </div>
          <p style={{ color: '#94A3B8', fontSize: 17, lineHeight: 1.8, maxWidth: 640, marginBottom: 40 }}>
            CampusHub is a centralized platform that connects students with every club, event, and opportunity on campus —
            so you never miss what matters.
          </p>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: '#fff', fontFamily: "'Righteous', sans-serif", letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 32px' }}>

        {/* ── Mission ───────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 56 }}>
          <div style={{ background: 'linear-gradient(135deg, #FFF1F2, #FAF5FF)', borderRadius: 20, padding: 32, border: '1px solid rgba(225,29,72,0.1)' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #E11D48, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: 10 }}>Our Mission</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 14 }}>
              To solve the problem of scattered event info across WhatsApp groups and Instagram posts —
              one centralized, beautiful platform for every student.
            </p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', borderRadius: 20, padding: 32, border: '1px solid rgba(37,99,235,0.1)' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: 10 }}>Our Vision</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 14 }}>
              To become the go-to digital campus companion — expanding into club management,
              attendance, certificates, and campus-wide announcements.
            </p>
          </div>
        </div>

        {/* ── Values ───────────────────────────────────────────────────────── */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: 6 }}>What We Stand For</h2>
        <p style={{ color: '#64748B', fontSize: 14, marginBottom: 28 }}>The principles that guide everything we build</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 56 }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: v.color, marginBottom: 14 }} />
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 8 }}>{v.title}</div>
              <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65 }}>{v.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Clubs ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>Our Clubs</h2>
          <Link to="/campushub/clubs" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', borderRadius: 10, border: '1.5px solid #E11D48', background: 'transparent', color: '#E11D48', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
              View All Clubs →
            </button>
          </Link>
        </div>
        <p style={{ color: '#64748B', fontSize: 14, marginBottom: 28 }}>Six active clubs powering campus life</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 56 }}>
          {CLUBS.map(club => (
            <Link key={club.id} to={`/campushub/clubs/${club.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff', borderRadius: 18, padding: 24,
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 28px rgba(0,0,0,0.09)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 14, background: club.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid ${club.color}22` }}>
                  {club.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 6 }}>{club.name}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{club.desc}</div>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: club.color }}>Explore →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Tagline banner ───────────────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', borderRadius: 22, padding: '44px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(225,29,72,0.12), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ filter: 'drop-shadow(0 4px 16px rgba(225,29,72,0.6))' }}>
              <CampusHubLogoMark size={52} />
            </div>
          </div>
          <p style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 800, background: 'linear-gradient(135deg, #FB7185, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: 20 }}>
            "Discover. Register. Experience Campus."
          </p>
          <Link to="/campushub/events" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '13px 36px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #E11D48, #7C3AED)', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: '0 8px 24px rgba(225,29,72,0.4)' }}>
              Explore Events →
            </button>
          </Link>
        </div>

      </div>
    </CampusHubLayout>
  );
}
