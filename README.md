# Saiahat

A tour booking platform for Kazakhstan's natural attractions. "Saiahat" (Саяхат) means "travel" in Kazakh.

## Features

- Browse and search tours by name, location, price, difficulty, and duration
- Interactive map view of all tour locations (Leaflet)
- Tour detail page with photo gallery (up to 5 photos), location map, and similar tour recommendations
- Book tours with date, adult, and child traveler selection
- Save favorite tours
- Write and read reviews with star ratings and photos
- Community feed for sharing travel experiences with media uploads
- User profile with booking history and favorites
- AI chatbot powered by Groq (Llama 3.3 70B) for tour recommendations and Q&A
- Admin dashboard for managing tours, bookings, and viewing stats

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Auth:** Supabase Auth (SSR)
- **Database:** PostgreSQL via Supabase + Drizzle ORM
- **Storage:** Supabase Storage (tour and community images)
- **Validation:** Zod
- **Animations:** Framer Motion
- **Maps:** Leaflet + React Leaflet
- **AI Chatbot:** Groq SDK (Llama 3.3 70B)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Groq](https://console.groq.com) API key

### Installation

```bash
git clone https://github.com/your-username/saiahat.git
cd saiahat
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres.your-project:password@aws-X-XX.pooler.supabase.com:5432/postgres
GROQ_API_KEY=your-groq-api-key
GEMINI_API_KEY=your-gemini-api-key
```

### Database Setup

```bash
npm run db:generate   # Generate migrations from schema
npm run db:migrate    # Apply migrations to the database
npm run db:seed       # Seed with sample tour data
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Login and signup pages
│   ├── tours/            # Tour catalog and detail pages
│   ├── profile/          # User profile, bookings, favorites
│   ├── community/        # Community post feed
│   ├── about/            # About page
│   ├── admin/            # Admin dashboard (role-gated)
│   └── api/              # API route handlers
├── components/
│   ├── tours/            # Tour card, gallery, map, booking form, reviews, similar tours
│   ├── layout/           # Navbar, footer
│   ├── home/             # Hero, featured tours, CTA
│   ├── profile/          # Bookings list, favorites list
│   ├── community/        # Feed, post card, create post form
│   ├── admin/            # Tour form, booking actions
│   └── ChatWidget.tsx    # AI chatbot floating widget
├── db/                   # Drizzle schema and client
├── lib/                  # Auth helpers, Supabase clients, Zod schemas, queries
└── middleware.ts          # Session refresh on every request
```

## Admin Access

Set a user's `role` to `admin` in the `users` table. Admin routes are protected at the layout level by checking `user.role === 'admin'`.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Apply pending migrations
npm run db:seed      # Seed the database with sample tour data
```

## Deployment

The project is deployed on Vercel. Set the same environment variables in your Vercel project settings before deploying.
