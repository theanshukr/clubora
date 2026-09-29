import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import CampusHubLayout from './CampusHubLayout';
import { SEED_EVENTS, SEED_REGISTRATIONS, CATEGORY_COLORS } from '../../data/campusHubData';
import type { CHRegistration } from '../../data/campusHubData';

// In-memory store (shared via module-level variable)
let localRegistrations = [...SEED_REGISTRATIONS];

function generateId() {
  return 'reg-' + Math.random().toString(36).slice(2, 9);
}

export default function CampusHubRegister() {
  const { id } = useParams<{ id: string }>();
  const event = SEED_EVENTS.find(e => e.id === id);

  const [form, setForm] = useState({ name: '', email: '', collegeYear: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'duplicate'>('idle');
  const [regId, setRegId] = useState('');

  if (!event) return <Navigate to="/campushub/events" replace />;

  const color = CATEGORY_COLORS[event.category]?.bg || '#6B7280';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email.';
    if (!form.collegeYear.trim()) errs.collegeYear = 'College/Year is required.';
    if (!form.phone.trim()) errs.phone = 'Phone number is required.';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Please enter a valid 10-digit Indian phone number.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Check duplicate
    const dup = localRegistrations.find(r => r.eventId === id && r.email.toLowerCase() === form.email.toLowerCase());
    if (dup) { setStatus('duplicate'); return; }

    // Register
    const newReg: CHRegistration = {
      id: generateId(),
      eventId: id!,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      collegeYear: form.collegeYear.trim(),
      phone: form.phone.trim(),
      registeredAt: new Date().toISOString(),
    };
    localRegistrations.push(newReg);
    setRegId(newReg.id);
    setStatus('success');
  };

  const Field = ({ label, id, type = 'text', placeholder, value, error }: { label: string; id: string; type?: string; placeholder: string; value: string; error?: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>
      <input
        id={id}
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={e => setForm(f => ({ ...f, [id === 'collegeYear' ? 'collegeYear' : id]: e.target.value }))}
        style={{ borderColor: error ? '#EF4444' : undefined }}
      />
      {error && <span style={{ fontSize: 12, color: '#EF4444' }}>{error}</span>}
    </div>
  );

  if (status === 'success') {
    return (
      <CampusHubLayout>
        <div style={{ paddingTop: 60, maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: 48 }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Registration Successful!</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
              You are registered for <strong>{event.name}</strong>.
            </p>
            <div className="glass-cutout" style={{ padding: '16px 24px', borderRadius: 14, marginBottom: 28, textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Name', value: form.name },
                  { label: 'Registration ID', value: regId },
                  { label: 'Event', value: event.name },
                  { label: 'Date', value: new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', fontWeight: 700, marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/campushub/events" style={{ textDecoration: 'none' }}>
                <button className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: 700 }}>Browse More Events</button>
              </Link>
              <Link to="/campushub" style={{ textDecoration: 'none' }}>
                <button className="btn btn-glass" style={{ padding: '12px 20px' }}>Go Home</button>
              </Link>
            </div>
          </div>
        </div>
      </CampusHubLayout>
    );
  }

  return (
    <CampusHubLayout>
      <div style={{ paddingTop: 32, maxWidth: 600, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 13, color: 'var(--color-text-secondary)' }}>
          <Link to="/campushub/events" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>Events</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
          <Link to={`/campushub/events/${id}`} style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>{event.name}</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
          <span>Register</span>
        </div>

        <div className="glass-panel" style={{ padding: 36 }}>
          {/* Event summary */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 32, padding: '16px 20px', background: `${color}11`, borderRadius: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {event.image.startsWith('http') ? (
                <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: 28 }}>{event.image}</span>
              )}
            </div>
            <div>
              <span style={{ display: 'inline-flex', background: `${color}22`, color, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>
                {event.category}
              </span>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{event.name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {event.time} · {event.venue}
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em' }}>Complete Your Registration</h2>

          {status === 'duplicate' && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, fontSize: 14, color: '#EF4444', fontWeight: 600 }}>
              ⚠️ You are already registered for this event.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }} noValidate>
            <Field label="Full Name" id="name" placeholder="e.g. Arjun Sharma" value={form.name} error={errors.name} />
            <Field label="Email Address" id="email" type="email" placeholder="e.g. arjun@college.edu" value={form.email} error={errors.email} />
            <Field label="College / Year" id="collegeYear" placeholder="e.g. 3rd Year, CSE" value={form.collegeYear} error={errors.collegeYear} />
            <Field label="Phone Number" id="phone" type="tel" placeholder="e.g. 9876543210" value={form.phone} error={errors.phone} />

            <button id="submit-registration-btn" type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: 15, fontWeight: 700, marginTop: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, marginRight: 8, verticalAlign: 'middle' }}>how_to_reg</span>
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </CampusHubLayout>
  );
}

export { localRegistrations };
