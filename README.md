# Atelier Designs

Production-ready skeleton for a Next.js App Router site showcasing independent designers. The scaffold includes Tailwind CSS for styling, Framer Motion for motion design, and TypeScript-first patterns ready for API and Supabase integrations.

## Tech stack
- Next.js 14 (App Router, TypeScript)
- React 18
- Tailwind CSS + PostCSS
- Framer Motion
- ESLint (Next.js core web vitals ruleset)

## Getting started
1. Install dependencies with `pnpm install` (or `npm install`).
2. Run `pnpm dev` to start the development server at `http://localhost:3000`.
3. Update components in `app/` and `components/` with real data, integrate Supabase, Cloudinary, and analytics as needed.

## Structure highlights
- `app/page.tsx` wires the hero, search strip, sticky navigation, featured designers carousel, how-it-works ladder, lead capture modal, testimonials carousel, case studies grid, newsletter sign-up, and footer.
- `components/` is grouped by feature (hero, navigation, featured, how-it-works, lead, testimonials, case studies, newsletter, footer) plus analytics helpers.
- `data/` seeds designers, testimonials, and case studies; API routes expose featured designers, leads, newsletter, profiles, and case studies stubs.
- Tailwind configuration includes base brand theming, reveal/parallax helpers, and focus token alignment with the spec.

## Testing

- Run `npm run test:e2e` to execute the Playwright smoke suite against the homepage. The command auto-starts the dev server if one is not already running.

## Next steps
- Connect Supabase or alternative backends for designer profiles, lead capture, and case study content.
- Replace placeholder copy, imagery, and data with production content.
- Add your preferred analytics script in `app/layout.tsx` when ready.
- Configure deployment target (Vercel recommended) once integrations are wired.
