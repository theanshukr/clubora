import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import CampusHubLayout from './CampusHubLayout';
import { SEED_EVENTS, SEED_REGISTRATIONS, CATEGORY_COLORS } from '../../data/campusHubData';

export default function CampusHubEventDetail() {
  const { id } = useParams<{ id: string }>();
  const event = SEED_EVENTS.find(e => e.id === id);

  if (!event) return <Navigate to="/campushub/events" replace />;

  const color = CATEGORY_COLORS[event.category]?.bg || '#6B7280';
  const regCount = SEED_REGISTRATIONS.filter(r => r.eventId === id).length;
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const deadline = new Date(event.registrationDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const spotsLeft = event.maxParticipants - regCount;

  return (
    <CampusHubLayout>
      <div style={{ paddingTop: 32, maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 13, color: 'var(--color-text-secondary)' }}>
          <Link to="/campushub/events" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>Events</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
          <span>{event.name}</span>
        </div>

        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Banner */}
          <div style={{ background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260, overflow: 'hidden' }}>
            {event.image.startsWith('http') ? (
              <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 100 }}>{event.image}</span>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: 36 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 20 }}>
              <div>
                <span style={{ display: 'inline-flex', alignItems: 'center', background: `${color}22`, color, borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  {event.category}
                </span>
                <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em' }}>{event.name}</h1>
              </div>
              <Link to={`/campushub/events/${event.id}/register`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <button id={`detail-register-${event.id}`} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: 15, fontWeight: 700 }}>
                  Register Now
                </button>
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
              {[
                { icon: 'calendar_today', label: 'Date', value: formattedDate },
                { icon: 'schedule', label: 'Time', value: event.time },
                { icon: 'location_on', label: 'Venue', value: event.venue },
                { icon: 'groups', label: 'Organizer', value: event.organizer },
                { icon: 'event_available', label: 'Deadline', value: deadline },
                { icon: 'person', label: 'Spots Left', value: `${spotsLeft} / ${event.maxParticipants}` },
              ].map(item => (
                <div key={item.label} className="glass-cutout" style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-accent)' }}>{item.icon}</span>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--color-text-secondary)' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--cutout-border)', paddingTop: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About This Event</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: 15 }}>{event.description}</p>
            </div>

            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <Link to={`/campushub/events/${event.id}/register`} style={{ textDecoration: 'none' }}>
                <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: 15, fontWeight: 700 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, marginRight: 8, verticalAlign: 'middle' }}>how_to_reg</span>
                  Register Now
                </button>
              </Link>
              <Link to="/campushub/events" style={{ textDecoration: 'none' }}>
                <button className="btn btn-glass" style={{ padding: '12px 20px', fontSize: 14 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, marginRight: 6, verticalAlign: 'middle' }}>arrow_back</span>
                  Back to Events
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CampusHubLayout>
  );
}
