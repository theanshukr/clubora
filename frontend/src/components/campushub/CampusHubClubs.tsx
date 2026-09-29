import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CampusHubLayout from './CampusHubLayout';

// ── Club SVG Logos ────────────────────────────────────────────────────────────
function CodingLogo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill="#0F172A"/>
      <text x="28" y="36" textAnchor="middle" fontFamily="monospace" fontWeight="900" fontSize="22" fill="url(#cg)">{'</>'}</text>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA"/>
          <stop offset="1" stopColor="#3B82F6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function CulturalLogo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill="#1E1B4B"/>
      <path d="M20 38V22l16-4v16" stroke="url(#culg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17" cy="38" r="4" fill="url(#culg)" opacity="0.9"/>
      <circle cx="33" cy="34" r="4" fill="url(#culg)" opacity="0.7"/>
      <defs>
        <linearGradient id="culg" x1="14" y1="18" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C084FC"/>
          <stop offset="1" stopColor="#A855F7"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function SportsLogo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill="#052e16"/>
      <polygon points="28,12 32,24 44,24 35,31 38,44 28,37 18,44 21,31 12,24 24,24" fill="url(#spg)"/>
      <defs>
        <linearGradient id="spg" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ADE80"/>
          <stop offset="1" stopColor="#16A34A"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function AILogo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill="#0c1929"/>
      {/* Neural network nodes */}
      <circle cx="14" cy="20" r="4" fill="url(#aig)" opacity="0.9"/>
      <circle cx="14" cy="36" r="4" fill="url(#aig)" opacity="0.7"/>
      <circle cx="28" cy="14" r="4" fill="url(#aig)"/>
      <circle cx="28" cy="28" r="5" fill="url(#aig)"/>
      <circle cx="28" cy="42" r="4" fill="url(#aig)" opacity="0.7"/>
      <circle cx="42" cy="20" r="4" fill="url(#aig)" opacity="0.9"/>
      <circle cx="42" cy="36" r="4" fill="url(#aig)" opacity="0.7"/>
      {/* Connections */}
      <line x1="18" y1="20" x2="24" y2="25" stroke="#22D3EE" strokeWidth="1.2" opacity="0.5"/>
      <line x1="18" y1="36" x2="24" y2="30" stroke="#22D3EE" strokeWidth="1.2" opacity="0.5"/>
      <line x1="32" y1="25" x2="38" y2="20" stroke="#22D3EE" strokeWidth="1.2" opacity="0.5"/>
      <line x1="32" y1="30" x2="38" y2="36" stroke="#22D3EE" strokeWidth="1.2" opacity="0.5"/>
      <line x1="28" y1="18" x2="28" y2="23" stroke="#22D3EE" strokeWidth="1.2" opacity="0.5"/>
      <line x1="28" y1="33" x2="28" y2="38" stroke="#22D3EE" strokeWidth="1.2" opacity="0.5"/>
      <defs>
        <linearGradient id="aig" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E8F9"/>
          <stop offset="1" stopColor="#0891B2"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function EcellLogo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill="#1c0f00"/>
      {/* Rocket */}
      <path d="M28 10 C28 10 36 18 36 28 L28 44 L20 28 C20 18 28 10 28 10Z" fill="url(#ecg)"/>
      <circle cx="28" cy="26" r="4" fill="#1c0f00" opacity="0.7"/>
      <path d="M20 32 L16 40 L24 36Z" fill="#FCD34D" opacity="0.8"/>
      <path d="M36 32 L40 40 L32 36Z" fill="#FCD34D" opacity="0.8"/>
      <defs>
        <linearGradient id="ecg" x1="20" y1="10" x2="36" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A"/>
          <stop offset="1" stopColor="#F59E0B"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function LiteraryLogo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill="#1a0000"/>
      {/* Open book */}
      <path d="M12 16 C12 16 20 14 28 18 C36 14 44 16 44 16 L44 40 C44 40 36 38 28 42 C20 38 12 40 12 40 Z" fill="url(#litg)" opacity="0.9"/>
      <line x1="28" y1="18" x2="28" y2="42" stroke="#1a0000" strokeWidth="1.5" opacity="0.6"/>
      {/* Quill */}
      <path d="M34 20 Q40 16 38 26 Q36 30 32 32" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <defs>
        <linearGradient id="litg" x1="12" y1="14" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCA5A5"/>
          <stop offset="1" stopColor="#DC2626"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Club Data ─────────────────────────────────────────────────────────────────
