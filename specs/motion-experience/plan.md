# PLAN for SPEC v1.0

## Architecture
- App config: enable `experimental.viewTransition`, create shared transition mapping utility, and wrap layout with view-transition aware provider.
- Providers: add Lenis smooth scroll provider with `prefers-reduced-motion` guard and expose custom hook for scroll progress.
- Components: update hero, lead strip, CTA buttons, case-study cards with split text, magnetic motion, and WebGL accents (SSR disabled where needed).
- Styling: define CSS scroll-driven animations via `animation-timeline: view()` for section reveals and header progress indicator.

## Dependencies
- `@studio-freight/lenis`
- `split-type`
- `@motionone/dom` (or reuse Framer Motion for micro-interactions)
- `three`, `@react-three/fiber`, `@react-three/drei`
- Optional: `lottie-web` or `@dotlottie/player-component`

## Risks & Mitigations
- Risk: View Transitions inconsistent across browsers → detect support and fallback to Framer Motion transitions.
- Risk: WebGL payload heavy → lazy-load R3F components via `dynamic(() => import(...), { ssr: false })` and skip when `matchMedia('(prefers-reduced-motion: reduce)')` or low-end heuristics apply.
- Risk: Smooth scroll conflicts with native behaviour → provide toggle via `data-lenis-root` and disable for users who prefer defaults.

## Test Strategy
- Update Playwright suites to include route transition checkpoints (view transition support), magnetic button hover snapshots, and WebGL gating (presence of canvas when enabled).
- Extend accessibility tests to ensure new motion controls respect reduced-motion.
- Ensure visual snapshots updated after motion changes; monitor performance spec for LCP/INP budgets post-integration.
