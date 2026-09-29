// CampusHub Data — Professional with real Unsplash images

export type EventCategory =
  | 'Technical'
  | 'Cultural'
  | 'Sports'
  | 'Workshop'
  | 'Competition'
  | 'Seminar'
  | 'Other';

export interface CHEvent {
  id: string;
  name: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  description: string;
  shortDescription: string;
  image: string;        // Unsplash URL
  organizer: string;
  organizerLogo: string; // Unsplash avatar
  registrationDeadline: string;
  maxParticipants: number;
  createdAt: string;
  status?: 'Published' | 'Draft';
}

export interface CHRegistration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  collegeYear: string;
  phone: string;
  registeredAt: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

export const SEED_EVENTS: CHEvent[] = [
  {
    id: 'ev-001',
    name: 'Hackathon 2026',
    category: 'Technical',
    date: '2026-10-12',
    time: '9:00 AM',
    venue: 'Main Auditorium',
    shortDescription: '24-hour coding marathon. Build innovative solutions and win prizes worth ₹1 lakh.',
    description: 'Join us for the biggest hackathon of the year! Teams of up to 4 will compete over 24 hours to build solutions for real-world problems. Industry mentors, food, swag, and prizes worth ₹1,00,000 up for grabs. All skill levels welcome — from beginners to pros.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    organizer: 'Coding Club',
    organizerLogo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&q=80',
    registrationDeadline: '2026-10-08',
    maxParticipants: 200,
    createdAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'ev-002',
    name: 'Dance Night 2026',
    category: 'Cultural',
    date: '2026-10-18',
    time: '6:00 PM',
    venue: 'Open Amphitheatre',
    shortDescription: 'An electrifying evening of classical, contemporary, and folk dance performances.',
    description: 'Experience the best of classical, contemporary, and folk dance forms performed by talented student groups across departments. The spectacular night concludes with a DJ set and open dance floor. Refreshments and merchandise available on site.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    organizer: 'Cultural Committee',
    organizerLogo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&q=80',
    registrationDeadline: '2026-10-15',
    maxParticipants: 500,
    createdAt: '2026-09-05T00:00:00Z',
  },
  {
    id: 'ev-003',
    name: 'AI & ML Workshop',
    category: 'Workshop',
    date: '2026-10-22',
    time: '10:00 AM',
    venue: 'Computer Science Lab 3',
    shortDescription: 'Intensive hands-on workshop on building and deploying ML models from scratch.',
    description: 'Learn to build and deploy machine learning models in this intensive hands-on workshop led by industry experts. Topics include Python for ML, scikit-learn, neural networks with PyTorch, model evaluation, and cloud deployment on AWS. Prerequisites: Basic Python knowledge. Laptops required.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    organizer: 'AI Club',
    organizerLogo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&q=80',
    registrationDeadline: '2026-10-19',
    maxParticipants: 60,
    createdAt: '2026-09-10T00:00:00Z',
  },
  {
    id: 'ev-004',
    name: 'Inter-College Cricket',
    category: 'Sports',
    date: '2026-10-25',
    time: '8:00 AM',
    venue: 'College Cricket Ground',
    shortDescription: '3-day inter-college cricket tournament with 12 teams battling for the championship.',
    description: 'The flagship annual Inter-College Cricket Tournament returns! Twelve college teams battle across 3 days of intense matches in knockout format. Register individually for spectator passes with reserved grandstand seating, food stalls, and live commentary. Championship trophy + cash prize for winners.',
    image: 'https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=800&q=80',
    organizer: 'Sports Committee',
    organizerLogo: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=100&q=80',
    registrationDeadline: '2026-10-20',
    maxParticipants: 300,
    createdAt: '2026-09-12T00:00:00Z',
  },
  {
    id: 'ev-005',
    name: 'Entrepreneurship Summit',
    category: 'Seminar',
    date: '2026-11-02',
    time: '11:00 AM',
    venue: 'Seminar Hall A',
    shortDescription: 'One-day summit with startup founders, investors, and innovation leaders.',
    description: 'A power-packed one-day summit bringing together successful startup founders, angel investors, VCs, and innovation leaders. Sessions include keynote talks, live panel discussions, fireside chats, and a live startup pitch competition with ₹50,000 seed funding as the grand prize.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    organizer: 'E-Cell',
    organizerLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&q=80',
    registrationDeadline: '2026-10-28',
    maxParticipants: 250,
    createdAt: '2026-09-15T00:00:00Z',
  },
  {
    id: 'ev-006',
    name: 'Debate Championship',
    category: 'Competition',
    date: '2026-11-08',
    time: '2:00 PM',
    venue: 'Multi-purpose Room',
    shortDescription: 'Inter-department debate in British Parliamentary format. Solo or team of 2.',
    description: 'The annual inter-department debate championship in British Parliamentary format. Categories: Freshers (1st & 2nd year), Seniors (3rd & 4th year), and Open. Participants can register solo or as a team of 2. Three rounds of elimination followed by grand finals. Cash prizes and trophies for top 3.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    organizer: 'Literary Club',
    organizerLogo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&q=80',
    registrationDeadline: '2026-11-05',
    maxParticipants: 80,
    createdAt: '2026-09-20T00:00:00Z',
  },
];