export const CLUBS_DATA = [
  {
    id: 'coding-club',
    name: 'Coding Club',
    tagline: 'Build. Break. Repeat.',
    desc: 'Technical workshops, hackathons, and competitive programming.',
    longDesc: 'The Coding Club is the hub for all tech enthusiasts on campus. From beginner-friendly workshops to advanced algorithm contests, we help students level up their programming skills and build real-world projects. We regularly host hackathons, DSA sessions, open source contribution drives, and tech talks by industry professionals.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.08)',
    gradient: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
    heroBg: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
    Logo: CodingLogo,
    members: 120,
    events: 18,
    founded: '2019',
    lead: 'Arjun Sharma',
    contact: 'coding@campushub.edu',
    activities: ['Weekly DSA sessions', 'Monthly hackathons', 'Open source sprints', 'Industry guest talks', 'Competitive programming contests'],
    achievements: ['1st at IIT Bombay Hackathon 2025', 'Google Summer of Code contributors', '3 startups founded by alumni'],
    coverImg: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    galleryImgs: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    ],
  },
  {
    id: 'cultural-committee',
    name: 'Cultural Committee',
    tagline: 'Express. Celebrate. Inspire.',
    desc: 'Dance, music, drama, and cultural festivals.',
    longDesc: 'The Cultural Committee breathes life into campus with vibrant performances, artistic showcases, and cultural festivals. We bring together students passionate about dance, music, theatre, fine arts, and much more. Our annual fest "Rangmanch" is one of the most awaited events on campus attracting thousands of students.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    gradient: 'linear-gradient(135deg, #5B21B6, #7C3AED)',
    heroBg: 'linear-gradient(135deg, #0F0720 0%, #2E1065 100%)',
    Logo: CulturalLogo,
    members: 200,
    events: 24,
    founded: '2016',
    lead: 'Priya Nair',
    contact: 'cultural@campushub.edu',
    activities: ['Annual cultural fest – Rangmanch', 'Classical & western dance shows', 'Music concerts', 'Drama productions', 'Nukkad Natak (street plays)'],
    achievements: ['Best Cultural Club – State Awards 2024', '500+ performances over the years', 'Featured in national media'],
    coverImg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
    galleryImgs: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80',
    ],
  },
  {
    id: 'sports-committee',
    name: 'Sports Committee',
    tagline: 'Play Hard. Win Together.',
    desc: 'Cricket, football, basketball tournaments and more.',
    longDesc: 'The Sports Committee promotes athleticism, teamwork, and sportsmanship on campus. We organize inter-college tournaments, fitness challenges, and sports festivals across 10+ disciplines including cricket, football, basketball, badminton, chess, and track events. Our goal is to make sports accessible and exciting for every student.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    gradient: 'linear-gradient(135deg, #047857, #10B981)',
    heroBg: 'linear-gradient(135deg, #052e16 0%, #064e3b 100%)',
    Logo: SportsLogo,
    members: 180,
    events: 30,
    founded: '2015',
    lead: 'Rahul Verma',
    contact: 'sports@campushub.edu',
    activities: ['Inter-college cricket tournament', 'Football league', 'Basketball championship', 'Annual sports meet', 'Fitness boot camps'],
    achievements: ['State Cricket Champions 2025', 'Football runners-up 2024', 'Best Sports Body – University Award'],
    coverImg: 'https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=1200&q=80',
    galleryImgs: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80',
    ],
  },
  {
    id: 'ai-club',
    name: 'AI Club',
    tagline: 'Think. Learn. Innovate.',
    desc: 'Machine learning workshops and AI project showcases.',
    longDesc: 'The AI Club is at the cutting edge of artificial intelligence and machine learning. We run hands-on workshops on Python, TensorFlow, and PyTorch, host paper reading sessions, and support research projects. Our members have built AI solutions in healthcare, agriculture, and education, presenting them at national competitions.',
    color: '#0891B2',
    bg: 'rgba(8,145,178,0.08)',
    gradient: 'linear-gradient(135deg, #0E7490, #06B6D4)',
    heroBg: 'linear-gradient(135deg, #0c1929 0%, #0C4A6E 100%)',
    Logo: AILogo,
    members: 95,
    events: 20,
    founded: '2020',
    lead: 'Sneha Iyer',
    contact: 'ai@campushub.edu',
    activities: ['ML bootcamp (beginner to advanced)', 'Research paper reading sessions', 'AI project showcase', 'Kaggle competitions', 'Industry collaboration projects'],
    achievements: ['Kaggle Competition Top 5%', 'Published 2 research papers', 'Partnered with Google and Microsoft'],
    coverImg: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    galleryImgs: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80',
    ],
  },
  {
    id: 'ecell',
    name: 'E-Cell',
    tagline: 'Dream. Build. Launch.',
    desc: 'Entrepreneurship seminars, startup pitches, and mentorship.',
    longDesc: 'The Entrepreneurship Cell (E-Cell) is where ideas become startups. We connect aspiring founders with mentors, investors, and resources needed to build successful ventures. Through startup bootcamps, pitch competitions, and guest lectures by successful entrepreneurs, we cultivate the entrepreneurial spirit on campus.',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
    gradient: 'linear-gradient(135deg, #B45309, #F59E0B)',
    heroBg: 'linear-gradient(135deg, #1c0f00 0%, #451A03 100%)',
    Logo: EcellLogo,
    members: 85,
    events: 15,
    founded: '2018',
    lead: 'Karan Mehta',
    contact: 'ecell@campushub.edu',
    activities: ['Startup pitch competition', 'Entrepreneur masterclasses', 'Business plan workshops', 'Investor networking nights', 'Incubation program'],
    achievements: ['5 startups incubated (3 funded)', 'Rs 50L+ raised by alumni startups', 'Best E-Cell – National Entrepreneurship Summit 2024'],
    coverImg: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80',
    galleryImgs: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    ],
  },
  {
    id: 'literary-club',
    name: 'Literary Club',
    tagline: 'Words that Move the World.',
    desc: 'Debates, quizzes, writing competitions, and open mics.',
    longDesc: 'The Literary Club celebrates the power of words — spoken and written. We host debates, poetry slams, creative writing competitions, quizzes, and open mic nights. Whether you are a bookworm, a debater, a poet, or just someone who loves a good story, the Literary Club is your community.',
    color: '#DC2626',
    bg: 'rgba(220,38,38,0.08)',
    gradient: 'linear-gradient(135deg, #991B1B, #EF4444)',
    heroBg: 'linear-gradient(135deg, #1a0000 0%, #450A0A 100%)',
    Logo: LiteraryLogo,
    members: 110,
    events: 22,
    founded: '2017',
    lead: 'Aisha Khan',
    contact: 'literary@campushub.edu',
    activities: ['Annual debate championship', 'Poetry slam nights', 'Creative writing workshops', 'Intra-college quiz bowl', 'Book club meetings'],
    achievements: ['National Debate Champions 2024', 'Published annual literary magazine for 6 years', 'Open mic featured in city newspaper'],
    coverImg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80',
    galleryImgs: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80',
    ],
  },
];

