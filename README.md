# SafeSobati

Premium startup-grade mobility marketplace for tier-2 and tier-3 India.

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Shadcn-style component architecture
- Supabase (Auth + Database + Storage scaffolding)
- React Hook Form + Zod
- Framer Motion
- Lucide icons
- Google Maps and Razorpay integration ready

## Product Scope

- Customer ride search and booking flow
- Driver onboarding and verification flow
- Driver profile pages and dashboard
- Admin verification and operations dashboard
- Safety and trust-focused content pages
- SEO-first metadata, robots and sitemap

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment variables

```bash
cp .env.example .env.local
```

3. Run development server

```bash
npm run dev
```

4. Lint and build

```bash
npm run lint
npm run build
```

## Supabase Bootstrap

- Create a Supabase project.
- Add keys in .env.local.
- Run SQL from supabase/schema.sql in the Supabase SQL editor.
- Configure RLS policies based on rider, driver and admin roles.

## Project Structure

- src/app: App Router pages and route metadata
- src/components: Reusable UI, forms and sections
- src/lib: Constants, validations, SEO utilities, integrations, Supabase clients
- supabase/schema.sql: Initial table scaffolding

## Deployment

Deploy on Vercel with environment variables configured:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
- NEXT_PUBLIC_RAZORPAY_KEY_ID
