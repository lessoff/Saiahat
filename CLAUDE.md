# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Saiahat ("Travel" in Kazakh) is a tour booking platform for Kazakhstan's natural attractions. It features tour browsing, bookings, reviews, favorites, and an admin dashboard.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Apply pending migrations to the database
npm run db:seed      # Seed the database with sample data
```

## Architecture

**Stack:** Next.js 15 App Router · TypeScript · Tailwind CSS v4 · Supabase (auth + storage) · Drizzle ORM (PostgreSQL) · Zod · Framer Motion

**Path alias:** `@/*` maps to `./src/*`

### Authentication

Authentication uses Supabase Auth with SSR session management:
- `src/lib/supabase/server.ts` — server-side Supabase client (for Server Components & API routes)
- `src/lib/supabase/client.ts` — browser Supabase client
- `src/lib/auth/get-user.ts` — helper that fetches authenticated user + DB profile; use this in Server Components and API routes instead of calling Supabase directly
- `src/middleware.ts` — refreshes session on every request via `src/lib/supabase/middleware.ts`

### Database

Drizzle ORM connects directly to Supabase PostgreSQL. Schemas live in `src/db/schema/`:
- `users` — mirrors Supabase auth users; has a `role` field (`user` | `admin`)
- `tours` — main content table with `images[]` array, `popularityScore`
- `bookings`, `favorites`, `reviews` — all reference `users` and `tours` by FK

Schema relations are defined and exported from `src/db/schema/index.ts`. The Drizzle client is initialized in `src/db/index.ts`.

Config: `drizzle.config.ts` (uses `DATABASE_URL` env var).

### API Routes

All API routes are under `src/app/api/`:
- `/api/bookings` — create/read bookings
- `/api/favorites` — toggle favorites
- `/api/reviews` — create/list reviews
- `/api/upload` — image uploads to Supabase Storage
- `/api/admin/tours` — admin CRUD for tours
- `/api/admin/bookings` — admin booking management

Admin routes check `user.role === 'admin'` via `getUser()`.

### Validation

Zod schemas in `src/lib/validations/` (`tour.ts`, `booking.ts`, `review.ts`) are used in both API route handlers and client-side forms.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres
```

## Deployment

Deployed on Netlify (`netlify.toml` configured). Next.js image remote patterns allow `*.supabase.co` and Unsplash domains.


Dont use emojis 