export const SEED_REGISTRATIONS: CHRegistration[] = [
  { id: 'reg-001', eventId: 'ev-001', name: 'Arjun Sharma', email: 'arjun@college.edu', collegeYear: '3rd Year, CSE', phone: '9876543210', registeredAt: '2026-09-15T10:30:00Z' },
  { id: 'reg-002', eventId: 'ev-001', name: 'Priya Mehta', email: 'priya@college.edu', collegeYear: '2nd Year, IT', phone: '9123456789', registeredAt: '2026-09-16T14:00:00Z' },
  { id: 'reg-003', eventId: 'ev-002', name: 'Rahul Verma', email: 'rahul@college.edu', collegeYear: '4th Year, ECE', phone: '9988776655', registeredAt: '2026-09-17T09:00:00Z' },
  { id: 'reg-004', eventId: 'ev-003', name: 'Sneha Patel', email: 'sneha@college.edu', collegeYear: '1st Year, DS', phone: '9876501234', registeredAt: '2026-09-18T11:45:00Z' },
  { id: 'reg-005', eventId: 'ev-001', name: 'Karan Singh', email: 'karan@college.edu', collegeYear: '3rd Year, ME', phone: '9765432100', registeredAt: '2026-09-19T16:20:00Z' },
  { id: 'reg-006', eventId: 'ev-004', name: 'Meera Nair', email: 'meera@college.edu', collegeYear: '2nd Year, EEE', phone: '9845678901', registeredAt: '2026-09-20T08:00:00Z' },
  { id: 'reg-007', eventId: 'ev-005', name: 'Dev Patel', email: 'dev@college.edu', collegeYear: '4th Year, MBA', phone: '9765001234', registeredAt: '2026-09-21T12:00:00Z' },
];

export const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; light: string }> = {
  Technical:   { bg: '#2563EB', text: '#fff', light: 'rgba(37,99,235,0.12)' },
  Cultural:    { bg: '#7C3AED', text: '#fff', light: 'rgba(124,58,237,0.12)' },
  Sports:      { bg: '#059669', text: '#fff', light: 'rgba(5,150,105,0.12)' },
  Workshop:    { bg: '#D97706', text: '#fff', light: 'rgba(217,119,6,0.12)' },
  Competition: { bg: '#DC2626', text: '#fff', light: 'rgba(220,38,38,0.12)' },
  Seminar:     { bg: '#0891B2', text: '#fff', light: 'rgba(8,145,178,0.12)' },
  Other:       { bg: '#6B7280', text: '#fff', light: 'rgba(107,114,128,0.12)' },
};

export const ALL_CATEGORIES: string[] = ['All', 'Technical', 'Cultural', 'Sports', 'Workshop', 'Competition', 'Seminar', 'Other'];
