import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CampusHubLayout from './CampusHubLayout';
import { SEED_EVENTS, SEED_REGISTRATIONS, CATEGORY_COLORS, ALL_CATEGORIES } from '../../data/campusHubData';
import type { CHEvent, CHRegistration, EventCategory } from '../../data/campusHubData';
import { CLUBS_DATA } from './CampusHubClubs';

export interface CHClubItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  longDesc?: string;
  color: string;
  bg?: string;
  members: number;
  events: number;
  founded: string;
  lead: string;
  contact: string;
  status: 'Active' | 'Inactive';
  coverImg?: string;
}

// Module-level mutable stores for persistence during session
let localEvents: CHEvent[] = [...SEED_EVENTS];
let localRegs: CHRegistration[] = [...SEED_REGISTRATIONS];
let localClubs: CHClubItem[] = CLUBS_DATA.map(c => ({
  id: c.id,
  name: c.name,
  tagline: c.tagline,
  desc: c.desc,
  longDesc: c.longDesc,
  color: c.color,
  bg: c.bg,
  members: c.members,
  events: c.events,
  founded: c.founded,
  lead: c.lead,
  contact: c.contact,
  status: 'Active',
  coverImg: c.coverImg
}));

function generateId() { return 'ev-' + Math.random().toString(36).slice(2, 9); }
function generateClubId(name: string) { return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') || ('club-' + Math.random().toString(36).slice(2, 7)); }

const BLANK_EVENT: Omit<CHEvent, 'id' | 'createdAt'> = {
  name: '',
  category: 'Technical',
  date: '',
  time: '',
  venue: '',
  description: '',
  shortDescription: '',
  image: '📅',
  organizer: '',
  organizerLogo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&q=80',
  registrationDeadline: '',
  maxParticipants: 100,
  status: 'Published'
};

const BLANK_CLUB: CHClubItem = {
  id: '',
  name: '',
  tagline: '',
  desc: '',
  longDesc: '',
  color: '#E11D48',
  members: 25,
  events: 0,
  founded: '2026',
  lead: '',
  contact: '',
  status: 'Active',
  coverImg: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80'
};

type AdminView = 'dashboard' | 'events' | 'clubs' | 'registrations' | 'new-event' | 'edit-event' | 'new-club' | 'edit-club';

export default function CampusHubAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>('dashboard');
  const [events, setEvents] = useState<CHEvent[]>(localEvents);
  const [regs, setRegs] = useState<CHRegistration[]>(localRegs);
  const [clubs, setClubs] = useState<CHClubItem[]>(localClubs);

  // Sync main view with URL when navigating via Header
  useEffect(() => {
    if (location.pathname.endsWith('/admin/events')) setView('events');
    else if (location.pathname.endsWith('/admin/clubs')) setView('clubs');
    else if (location.pathname.endsWith('/admin/registrations')) setView('registrations');
    else if (location.pathname.endsWith('/admin')) setView('dashboard');
  }, [location.pathname]);

  const [editTarget, setEditTarget] = useState<CHEvent | null>(null);
  const [formData, setFormData] = useState<Omit<CHEvent, 'id' | 'createdAt'>>(BLANK_EVENT);
  
  // Club Form State
  const [clubEditTarget, setClubEditTarget] = useState<CHClubItem | null>(null);
  const [clubFormData, setClubFormData] = useState<CHClubItem>(BLANK_CLUB);

  // Delete Confirmations
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteClubConfirm, setDeleteClubConfirm] = useState<string | null>(null);

  const [toast, setToast] = useState<string | null>(null);
  
  // Registrations search & filters
  const [regSearch, setRegSearch] = useState('');
  const [regEventFilter, setRegEventFilter] = useState('All');
  const [regStatusFilter, setRegStatusFilter] = useState('All');

  // Events list filter
  const [eventSearch, setEventSearch] = useState('');
  const [eventCatFilter, setEventCatFilter] = useState('All');

  // Clubs search
  const [clubSearch, setClubSearch] = useState('');
  const [clubStatusFilter, setClubStatusFilter] = useState('All');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // Derived stats
  const totalEvents = events.length;
  const totalRegs = regs.length;
  const totalClubs = clubs.length;
  const activeClubsCount = clubs.filter(c => c.status === 'Active').length;
  const upcomingCount = events.filter(e => new Date(e.date) >= new Date()).length;
  const categoriesCount = new Set(events.map(e => e.category)).size;
  const pendingRegsCount = regs.filter(r => (r.status || 'Pending') === 'Pending').length;

  // Filtered registrations
  const filteredRegs = useMemo(() => {
    return regs.filter(r => {
      const ev = events.find(e => e.id === r.eventId);
      const matchSearch = [r.name, r.email, ev?.name ?? ''].some(s => s.toLowerCase().includes(regSearch.toLowerCase()));
      const matchEvent = regEventFilter === 'All' || r.eventId === regEventFilter;
      const rStatus = r.status || 'Pending';
      const matchStatus = regStatusFilter === 'All' || rStatus === regStatusFilter;
      return matchSearch && matchEvent && matchStatus;
    });
  }, [regs, events, regSearch, regEventFilter, regStatusFilter]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(eventSearch.toLowerCase()) || (e.venue || '').toLowerCase().includes(eventSearch.toLowerCase());
      const matchCat = eventCatFilter === 'All' || e.category === eventCatFilter;
      return matchSearch && matchCat;
    });
  }, [events, eventSearch, eventCatFilter]);

  // Filtered clubs
  const filteredClubs = useMemo(() => {
    return clubs.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(clubSearch.toLowerCase()) || c.lead.toLowerCase().includes(clubSearch.toLowerCase()) || c.tagline.toLowerCase().includes(clubSearch.toLowerCase());
      const matchStatus = clubStatusFilter === 'All' || c.status === clubStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [clubs, clubSearch, clubStatusFilter]);

  // ── Event Handlers ────────────────────────────────────────────────────────
  const handleSaveEvent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.date || !formData.venue.trim()) {
      showToast('⚠️ Please fill in Event Name, Date, and Venue.');
      return;
    }
    if (editTarget) {
      const updated = events.map(ev => ev.id === editTarget.id ? { ...editTarget, ...formData } : ev);
      setEvents(updated);
      localEvents = updated;
      showToast('✓ Event updated successfully!');
    } else {
      const newEvent: CHEvent = {
        ...formData,
        id: generateId(),
        createdAt: new Date().toISOString()
      };
      const updated = [newEvent, ...events];
      setEvents(updated);
      localEvents = updated;
      showToast('✓ New event created successfully!');
    }
    setFormData(BLANK_EVENT);
    setEditTarget(null);
    navigate('/campushub/admin/events');
  };

  const handleEditClick = (ev: CHEvent) => {
    setEditTarget(ev);
    setFormData({
      name: ev.name,
      category: ev.category,
      date: ev.date,
      time: ev.time,
      venue: ev.venue,
      description: ev.description,
      shortDescription: ev.shortDescription,
      image: ev.image,
      organizer: ev.organizer,
      organizerLogo: ev.organizerLogo || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&q=80',
      registrationDeadline: ev.registrationDeadline,
      maxParticipants: ev.maxParticipants,
      status: ev.status || 'Published'
    });
    setView('edit-event');
  };

  const handleDelete = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    localEvents = updated;
    setDeleteConfirm(null);
    showToast('✓ Event deleted.');
  };

  const handleDuplicate = (ev: CHEvent) => {
    const newEvent: CHEvent = {
      ...ev,
      id: generateId(),
      name: `${ev.name} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    const updated = [newEvent, ...events];
    setEvents(updated);
    localEvents = updated;
    showToast('✓ Event duplicated as Draft!');
  };

  const handleToggleEventStatus = (ev: CHEvent) => {
    const nextStatus = (ev.status === 'Draft' ? 'Published' : 'Draft') as 'Draft' | 'Published';
    const updated = events.map(e => e.id === ev.id ? { ...e, status: nextStatus } : e);
    setEvents(updated);
    localEvents = updated;
    showToast(`✓ Event status changed to ${nextStatus}`);
  };

  // ── Club Handlers ─────────────────────────────────────────────────────────
  const handleSaveClub = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!clubFormData.name.trim() || !clubFormData.lead.trim()) {
      showToast('⚠️ Please fill in Club Name and Club Lead.');
      return;
    }
    if (clubEditTarget) {
      const updated = clubs.map(c => c.id === clubEditTarget.id ? { ...clubEditTarget, ...clubFormData } : c);
      setClubs(updated);
      localClubs = updated;
      showToast('✓ Club updated successfully!');
    } else {
      const newClub: CHClubItem = {
        ...clubFormData,
        id: generateClubId(clubFormData.name),
      };
      const updated = [newClub, ...clubs];
      setClubs(updated);
      localClubs = updated;
      showToast('✓ New club added successfully!');
    }
    setClubFormData(BLANK_CLUB);
    setClubEditTarget(null);
    navigate('/campushub/admin/clubs');
  };

  const handleEditClubClick = (c: CHClubItem) => {
    setClubEditTarget(c);
    setClubFormData(c);
    setView('edit-club');
  };

  const handleDeleteClub = (id: string) => {
    const updated = clubs.filter(c => c.id !== id);
    setClubs(updated);
    localClubs = updated;
    setDeleteClubConfirm(null);
    showToast('✓ Club deleted.');
  };

  const handleToggleClubStatus = (c: CHClubItem) => {
    const nextStatus: 'Active' | 'Inactive' = c.status === 'Active' ? 'Inactive' : 'Active';
    const updated: CHClubItem[] = clubs.map(item => item.id === c.id ? { ...item, status: nextStatus } : item);
    setClubs(updated);
    localClubs = updated;
    showToast(`✓ Club marked as ${nextStatus}`);
  };

  // ── Registration Handlers ─────────────────────────────────────────────────
  const handleChangeRegStatus = (regId: string, status: 'Pending' | 'Approved' | 'Rejected') => {
    const updated = regs.map(r => r.id === regId ? { ...r, status } : r);
    setRegs(updated);
    localRegs = updated;
    showToast(`✓ Registration marked as ${status}`);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Event Name', 'Student Name', 'Email', 'College / Year', 'Phone', 'Registration Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredRegs.map(r => {
        const ev = events.find(e => e.id === r.eventId);
        return `"${r.id}","${(ev?.name || '').replace(/"/g, '""')}","${r.name.replace(/"/g, '""')}","${r.email}","${r.collegeYear}","${r.phone}","${r.registeredAt}","${r.status || 'Pending'}"`;
      })
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campushub_registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('✓ Exported CSV successfully');
  };

  const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)' }}>{label}</label>
      {children}
    </div>
  );

  return (
    <CampusHubLayout isAdmin>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: 80,
          right: 24,
          zIndex: 9999,
          background: '#0F172A',
          color: '#F8FAFC',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '12px 20px',
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 14,
          boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {toast}
        </div>
      )}

      {/* Delete Event confirm modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="glass-panel" style={{ padding: '32px 28px', maxWidth: 420, width: '100%', textAlign: 'center', background: 'var(--color-glass-surface)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: 'rgba(239,68,68,0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 30 }}>delete_forever</span>
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, color: 'var(--color-primary)' }}>Delete Event?</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24, fontSize: 14, lineHeight: 1.5 }}>
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-glass" style={{ padding: '10px 22px', fontWeight: 600 }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button id="confirm-delete-btn" className="btn btn-primary" style={{ padding: '10px 22px', background: '#EF4444', fontWeight: 700 }} onClick={() => handleDelete(deleteConfirm)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Club confirm modal */}
      {deleteClubConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="glass-panel" style={{ padding: '32px 28px', maxWidth: 420, width: '100%', textAlign: 'center', background: 'var(--color-glass-surface)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: 'rgba(239,68,68,0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 30 }}>group_remove</span>
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, color: 'var(--color-primary)' }}>Delete Club?</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24, fontSize: 14, lineHeight: 1.5 }}>
              Are you sure you want to delete this club from CampusHub?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-glass" style={{ padding: '10px 22px', fontWeight: 600 }} onClick={() => setDeleteClubConfirm(null)}>Cancel</button>
              <button className="btn btn-primary" style={{ padding: '10px 22px', background: '#EF4444', fontWeight: 700 }} onClick={() => handleDeleteClub(deleteClubConfirm)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px 60px' }}>
        <main style={{ minWidth: 0 }}>

          {/* ══════════════ DASHBOARD OVERVIEW ══════════════ */}
          {view === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-primary)' }}>Admin Dashboard</h1>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 2 }}>Real-time overview of events, student registrations, and active campus clubs.</p>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setClubFormData(BLANK_CLUB); setClubEditTarget(null); setView('new-club'); }}
                    className="btn btn-glass"
                    style={{ fontSize: 13, fontWeight: 600, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>group_add</span> Add Club
                  </button>
                  <button
                    onClick={() => { setFormData(BLANK_EVENT); setEditTarget(null); setView('new-event'); }}
                    className="btn btn-primary"
                    style={{ fontSize: 13, fontWeight: 700, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> Create Event
                  </button>
                </div>
              </div>

              {/* 4 Metric Stat Cards */}
              <div className="admin-card-grid" style={{ display: 'grid' }}>
                {[
                  { label: 'Total Events', value: totalEvents, icon: 'event', color: '#E11D48', bg: 'rgba(225,29,72,0.1)', sub: `${upcomingCount} upcoming` },
                  { label: 'Campus Clubs', value: totalClubs, icon: 'diversity_3', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', sub: `${activeClubsCount} active clubs` },
                  { label: 'Registrations', value: totalRegs, icon: 'how_to_reg', color: '#10B981', bg: 'rgba(16,185,129,0.1)', sub: `${pendingRegsCount} pending action` },
                  { label: 'Event Categories', value: categoriesCount, icon: 'category', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', sub: 'Tech, Cultural, Sports' },
                ].map(stat => (
                  <div key={stat.label} className="glass-panel" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{stat.icon}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--color-primary)' }}>{stat.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, fontWeight: 500 }}>{stat.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid with Top Events and Active Clubs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {/* Top Events */}
                <div className="glass-panel" style={{ padding: '24px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 800 }}>Top Events</h3>
                      <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 1 }}>Highest student attendance</p>
                    </div>
                    <button className="btn btn-glass" style={{ fontSize: 12, padding: '5px 14px', fontWeight: 600 }} onClick={() => navigate('/campushub/admin/events')}>
                      Manage
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[...events].sort((a, b) => regs.filter(r => r.eventId === b.id).length - regs.filter(r => r.eventId === a.id).length).slice(0, 4).map(ev => {
                      const count = regs.filter(r => r.eventId === ev.id).length;
                      const percent = Math.min(100, Math.round((count / (ev.maxParticipants || 100)) * 100));
                      return (
                        <div key={ev.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--cutout-bg)', borderRadius: 12, border: '1px solid var(--cutout-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {ev.image.startsWith('http') ? <img src={ev.image} alt={ev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{ev.image}</span>}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)' }}>{ev.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{count} / {ev.maxParticipants} registered ({percent}%)</div>
                            </div>
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 6 }}>
                            {ev.status || 'Published'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Active Clubs */}
                <div className="glass-panel" style={{ padding: '24px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 800 }}>Campus Clubs</h3>
                      <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 1 }}>Active student organizations</p>
                    </div>
                    <button className="btn btn-glass" style={{ fontSize: 12, padding: '5px 14px', fontWeight: 600 }} onClick={() => navigate('/campushub/admin/clubs')}>
                      All Clubs ({clubs.length})
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {clubs.slice(0, 4).map(c => (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--cutout-bg)', borderRadius: 12, border: '1px solid var(--cutout-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: `${c.color}22`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)' }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Lead: {c.lead} • {c.members} members</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: c.status === 'Active' ? '#10B981' : '#64748B', background: c.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(100,116,139,0.1)', padding: '2px 8px', borderRadius: 6 }}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ MANAGE CLUBS ══════════════ */}
          {view === 'clubs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-primary)' }}>Manage Clubs</h1>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 2 }}>Add new student clubs, edit club leadership, member counts, and details.</p>
                </div>
                <button
                  id="add-club-btn"
                  className="btn btn-primary"
                  style={{ fontSize: 13, padding: '10px 22px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}
                  onClick={() => { setClubFormData(BLANK_CLUB); setClubEditTarget(null); setView('new-club'); }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>group_add</span> Add New Club
                </button>
              </div>

              {/* Filters */}
              <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'var(--color-text-secondary)' }}>search</span>
                  <input
                    id="club-search-input"
                    className="form-input"
                    placeholder="Search clubs by name, lead, or tagline..."
                    value={clubSearch}
                    onChange={e => setClubSearch(e.target.value)}
                    style={{ paddingLeft: 38 }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status:</label>
                  <select className="form-input" value={clubStatusFilter} onChange={e => setClubStatusFilter(e.target.value)} style={{ width: 'auto', minWidth: 120 }}>
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Clubs Table */}
              <div className="glass-panel" style={{ padding: 20 }}>
                <div className="table-responsive">
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--cutout-border)' }}>
                        {['Club Name', 'Status', 'Lead / President', 'Members', 'Events Hosted', 'Contact', 'Actions'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClubs.length > 0 ? (
                        filteredClubs.map(c => {
                          const isActive = c.status === 'Active';
                          return (
                            <tr key={c.id} style={{ borderBottom: '1px solid var(--cutout-border)' }}>
                              <td style={{ padding: '14px 14px', fontWeight: 600 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}22`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                                    {c.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{c.name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{c.tagline}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '14px 14px' }}>
                                <button
                                  onClick={() => handleToggleClubStatus(c)}
                                  title="Click to toggle status"
                                  style={{
                                    border: 'none',
                                    background: isActive ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.12)',
                                    color: isActive ? '#059669' : '#64748B',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    padding: '4px 10px',
                                    borderRadius: 999,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5
                                  }}
                                >
                                  <span style={{ width: 6, height: 6, borderRadius: 3, background: isActive ? '#059669' : '#64748B' }}></span>
                                  {c.status}
                                </button>
                              </td>
                              <td style={{ padding: '14px 14px', fontWeight: 600 }}>
                                {c.lead}
                              </td>
                              <td style={{ padding: '14px 14px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                                👥 {c.members}
                              </td>
                              <td style={{ padding: '14px 14px', fontWeight: 700, color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>
                                📅 {c.events}
                              </td>
                              <td style={{ padding: '14px 14px', color: 'var(--color-text-secondary)' }}>
                                {c.contact}
                              </td>
                              <td style={{ padding: '14px 14px' }}>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <Link to={`/campushub/clubs/${c.id}`} target="_blank" className="btn btn-glass" title="View Public Page" style={{ padding: '6px 8px', borderRadius: 8, textDecoration: 'none' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>visibility</span>
                                  </Link>
                                  <button onClick={() => handleEditClubClick(c)} className="btn btn-glass" title="Edit Club" style={{ padding: '6px 8px', borderRadius: 8 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                                  </button>
                                  <button onClick={() => setDeleteClubConfirm(c.id)} className="btn btn-glass" title="Delete Club" style={{ padding: '6px 8px', borderRadius: 8, color: '#EF4444' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-secondary)' }}>
                            No clubs found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ CREATE / EDIT CLUB FORM ══════════════ */}
          {(view === 'new-club' || view === 'edit-club') && (
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <button onClick={() => navigate('/campushub/admin/clubs')} className="btn btn-glass" style={{ padding: '8px 12px', borderRadius: 10 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                </button>
                <div>
                  <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-primary)' }}>
                    {view === 'edit-club' ? `Edit Club: ${clubEditTarget?.name}` : 'Register New Campus Club'}
                  </h1>
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Configure club details, lead contact, and description.</p>
                </div>
              </div>

              <form onSubmit={handleSaveClub} className="glass-panel" style={{ padding: '32px 28px' }}>
                <div className="admin-form-grid" style={{ display: 'grid' }}>
                  
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Club Name *" id="club-name">
                      <input id="club-name" className="form-input" placeholder="e.g. Robotics & IoT Society" required value={clubFormData.name} onChange={e => setClubFormData(f => ({ ...f, name: e.target.value }))} />
                    </Field>
                  </div>

                  <Field label="Tagline / Motto" id="club-tagline">
                    <input id="club-tagline" className="form-input" placeholder="e.g. Innovate. Automate. Elevate." value={clubFormData.tagline} onChange={e => setClubFormData(f => ({ ...f, tagline: e.target.value }))} />
                  </Field>

                  <Field label="Club Status" id="club-status">
                    <select id="club-status" className="form-input" value={clubFormData.status} onChange={e => setClubFormData(f => ({ ...f, status: e.target.value as 'Active' | 'Inactive' }))}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </Field>

                  <Field label="Club President / Lead *" id="club-lead">
                    <input id="club-lead" className="form-input" placeholder="e.g. Yash Singhania" required value={clubFormData.lead} onChange={e => setClubFormData(f => ({ ...f, lead: e.target.value }))} />
                  </Field>

                  <Field label="Contact Email" id="club-contact">
                    <input id="club-contact" className="form-input" type="email" placeholder="e.g. robotics@campushub.edu" value={clubFormData.contact} onChange={e => setClubFormData(f => ({ ...f, contact: e.target.value }))} />
                  </Field>

                  <Field label="Total Active Members" id="club-members">
                    <input id="club-members" className="form-input" type="number" min="1" value={clubFormData.members} onChange={e => setClubFormData(f => ({ ...f, members: Number(e.target.value) }))} />
                  </Field>

                  <Field label="Year Founded" id="club-founded">
                    <input id="club-founded" className="form-input" placeholder="e.g. 2021" value={clubFormData.founded} onChange={e => setClubFormData(f => ({ ...f, founded: e.target.value }))} />
                  </Field>

                  <Field label="Theme Accent Color" id="club-color">
                    <input id="club-color" className="form-input" type="color" value={clubFormData.color} onChange={e => setClubFormData(f => ({ ...f, color: e.target.value }))} style={{ height: 42, padding: 4 }} />
                  </Field>

                  <Field label="Events Hosted Count" id="club-events-count">
                    <input id="club-events-count" className="form-input" type="number" min="0" value={clubFormData.events} onChange={e => setClubFormData(f => ({ ...f, events: Number(e.target.value) }))} />
                  </Field>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Cover Image URL (Unsplash or image link)" id="club-cover">
                      <input id="club-cover" className="form-input" placeholder="e.g. https://images.unsplash.com/photo-..." value={clubFormData.coverImg} onChange={e => setClubFormData(f => ({ ...f, coverImg: e.target.value }))} />
                    </Field>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Short Overview Description" id="club-desc">
                      <input id="club-desc" className="form-input" placeholder="Brief summary displayed on cards" value={clubFormData.desc} onChange={e => setClubFormData(f => ({ ...f, desc: e.target.value }))} />
                    </Field>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Detailed About Club & Mission" id="club-longdesc">
                      <textarea id="club-longdesc" className="form-input" rows={4} placeholder="Full background, achievements, and regular activities..." value={clubFormData.longDesc} onChange={e => setClubFormData(f => ({ ...f, longDesc: e.target.value }))} style={{ resize: 'vertical' }} />
                    </Field>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px', fontWeight: 700, fontSize: 14 }}>
                    {view === 'edit-club' ? 'Update Club' : 'Create Club'}
                  </button>
                  <button type="button" className="btn btn-glass" style={{ padding: '12px 24px', fontSize: 14 }} onClick={() => { setClubFormData(BLANK_CLUB); setClubEditTarget(null); navigate('/campushub/admin/clubs'); }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ══════════════ MANAGE EVENTS ══════════════ */}
          {view === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-primary)' }}>Manage Events</h1>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 2 }}>Create, edit, duplicate, and toggle publication status.</p>
                </div>
                <button
                  id="add-event-btn"
                  className="btn btn-primary"
                  style={{ fontSize: 13, padding: '10px 22px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}
                  onClick={() => { setFormData(BLANK_EVENT); setEditTarget(null); setView('new-event'); }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> Add Event
                </button>
              </div>

              {/* Filters */}
              <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'var(--color-text-secondary)' }}>search</span>
                  <input
                    id="event-search-input"
                    className="form-input"
                    placeholder="Search events by name or venue..."
                    value={eventSearch}
                    onChange={e => setEventSearch(e.target.value)}
                    style={{ paddingLeft: 38 }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category:</label>
                  <select className="form-input" value={eventCatFilter} onChange={e => setEventCatFilter(e.target.value)} style={{ width: 'auto', minWidth: 130 }}>
                    <option value="All">All Categories</option>
                    {ALL_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Events Table */}
              <div className="glass-panel" style={{ padding: 20 }}>
                <div className="table-responsive">
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--cutout-border)' }}>
                        {['Event', 'Status', 'Category', 'Date', 'Registered', 'Actions'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map(ev => {
                          const catColor = CATEGORY_COLORS[ev.category]?.bg || '#E11D48';
                          const count = regs.filter(r => r.eventId === ev.id).length;
                          const isDraft = ev.status === 'Draft';
                          return (
                            <tr key={ev.id} style={{ borderBottom: '1px solid var(--cutout-border)' }}>
                              <td style={{ padding: '14px 14px', fontWeight: 600 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                  <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', background: 'var(--cutout-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {ev.image.startsWith('http') 
                                      ? <img src={ev.image} alt={ev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                      : <span style={{ fontSize: 20 }}>{ev.image}</span>}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{ev.name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{ev.venue} • {ev.time}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '14px 14px' }}>
                                <button
                                  onClick={() => handleToggleEventStatus(ev)}
                                  title="Click to toggle status"
                                  style={{
                                    border: 'none',
                                    background: isDraft ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
                                    color: isDraft ? '#D97706' : '#059669',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    padding: '4px 10px',
                                    borderRadius: 999,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5
                                  }}
                                >
                                  <span style={{ width: 6, height: 6, borderRadius: 3, background: isDraft ? '#D97706' : '#059669' }}></span>
                                  {ev.status || 'Published'}
                                </button>
                              </td>
                              <td style={{ padding: '14px 14px' }}>
                                <span style={{ background: `${catColor}18`, color: catColor, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{ev.category}</span>
                              </td>
                              <td style={{ padding: '14px 14px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                                {new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td style={{ padding: '14px 14px', fontWeight: 700, color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>
                                {count} / {ev.maxParticipants}
                              </td>
                              <td style={{ padding: '14px 14px' }}>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <button id={`edit-${ev.id}`} className="btn btn-glass" title="Edit" style={{ padding: '6px 8px', borderRadius: 8 }} onClick={() => handleEditClick(ev)}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                                  </button>
                                  <button id={`duplicate-${ev.id}`} className="btn btn-glass" title="Duplicate" style={{ padding: '6px 8px', borderRadius: 8 }} onClick={() => handleDuplicate(ev)}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>content_copy</span>
                                  </button>
                                  <button id={`delete-${ev.id}`} className="btn btn-glass" title="Delete" style={{ padding: '6px 8px', borderRadius: 8, color: '#EF4444' }} onClick={() => setDeleteConfirm(ev.id)}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-secondary)' }}>
                            No events found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ CREATE / EDIT EVENT FORM ══════════════ */}
          {(view === 'new-event' || view === 'edit-event') && (
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <button onClick={() => navigate('/campushub/admin/events')} className="btn btn-glass" style={{ padding: '8px 12px', borderRadius: 10 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                </button>
                <div>
                  <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-primary)' }}>
                    {view === 'edit-event' ? `Edit: ${editTarget?.name}` : 'Create New Event'}
                  </h1>
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Fill in the details below to make this event available to students.</p>
                </div>
              </div>

              <form onSubmit={handleSaveEvent} className="glass-panel" style={{ padding: '32px 28px' }}>
                <div className="admin-form-grid" style={{ display: 'grid' }}>
                  
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Event Title *" id="ev-name">
                      <input id="ev-name" className="form-input" placeholder="e.g. Annual Hackathon 2026" required value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} />
                    </Field>
                  </div>

                  <Field label="Category" id="ev-category">
                    <select id="ev-category" className="form-input" value={formData.category} onChange={e => setFormData(f => ({ ...f, category: e.target.value as EventCategory }))}>
                      {ALL_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>

                  <Field label="Publication Status" id="ev-status">
                    <select id="ev-status" className="form-input" value={formData.status || 'Published'} onChange={e => setFormData(f => ({ ...f, status: e.target.value as 'Draft' | 'Published' }))}>
                      <option value="Published">Published (Visible to Students)</option>
                      <option value="Draft">Draft (Hidden)</option>
                    </select>
                  </Field>

                  <Field label="Event Date *" id="ev-date">
                    <input id="ev-date" className="form-input" type="date" required value={formData.date} onChange={e => setFormData(f => ({ ...f, date: e.target.value }))} />
                  </Field>

                  <Field label="Event Time" id="ev-time">
                    <input id="ev-time" className="form-input" placeholder="e.g. 10:00 AM - 4:00 PM" value={formData.time} onChange={e => setFormData(f => ({ ...f, time: e.target.value }))} />
                  </Field>

                  <Field label="Venue / Location *" id="ev-venue">
                    <input id="ev-venue" className="form-input" placeholder="e.g. Main Auditorium, Block C" required value={formData.venue} onChange={e => setFormData(f => ({ ...f, venue: e.target.value }))} />
                  </Field>

                  <Field label="Organizing Club / Department" id="ev-organizer">
                    <input id="ev-organizer" className="form-input" placeholder="e.g. Turing Club / CSE Dept" value={formData.organizer} onChange={e => setFormData(f => ({ ...f, organizer: e.target.value }))} />
                  </Field>

                  <Field label="Registration Deadline" id="ev-deadline">
                    <input id="ev-deadline" className="form-input" type="date" value={formData.registrationDeadline} onChange={e => setFormData(f => ({ ...f, registrationDeadline: e.target.value }))} />
                  </Field>

                  <Field label="Max Participant Capacity" id="ev-max">
                    <input id="ev-max" className="form-input" type="number" min="1" value={formData.maxParticipants} onChange={e => setFormData(f => ({ ...f, maxParticipants: Number(e.target.value) }))} />
                  </Field>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Icon or Image URL (Emoji or https://...)" id="ev-image">
                      <input id="ev-image" className="form-input" placeholder="e.g. 🚀, 💻, or https://images.unsplash.com/..." value={formData.image} onChange={e => setFormData(f => ({ ...f, image: e.target.value }))} />
                    </Field>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Short Catchy Tagline" id="ev-short">
                      <input id="ev-short" className="form-input" placeholder="One-line summary shown on event cards" value={formData.shortDescription} onChange={e => setFormData(f => ({ ...f, shortDescription: e.target.value }))} />
                    </Field>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Full Description & Schedule" id="ev-desc">
                      <textarea id="ev-desc" className="form-input" rows={4} placeholder="Full event agenda, rules, and speaker details..." value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
                    </Field>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                  <button id="save-event-btn" type="submit" className="btn btn-primary" style={{ padding: '12px 32px', fontWeight: 700, fontSize: 14 }}>
                    {view === 'edit-event' ? 'Update Event' : 'Publish Event'}
                  </button>
                  <button type="button" className="btn btn-glass" style={{ padding: '12px 24px', fontSize: 14 }} onClick={() => { setView('events'); setEditTarget(null); setFormData(BLANK_EVENT); navigate('/campushub/admin/events'); }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ══════════════ REGISTRATIONS ══════════════ */}
          {view === 'registrations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-primary)' }}>Student Registrations</h1>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 2 }}>Manage registrations, update attendance/approval, and export reports.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }} onClick={exportCSV}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span> Export CSV
                </button>
              </div>

              {/* Filter Toolbar */}
              <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'var(--color-text-secondary)' }}>search</span>
                  <input
                    id="reg-search-input"
                    className="form-input"
                    placeholder="Search student, email, or event..."
                    value={regSearch}
                    onChange={e => setRegSearch(e.target.value)}
                    style={{ paddingLeft: 38 }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Event:</label>
                  <select id="reg-event-filter" className="form-input" value={regEventFilter} onChange={e => setRegEventFilter(e.target.value)} style={{ width: 'auto', minWidth: 150 }}>
                    <option value="All">All Events</option>
                    {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                  </select>

                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginLeft: 6 }}>Status:</label>
                  <select id="reg-status-filter" className="form-input" value={regStatusFilter} onChange={e => setRegStatusFilter(e.target.value)} style={{ width: 'auto', minWidth: 120 }}>
                    <option value="All">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Registrations List */}
              <div className="glass-panel" style={{ padding: 20 }}>
                <div style={{ marginBottom: 14, fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Showing <strong style={{ color: 'var(--color-primary)' }}>{filteredRegs.length}</strong> registration{filteredRegs.length !== 1 ? 's' : ''}</span>
                  <span style={{ fontSize: 12 }}>⚡ Click status to toggle</span>
                </div>

                <div className="table-responsive">
                  {filteredRegs.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--cutout-border)' }}>
                          {['Student Name', 'Contact Info', 'Event Name', 'Registration Date', 'Approval Status'].map(h => (
                            <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRegs.map(r => {
                          const ev = events.find(e => e.id === r.eventId);
                          const curStatus = r.status || 'Pending';
                          const statusColor = curStatus === 'Approved' ? '#10B981' : curStatus === 'Rejected' ? '#EF4444' : '#F59E0B';
                          return (
                            <tr key={r.id} style={{ borderBottom: '1px solid var(--cutout-border)' }}>
                              <td style={{ padding: '14px 14px', fontWeight: 600 }}>
                                <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{r.name}</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 500, marginTop: 2 }}>{r.collegeYear}</div>
                              </td>
                              <td style={{ padding: '14px 14px', color: 'var(--color-text-secondary)' }}>
                                <div>{r.email}</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>{r.phone}</div>
                              </td>
                              <td style={{ padding: '14px 14px', fontWeight: 600 }}>
                                <div style={{ color: 'var(--color-primary)' }}>{ev?.name ?? 'Unknown Event'}</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{ev?.venue}</div>
                              </td>
                              <td style={{ padding: '14px 14px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                                {new Date(r.registeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td style={{ padding: '14px 14px' }}>
                                <select 
                                  value={curStatus} 
                                  onChange={e => handleChangeRegStatus(r.id, e.target.value as any)}
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: '6px 12px',
                                    borderRadius: 8,
                                    background: `${statusColor}18`,
                                    color: statusColor,
                                    border: `1px solid ${statusColor}44`,
                                    cursor: 'pointer',
                                    outline: 'none'
                                  }}
                                >
                                  <option value="Approved">✓ Approved</option>
                                  <option value="Pending">⏳ Pending</option>
                                  <option value="Rejected">✕ Rejected</option>
                                </select>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-secondary)' }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
                      <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>No registrations found</h4>
                      <p style={{ fontSize: 13 }}>Try adjusting your search query or filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </CampusHubLayout>
  );
}
