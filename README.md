# Saiahat

A tour booking platform for Kazakhstan's natural attractions. "Saiahat" (Саяхат) means "travel" in Kazakh.

## Features

- Browse and search tours by name, location, price, difficulty, and duration
- Book tours with date and group size selection
- Save favorite tours
- Write and read reviews with star ratings
- Community feed for sharing travel experiences
- User profile with booking history and favorites
- Admin dashboard for managing tours, bookings, and viewing stats

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Auth:** Supabase Auth (SSR)
- **Database:** PostgreSQL via Supabase + Drizzle ORM
- **Storage:** Supabase Storage (tour images)
- **Validation:** Zod
- **Animations:** Framer Motion
- **Deployment:** Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

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
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

### Database Setup

```bash
npm run db:generate   # Generate migrations from schema
npm run db:migrate    # Apply migrations to the database
npm run db:seed       # Seed with sample data (optional)
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
├── components/           # Reusable UI components
├── db/                   # Drizzle schema and client
├── lib/                  # Auth helpers, Supabase clients, Zod schemas
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
npm run db:seed      # Seed the database with sample data
```

## Deployment

The project is configured for Netlify via `netlify.toml`. Set the same environment variables in your Netlify project settings before deploying.
