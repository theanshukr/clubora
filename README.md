# 🎓 CampusHub — College Club Event Management Web App

> A modern, responsive web application designed for students and administrators to discover, organize, and manage college club events and registrations with ease.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: `https://github.com/<your-username>/clubora`
- **Live Deployment**: `https://<your-project>.vercel.app`

---

## 📋 Features Checklist (100% Implemented)

### 👨‍🎓 1. Student / User Side
- [x] **Home Page**:
  - **Club Introduction**: Visual introduction to student clubs and campus societies.
  - **Featured Event**: Hero banner highlighting key flagship campus events.
  - **Upcoming Events**: Real-time listing and card carousel of upcoming activities.
  - **Categories Showcase**: Filter & jump directly into Technical, Cultural, Sports, and Workshops.
- [x] **Events Page**:
  - Grid list of all campus events with high-resolution imagery.
  - **Event Cards Details**: Name, Date & Time, Venue, Short Description, Category badge, and "Register" button.
  - **Search & Filter**: Real-time instant search by event name/venue and category filtering (Technical, Cultural, Sports, Workshop, Competition, Seminar).
- [x] **Event Detail Page**:
  - Full event agenda, description, organizer details, registration deadlines, and seat capacity.
- [x] **Event Registration**:
  - Registration form collecting: Student Name, Email, College/Year, and Phone Number.
  - Form validation with instant feedback toast notifications.
  - Automatic synchronization with the Admin Registrations roster.
- [x] **Clubs Directory & Detail Pages**:
  - Showcase for individual campus clubs with leadership, member counts, activities, and achievements.
- [x] **Fully Responsive Design**:
  - Optimized for mobile, tablet, and desktop screens with custom touch navigation drawers and responsive grids.

---

### 🛡️ 2. Admin Side
- [x] **Admin Dashboard Overview**:
  - High-level metric cards: Total Events, Active Campus Clubs, Total Registrations, and Active Categories.
  - Top Events ranked by student participation and capacity fill rate.
- [x] **Event Management (CRUD)**:
  - **Add an Event**: Create new events with name, category, date, time, venue, description, cover image, and capacity.
  - **Edit an Event**: Update any existing event details in real-time.
  - **Delete an Event**: Safe deletion with confirmation modal.
  - **Duplicate Event**: Clone existing events into drafts with 1-click.
  - **Draft / Published Toggle**: Live publication visibility control.
- [x] **Club Management**:
  - Create, edit, and manage student clubs, leadership details, member counts, and public club links.
- [x] **Student Registrations Management**:
  - View all registered students with contact info and timestamps.
  - Live search across student name, email, and event name.
  - Filter by event and approval status (Approved, Pending, Rejected).
  - **CSV Export**: One-click download of registration data.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS with modern Glassmorphism, CSS Custom Properties, and responsive flex/grid utilities
- **Icons**: Material Symbols & Custom SVG Vector Icons
- **Typography**: Google Fonts (Geist, Poppins, Righteous)

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/clubora.git
   cd clubora/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - **Local Browser**: `http://localhost:3000/campushub`
   - **Admin Dashboard**: `http://localhost:3000/campushub/admin`
   - **Mobile Testing (Same Wi-Fi)**: `http://<your-ip-address>:3000/campushub`

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📱 Mobile Testing
The app is fully mobile-responsive. When running `npm run dev`, Vite exposes the network host so you can test directly on your mobile device by visiting `http://<YOUR_LOCAL_IP>:3000/campushub`.
