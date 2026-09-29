import React, { useState, useMemo } from 'react';
import CampusHubLayout from './CampusHubLayout';
import EventCard from './EventCard';
import { SEED_EVENTS, ALL_CATEGORIES } from '../../data/campusHubData';

export default function CampusHubEvents() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return SEED_EVENTS.filter(ev => {
      const matchSearch = ev.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || ev.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <CampusHubLayout>
      <section style={{ paddingTop: 40 }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 8 }}>All Events</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>Browse, search, and register for upcoming campus events.</p>
        </div>

        {/* Search & Filter */}
        <div className="glass-panel" style={{ padding: 20, marginBottom: 32, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'var(--color-text-secondary)' }}>search</span>
            <input
              id="events-search-input"
              className="form-input"
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 38 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                className={category === cat ? 'btn btn-primary' : 'btn btn-glass'}
                style={{ fontSize: 12, padding: '7px 16px', fontWeight: 600 }}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Showing <strong style={{ color: 'var(--color-primary)' }}>{filtered.length}</strong> event{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' && <> in <strong style={{ color: 'var(--color-accent)' }}>{category}</strong></>}
          {search && <> matching "<strong style={{ color: 'var(--color-accent)' }}>{search}</strong>"</>}
        </div>

        {/* Events Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filtered.map(ev => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No events found</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Try changing your search or filter.</p>
            <button className="btn btn-glass" style={{ marginTop: 20, fontSize: 13 }} onClick={() => { setSearch(''); setCategory('All'); }}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </CampusHubLayout>
  );
}