// ── Club Card ─────────────────────────────────────────────────────────────────
function ClubCard({ club }: { club: typeof CLUBS_DATA[0] }) {
  const { Logo } = club;
  return (
    <Link to={`/campushub/clubs/${club.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)';
        }}
      >
        {/* Cover */}
        <div style={{ height: 120, overflow: 'hidden', position: 'relative' }}>
          <img src={club.coverImg} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))' }} />
        </div>

        {/* Logo badge */}
        <div style={{ padding: '0 24px', marginTop: -28, position: 'relative', zIndex: 1 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Logo size={56} />
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '14px 24px 24px' }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: '#111', marginBottom: 4 }}>{club.name}</div>
          <div style={{ fontSize: 12, color: club.color, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{club.tagline}</div>
          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 16 }}>{club.desc}</div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{club.members}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Members</div>
            </div>
            <div style={{ width: 1, background: '#F1F5F9' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{club.events}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Events/yr</div>
            </div>
            <div style={{ width: 1, background: '#F1F5F9' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{club.founded}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founded</div>
            </div>
          </div>
        </div>

        {/* CTA footer */}
        <div style={{ borderTop: '1px solid #F1F5F9', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: club.color }}>View Club →</span>
        </div>
      </div>
    </Link>
  );
}

// ── Clubs List Page ───────────────────────────────────────────────────────────
export function CampusHubClubsPage() {
  return (
    <CampusHubLayout>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', padding: '60px 32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(225,29,72,0.15)', border: '1px solid rgba(225,29,72,0.3)', borderRadius: 999, padding: '6px 18px', marginBottom: 24 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#E11D48"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span style={{ color: '#FDA4AF', fontSize: 13, fontWeight: 600 }}>6 Active Clubs</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', marginBottom: 16, fontFamily: "'Righteous', sans-serif" }}>
          Our <span style={{ background: 'linear-gradient(135deg, #FB7185, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Clubs</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Explore the clubs that power campus life — from code to culture, sports to startups.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {CLUBS_DATA.map(club => <ClubCard key={club.id} club={club} />)}
        </div>
      </div>
    </CampusHubLayout>
  );
}

// ── Club Detail Page ──────────────────────────────────────────────────────────
export function CampusHubClubDetail() {
  const { clubId } = useParams<{ clubId: string }>();
  const club = CLUBS_DATA.find(c => c.id === clubId);

  if (!club) {
    return (
      <CampusHubLayout>
        <div style={{ textAlign: 'center', padding: '80px 32px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 8 }}>Club not found</h2>
          <Link to="/campushub/clubs" style={{ color: '#E11D48', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>← Back to Clubs</Link>
        </div>
      </CampusHubLayout>
    );
  }

  const { Logo } = club;

  return (
    <CampusHubLayout>
      {/* Hero cover */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
        <img src={club.coverImg} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${club.heroBg.replace('linear-gradient(135deg,', '').replace(')', '')}`, opacity: 0.85 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7))' }} />
        {/* Back button */}
        <div style={{ position: 'absolute', top: 24, left: 32 }}>
          <Link to="/campushub/clubs" style={{ textDecoration: 'none' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              All Clubs
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 64px' }}>
        {/* Club identity row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: -40, marginBottom: 40, flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', flexShrink: 0 }}>
            <Logo size={80} />
          </div>
          <div style={{ paddingBottom: 4 }}>
            <div style={{ fontSize: 11, color: club.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{club.tagline}</div>
            <h1 style={{ fontSize: 34, fontWeight: 900, color: '#111', letterSpacing: '-0.04em', margin: 0 }}>{club.name}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
          {/* Left column */}
          <div>
            {/* About */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 14, letterSpacing: '-0.03em' }}>About the Club</h2>
              <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 15 }}>{club.longDesc}</p>
            </div>

            {/* Activities */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 14, letterSpacing: '-0.03em' }}>What We Do</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {club.activities.map((act, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: club.bg, borderRadius: 12, border: `1px solid ${club.color}22` }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: club.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 14, letterSpacing: '-0.03em' }}>Gallery</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {club.galleryImgs.map((img, i) => (
                  <div key={i} style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 14, letterSpacing: '-0.03em' }}>Achievements</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {club.achievements.map((ach, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: club.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Stats card */}
            <div style={{ background: '#fff', borderRadius: 18, padding: 24, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 18 }}>Club Stats</div>
              {[
                { label: 'Members', value: club.members, icon: '👥' },
                { label: 'Events / Year', value: club.events, icon: '📅' },
                { label: 'Founded', value: club.founded, icon: '🏛️' },
              ].map(stat => (
                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 14, color: '#64748B' }}>{stat.label}</span>
                  <span style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Lead card */}
            <div style={{ background: '#fff', borderRadius: 18, padding: 24, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Club Lead</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: club.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>{club.lead.charAt(0)}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{club.lead}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>Club President</div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div style={{ background: club.bg, borderRadius: 18, padding: 20, border: `1px solid ${club.color}22` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: club.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Contact</div>
              <a href={`mailto:${club.contact}`} style={{ fontSize: 13, color: '#374151', textDecoration: 'none', fontWeight: 500 }}>{club.contact}</a>
            </div>

            {/* CTA */}
            <Link to="/campushub/events" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '14px', borderRadius: 14, border: 'none', background: club.gradient, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: `0 6px 20px ${club.color}44` }}>
                View Club Events →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </CampusHubLayout>
  );
}
