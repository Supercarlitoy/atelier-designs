# Build & Run Instructions

## Dev Server
- Copy `.env.example` to `.env.local` and complete credentials if you plan to wire analytics or external services.
- Run `pnpm dev` (or `npm run dev`). Always surface the detailed terminal output when comparing environments.

## Production Build & Start
- Generate a build with `pnpm build` (or `npm run build`).
- Start the production server with `pnpm start` (or `npm start`). Share the full logs so differences between environments are visible.

## What This Is
Production-ready skeleton for the Melbourne designers directory. Matches the locked Canvas spec: Vide-Infra hero, black search strip, sticky nav, parallax, featured designers, how-it-works with claim/signup mention, lead capture strip, testimonials scaffold, and API stubs for future phases.

## Prereqs
- Frameworks: Next.js (App Router) + React 18 + TypeScript + Tailwind CSS + Framer Motion (optional)
- Tooling: Node 20+, pnpm or npm, Git, VS Code
- Services: Vercel (deploy), Supabase (DB/auth/storage) [optional for profiles], Cloudinary (media) [optional], analytics provider of choice (optional)
- Design assets: Figma file and design tokens (typography, colours, spacing), brand logo, OG template

## Project Highlights
- App Router using the `/app` directory and typed API route handlers.
- Tailwind configured with smooth scrolling helpers and animation primitives.
- Hooks: `useParallax`, `useReveal`, `useStickyRange` – all respect the reduced-motion media query.
- Components wired for hero, search strip, featured designers carousel, how-it-works ladder + callout, lead capture modal, testimonials carousel, case studies grid, newsletter sign-up, and footer.
- API stubs ready for `designers/featured`, `leads/submit`, `newsletter/subscribe`, `/profiles`, and `/case-studies` endpoints.
- Seed data includes five real Melbourne studios plus testimonial + case-study fixtures to exercise UI states.

## Notes
- Fonts currently use system fallbacks; swap to licensed brand fonts when available.
- Profiles & moderation endpoints are scaffolds only—connect to Supabase or your backend of choice.
- Analytics wrapper (`lib/analytics.ts`) is a lightweight stub – plug in your preferred analytics when ready.
