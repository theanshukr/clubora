import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CHEvent } from '../../data/campusHubData';
import { CATEGORY_COLORS } from '../../data/campusHubData';

interface EventCardProps {
  event: CHEvent;
  featured?: boolean;
}

export default function EventCard({ event, featured }: EventCardProps) {
  const cat = CATEGORY_COLORS[event.category];
  const [imgError, setImgError] = useState(false);
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const fallbackImg = `https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80`;

  if (featured) {
    return (
      <div style={{
        borderRadius: 24, overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        minHeight: 380,
        border: '1px solid rgba(0,0,0,0.06)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 30px 80px rgba(0,0,0,0.15)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.10)'; }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={imgError ? fallbackImg : event.image}
            alt={event.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.4))' }} />
          {/* Featured badge */}
          <div style={{ position: 'absolute', top: 20, left: 20, background: '#F59E0B', color: '#fff', borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Featured
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ background: cat.light, color: cat.bg, borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {event.category}
            </span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1.2 }}>{event.name}</h2>
          <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: 15 }}>{event.shortDescription}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { svg: <CalSVG />, text: formattedDate },
              { svg: <ClockSVG />, text: event.time },
              { svg: <PinSVG />, text: event.venue },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#475569' }}>
                {item.svg}
                {item.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
            <Link to={`/campushub/events/${event.id}/register`} style={{ textDecoration: 'none' }}>
              <button id={`featured-register-${event.id}`} style={{
                padding: '12px 28px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, #E11D48, #7C3AED)',
                color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 4px 16px rgba(225,29,72,0.35)',
                transition: 'all 0.2s',
              }}>Register Now</button>
            </Link>
            <Link to={`/campushub/events/${event.id}`} style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '12px 22px', borderRadius: 12, border: '1.5px solid #E2E8F0',
                background: '#fff', color: '#334155', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s',
              }}>View Details</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      borderRadius: 20, overflow: 'hidden', background: '#fff',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      border: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.13)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={imgError ? fallbackImg : event.image}
          alt={event.name}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{ background: cat.bg, color: cat.text, borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{event.name}</h3>
        <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{event.shortDescription}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 4 }}>
          {[
            { svg: <CalSVG small />, text: formattedDate },
            { svg: <ClockSVG small />, text: event.time },
            { svg: <PinSVG small />, text: event.venue },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B' }}>
              {item.svg}
              {item.text}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 14 }}>
          <Link to={`/campushub/events/${event.id}/register`} style={{ textDecoration: 'none', flex: 1 }}>
            <button id={`card-register-${event.id}`} style={{
              width: '100%', padding: '10px 0', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #E11D48, #7C3AED)',
              color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              boxShadow: '0 3px 10px rgba(225,29,72,0.3)',
            }}>Register</button>
          </Link>
          <Link to={`/campushub/events/${event.id}`} style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '10px 16px', borderRadius: 10, border: '1.5px solid #E2E8F0',
              background: '#fff', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}>Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CalSVG({ small }: { small?: boolean }) {
  const s = small ? 13 : 15;
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function ClockSVG({ small }: { small?: boolean }) {
  const s = small ? 13 : 15;
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function PinSVG({ small }: { small?: boolean }) {
  const s = small ? 13 : 15;
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
