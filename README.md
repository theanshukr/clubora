<div align="center">

# 🎓 CampusHub — College Club & Event Management Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>A high-performance, glassmorphic web application built to streamline college club discovery, event ticketing, student registrations, and administrative control in one unified ecosystem.</strong>
</p>

[Explore Live Demo](https://clubora.vercel.app) • [Report Bug](https://github.com/theanshukr/clubora/issues) • [Request Feature](https://github.com/theanshukr/clubora/issues)

</div>

---

## 📌 Executive Summary

**CampusHub** bridges the gap between college clubs and the student body. Built with modern web standards, it delivers an intuitive experience for students to browse upcoming events and register seamlessly, while empowering club administrators with an **HR-grade Admin Control Center** to manage events, leadership rosters, participation analytics, and CSV report exports.

---

## ✨ Key Features & Capabilities

### 👨‍🎓 1. Student / Public Experience

| Feature | Description |
| :--- | :--- |
| **🎪 Dynamic Home Experience** | Hero banner showcasing flagship events, interactive upcoming event carousels, and club spotlights. |
| **🔍 Real-Time Search & Category Filters** | Instant search by event name or venue, with category pills (*Technical, Cultural, Sports, Workshop, Seminar, Competition*). |
| **🎟️ Comprehensive Event Details** | Full agenda, time, venue, seat availability indicators, and registration deadlines. |
| **📝 Frictionless Event Registration** | Validated registration flow with Indian phone format validation and instant confirmation feedback. |
| **👥 Dedicated Club Pages** | Profiles for student clubs featuring leadership info, active member counts, gallery, and past achievements. |
| **📱 100% Mobile Responsive** | Custom mobile slide drawer navigation, touch-friendly horizontal swipe tables, and fluid typography. |

---

### 🛡️ 2. Admin & Organization Suite

| Feature | Description |
| :--- | :--- |
| **📊 Real-Time Analytics Dashboard** | At-a-glance KPI cards tracking Total Events, Active Clubs, Total Registrations, and Category metrics. |
| **⚡ Event Lifecycle Management (CRUD)** | Create, edit, clone/duplicate, and delete events with customizable banner images and capacities. |
| **👁️ Live Draft vs. Published Toggle** | One-click publication visibility switcher to stage events before going live. |
| **🏢 Campus Clubs Directory** | Manage registered campus organizations, update president/leads, member counts, and contact emails. |
| **📋 Registration Roster & Approval Status** | Search, filter by event or status (*Approved, Pending, Rejected*), and change applicant status inline. |
| **📥 Instant CSV Export** | Export formatted student registration sheets for offline attendance and record keeping. |

---

## 🏗️ Architecture & Technology Stack

```
Frontend Architecture (SPA)
├── React 18 (Component Architecture & Hooks)
├── TypeScript (Type Safety & Interfaces)
├── React Router DOM v6 (Declarative Client-side Routing)
├── CSS3 Custom Properties (Design Tokens & Glassmorphism)
└── Vite (Lightning-fast HMR & Production Bundling)
```

- **Styling Philosophy**: Custom Glassmorphism UI with multi-layered backdrop blurs, animated fluid ambient background blobs, and sleek dark-mode aesthetics.
- **State Management**: Reactive local state stores with synchronous URL route syncing for persistent navigation.
- **Icons & Typography**: Material Symbols, Geist, Poppins, and Righteous display typography.

---

## 📂 Project Directory Structure

```
clubora/
├── README.md                      # Comprehensive project documentation
├── .gitignore                     # Git ignore rules for node_modules and builds
└── frontend/
    ├── package.json               # Dependencies and scripts
    ├── vite.config.ts             # Vite configuration with network host
    ├── tsconfig.json              # TypeScript root configuration
    ├── index.html                 # HTML5 template entry point
    └── src/
        ├── App.tsx                # App routing & lazy-loaded suspense wrapper
        ├── main.tsx               # DOM mount point
        ├── index.css              # Global tokens, glassmorphism, & responsive media queries
        ├── data/
        │   └── campusHubData.ts   # Core data types, seed events, and category configurations
        └── components/
            └── campushub/
                ├── CampusHubHome.tsx         # Public landing page & featured showcase
                ├── CampusHubEvents.tsx       # Searchable events catalog
                ├── CampusHubEventDetail.tsx  # Detailed event page
                ├── CampusHubRegister.tsx     # Student registration form
                ├── CampusHubClubs.tsx        # Club showcase & detail views
                ├── CampusHubAdmin.tsx        # Full-featured Admin Control Center
                ├── CampusHubLayout.tsx       # Header nav, mobile drawer, & footer layout
                ├── CampusHubLogo.tsx         # Isometric 3D SVG brand mark
                └── EventCard.tsx             # Reusable event card component
```

---

## ⚡ Getting Started & Local Development

### 1. Prerequisites
- **Node.js** >= `18.x`
- **npm** >= `9.x` (or `pnpm` / `yarn`)
- **Git**

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/theanshukr/clubora.git

# Navigate to the frontend directory
cd clubora/frontend

# Install dependencies
npm install
```

### 3. Run Development Server

```bash
npm run dev
```
The server will boot up at:
- **Local**: `http://localhost:3000/campushub`
- **Admin Panel**: `http://localhost:3000/campushub/admin`
- **Network (Mobile Testing on Same Wi-Fi)**: `http://<YOUR_LOCAL_IP>:3000/campushub`

### 4. Build for Production

```bash
npm run build
```
Creates an optimized production bundle in `frontend/dist/` with code-splitting and asset minification.

---

## 🚀 Deployment Guide

### Deploying on Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `clubora` repository.
4. Set the **Root Directory** to `frontend`.
5. Click **Deploy**.

### Deploying on Netlify
1. Log in to [Netlify](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Select your `clubora` repository.
3. Base directory: `frontend` | Build command: `npm run build` | Publish directory: `frontend/dist`.
4. Click **Deploy Site**.

---

## 📱 Mobile Testing & Device Verification

The application is engineered with mobile-first responsiveness:
- **Navigation Drawer**: Collapsible responsive hamburger menu for viewports `< 860px`.
- **Touch-Friendly Tables**: Scrollable table containers (`table-responsive`) that prevent viewport overflow on smaller screens.
- **Card Layouts**: Auto-collapsing grid systems adjusting seamlessly from 4-columns down to 1-column on smartphones.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Designed & Developed with ❤️ for Campus Communities.</sub>
</div>
