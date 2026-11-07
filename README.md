# Miirovelle Hotels & Real-Time Booking Management

An exquisite full-stack boutique hotel brand website and reservation management platform inspired by the character-rich European hospitality of Miiro. Features real-time local file database synchronization, live room availability calculation, multilingual support (EN, DE, ES, FR), guest booking reference lookup, interactive booking wizard, and administrative management console.

---

## 🌟 Key Features

1. **Brand Identity & Experience**
   - Signature boutique European destinations: London, Paris, Barcelona, Vienna, and Gstaad.
   - Distinctive typography using Cormorant Garamond & Plus Jakarta Sans.
   - Multilingual support with dynamic language switcher: English (EN), German (DE), Spanish (ES), and French (FR).
   - Customizable brand settings: Monogram, logo image, phone, email, and concierge contact details.

2. **Real-Time Booking Engine**
   - 4-step reservation wizard (Dates & Hotel Selection, Room Type & Live Availability, Add-ons & Guest Info, Instant Confirmation).
   - Live availability checking preventing double bookings against database records.
   - Add-on services: Artisan breakfast, late departure, airport transfers, and botanical wellness kits.

3. **Guest Self-Service Portal**
   - Direct reservation lookup by booking reference (e.g. `MRV-83921`) and guest email.
   - Printable booking receipt and confirmation summary.
   - Ability to self-cancel bookings with automatic inventory restoration to the local database.

4. **Local Database & Management Console**
   - Local JSON-backed file database (`data/database.json`) with thread-safe atomic writes.
   - Status transitions: `Confirmed`, `Checked-In`, `Completed`, and `Cancelled`.
   - Real-time booking metrics and filterable reservation table.
   - Direct database export (JSON) and seed reset functionality.
   - Built-in one-click project ZIP download.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher (Node 20+ recommended)
- `npm`, `pnpm`, or `bun`

### Installation

```bash
# 1. Clone or extract the repository
cd miirovelle-hotels

# 2. Install dependencies
npm install

# 3. Create your local environment configuration
cp .env.example .env

# 4. Start the development server (runs both frontend and backend on port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── data/
│   └── database.json          # Persistent local JSON database
├── public/
│   ├── favicon.svg            # Miirovelle brand monogram favicon
│   ├── site.webmanifest       # PWA / web application manifest
│   └── miirovelle-hotels-project.zip # Pre-packaged download archive
├── src/
│   ├── assets/
│   │   └── images/            # Curated boutique hotel & dining photography
│   ├── components/
│   │   ├── BookingModal.tsx   # 4-step interactive booking wizard
│   │   ├── BrandingSettingsModal.tsx # Custom brand/logo configurator
│   │   ├── DiningSection.tsx  # Neighborhood restaurant & bar showcase
│   │   ├── Footer.tsx         # Responsive luxury footer with contact info
│   │   ├── Hero.tsx           # Hero section with quick reservation bar
│   │   ├── HotelDetailModal.tsx # Full room breakdown & amenity view
│   │   ├── HotelsSection.tsx  # Hotel collection grid with city filters
│   │   ├── LanguageSelector.tsx # Multilingual switcher (EN, DE, ES, FR)
│   │   ├── LookupModal.tsx    # Guest reservation lookup & cancellation
│   │   ├── ManagementPortal.tsx # Internal staff dashboard & DB controls
│   │   ├── Navbar.tsx         # Sticky header with brand logo & navigation
│   │   └── PhilosophySection.tsx # Brand storytelling & ethos
│   ├── context/
│   │   └── LanguageContext.tsx # Context provider for active language
│   ├── i18n/
│   │   └── translations.ts    # Comprehensive dictionary (EN, DE, ES, FR)
│   ├── server/
│   │   └── db.ts              # Local database manager with atomic writes
│   ├── services/
│   │   └── api.ts             # Typed REST API client
│   ├── types.ts               # Complete TypeScript interfaces
│   ├── App.tsx                # Main app layout and modal coordination
│   ├── main.tsx               # Client React 19 entry point
│   └── index.css              # Global styles & Tailwind CSS v4 directives
├── .env.example               # Example environment variables
├── index.html                 # HTML shell with Google Fonts & metadata
├── metadata.json              # AI Studio application metadata
├── package.json               # Dependencies and scripts
├── server.ts                  # Express backend + Vite middleware server
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration with Tailwind CSS plugin
```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | `GET` | Health check and database sync status |
| `/api/stats` | `GET` | Summary statistics of reservations |
| `/api/hotels` | `GET` | List all hotels and room configurations |
| `/api/hotels/:id` | `GET` | Get single hotel details |
| `/api/availability` | `GET` | Query real-time room availability by dates |
| `/api/reservations` | `GET` | List reservations (supports filtering) |
| `/api/reservations` | `POST` | Create and confirm new reservation |
| `/api/reservations/lookup` | `GET` | Look up reservation by code & email |
| `/api/reservations/:id/status` | `PATCH` | Update status (Confirmed, Checked-In, etc.) |
| `/api/reservations/:id` | `DELETE` | Remove reservation from database |
| `/api/settings` | `GET` / `POST` | Read or update custom brand settings |
| `/api/database/export` | `GET` | Download raw JSON database file |
| `/api/database/reset` | `POST` | Reset database to default seed records |
| `/api/project/download-zip` | `GET` | Download the entire project in a `.zip` archive |

---

## 🛠️ Building for Production

```bash
# Build the client bundle
npm run build

# Start the production Node server
npm start
```

---

## 📜 License
Apache-2.0
