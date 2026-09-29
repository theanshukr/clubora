import React from 'react';
import { Link } from 'react-router-dom';
import CampusHubLayout from './CampusHubLayout';
import EventCard from './EventCard';
import { SEED_EVENTS, CATEGORY_COLORS, ALL_CATEGORIES } from '../../data/campusHubData';
import type { EventCategory } from '../../data/campusHubData';
import heroImg from '../../assets/hero.png';

const STATS = [
  { value: '6+', label: 'Events', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { value: '6', label: 'Clubs', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { value: '500+', label: 'Students', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { value: 'Rs1L+', label: 'In Prizes', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
];

const CLUBS = [
  { name: 'Coding Club', desc: 'Hackathons and tech talks', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80', color: '#2563EB' },
  { name: 'Cultural Committee', desc: 'Arts, dance and drama', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80', color: '#7C3AED' },
  { name: 'Sports Committee', desc: 'Cricket, football and more', img: 'https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=200&q=80', color: '#059669' },
  { name: 'AI Club', desc: 'ML workshops and research', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200&q=80', color: '#0891B2' },
  { name: 'E-Cell', desc: 'Startup ecosystem', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=200&q=80', color: '#D97706' },
  { name: 'Literary Club', desc: 'Debates and quizzes', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80', color: '#DC2626' },
];

export default function CampusHubHome() {
  const featured = SEED_EVENTS[0];
  const upcoming = SEED_EVENTS.slice(1, 4);

  return (
    <CampusHubLayout>
      {/* HERO */}
      <section className="hero-padding-mobile" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #1E0A2E 100%)', padding: '80px 48px 100px' }}>
        {/* Radial glows */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(225,29,72,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)', pointerEvents: 'none' }} />

        <div className="flex-col-mobile" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>

          {/* LEFT — Text content */}
          <div className="w-full-mobile text-center-mobile" style={{ flex: '1 1 480px', maxWidth: 580 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(225,29,72,0.15)', border: '1px solid rgba(225,29,72,0.3)', borderRadius: 999, padding: '6px 18px', marginBottom: 28 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#E11D48"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span style={{ color: '#FDA4AF', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>Your Campus. Your Clubs. Your Events.</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20, fontFamily: "'Righteous', sans-serif" }}>
              Discover.{' '}
              <span style={{ background: 'linear-gradient(135deg, #FB7185, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Register.</span>
              <br />Experience Campus.
            </h1>

            <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#94A3B8', maxWidth: 480, marginBottom: 40, lineHeight: 1.75 }}>
              Discover what's happening around your campus and never miss an event again. All clubs, all events, one platform.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'inherit' }}>
              <Link to="/campushub/events" style={{ textDecoration: 'none' }}>
                <button id="hero-explore-btn" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '15px 36px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #E11D48, #7C3AED)', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: '0 8px 32px rgba(225,29,72,0.45)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Explore Events
                </button>
              </Link>
              <Link to="/campushub/clubs" style={{ textDecoration: 'none' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>View Clubs</button>
              </Link>
            </div>

            {/* Quick stats row */}
            <div style={{ display: 'flex', gap: 32, marginTop: 48, justifyContent: 'inherit' }}>
              {[{ v: '6+', l: 'Clubs' }, { v: '500+', l: 'Students' }, { v: '₹1L+', l: 'In Prizes' }].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', fontFamily: "'Righteous', sans-serif", letterSpacing: '-0.03em' }}>{s.v}</div>
                  <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Floating hero image */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Glow behind image */}
            <div style={{
              position: 'absolute', width: 340, height: 340, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 0,
            }} />
            <img
              src={heroImg}
              alt="CampusHub platform illustration"
              style={{
                width: 'clamp(240px, 28vw, 420px)',
                height: 'auto',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 24px 48px rgba(124,58,237,0.4)) drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
                animation: 'heroFloat 4s ease-in-out infinite',
              }}
            />
            <style>{`
              @keyframes heroFloat {
                0%, 100% { transform: translateY(0px) rotate(-1deg); }
                50% { transform: translateY(-18px) rotate(1deg); }
              }
            `}</style>
          </div>

        </div>

        {/* Bottom wave */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 50 }}><path d="M0,50 C360,0 1080,50 1440,20 L1440,50 Z" fill="#F8FAFC"/></svg>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#F8FAFC', padding: '0 32px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginTop: -30, position: 'relative', zIndex: 10 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 18, padding: '24px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', fontFamily: "'Righteous', sans-serif" }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EVENT */}
      <section className="padding-mobile" style={{ padding: '0 32px 70px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, gap: 16 }}>
            <div className="text-center-mobile w-full-mobile">
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E11D48', display: 'block', marginBottom: 4 }}>Spotlight</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>Featured Event</h2>
            </div>
          </div>
          <EventCard event={featured} featured />
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="padding-mobile" style={{ padding: '60px 32px 70px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 16 }}>
            <div className="text-center-mobile w-full-mobile">
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7C3AED', display: 'block', marginBottom: 4 }}>Don't Miss</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>Upcoming Events</h2>
            </div>
            <Link to="/campushub/events" style={{ textDecoration: 'none' }}>
              <button id="view-all-events-btn" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 22px', borderRadius: 12, border: '1.5px solid #E2E8F0', background: '#fff', color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {upcoming.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '60px 32px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 8, letterSpacing: '-0.03em' }}>Browse by Category</h2>
          <p style={{ color: '#64748B', marginBottom: 36, fontSize: 15 }}>Find events that match your interests</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {ALL_CATEGORIES.filter(c => c !== 'All').map(cat => {
              const color = CATEGORY_COLORS[cat as EventCategory];
              return (
                <Link key={cat} to="/campushub/events" style={{ textDecoration: 'none' }}>
                  <button style={{ padding: '12px 24px', borderRadius: 999, background: color.light, color: color.bg, border: `1.5px solid ${color.bg}33`, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = color.bg; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = color.light; (e.currentTarget as HTMLButtonElement).style.color = color.bg; }}
                  >{cat}</button>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLUBS */}
      <section style={{ padding: '60px 32px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E11D48', display: 'block', marginBottom: 8 }}>Our Clubs</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>The Clubs Behind The Magic</h2>
            <p style={{ color: '#64748B', fontSize: 15, marginTop: 8 }}>Six passionate clubs, hundreds of events, thousands of memories.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
            {CLUBS.map(club => (
              <div key={club.name} style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)', transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; }}
              >
                <div style={{ height: 110, overflow: 'hidden', position: 'relative' }}>
                  <img src={club.img} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${club.color}CC, transparent)` }} />
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{club.name}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>{club.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '0 32px 80px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ borderRadius: 28, background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #3B0764 100%)', padding: '60px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=60" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 14, letterSpacing: '-0.03em', fontFamily: "'Righteous', sans-serif" }}>Ready to Join the Action?</h2>
              <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 480, margin: '0 auto 32px' }}>Browse all upcoming events and register in seconds. Your campus adventure awaits.</p>
              <Link to="/campushub/events" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '16px 42px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #E11D48, #7C3AED)', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: '0 8px 32px rgba(225,29,72,0.45)' }}>
                  Explore All Events
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CampusHubLayout>
  );
}
