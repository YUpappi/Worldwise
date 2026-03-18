# WorldWise

WorldWise is a travel log app that lets you pin cities on a map, add notes and dates, and revisit your journeys. It uses React, Vite, Leaflet, and Supabase for auth and data storage.

## Features
- Interactive map with click-to-add city flow
- City and country lists with details
- Notes and visit dates per city
- Supabase authentication
- User-scoped data with Row Level Security

## Tech Stack
- React + Vite
- React Router
- React Query
- Leaflet / React Leaflet
- Supabase

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env.local` in the project root:
```
VITE_SUPABASE_KEY="YOUR_SUPABASE_ANON_KEY"
```

### 3. Supabase setup
Create a `cities` table with at least these columns:
- `id` (bigint or uuid, primary key)
- `cityName` (text)
- `country` (text)
- `emoji` (text)
- `notes` (text)
- `date` (timestamptz)
- `lat` (double precision)
- `lng` (double precision)
- `user_id` (uuid, references `auth.users(id)`)
- `created_at` (timestamptz, default now)

Enable RLS and add policies:
```sql
alter table public.cities enable row level security;

create policy "users can read own cities"
on public.cities
for select
to authenticated
using (auth.uid() = user_id);

create policy "users can insert own cities"
on public.cities
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "users can update own cities"
on public.cities
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users can delete own cities"
on public.cities
for delete
to authenticated
using (auth.uid() = user_id);
```

### 4. Run the app
```bash
npm run dev
```

## Scripts
- `npm run dev` starts the Vite dev server
- `npm run build` builds for production
- `npm run preview` previews the production build

## Project Structure
- `src/Components` UI components
- `src/Pages` route pages
- `src/context` providers
- `src/services` Supabase API wrappers

## Notes
- Use the **Supabase anon/public key** in the client. Do not use the service role key in the browser.
- If your map tiles do not render, ensure Leaflet CSS is loaded in `src/main.jsx`.

## License
MIT
