# SPEC: Motion Experience Upgrades (v1.0)

## Goal Statement
Deliver premium yet restrained motion across navigation, scrolling, and hero/case-study surfaces while respecting accessibility, performance, and reduced-motion preferences.

## Acceptance Criteria
- AC-1: Native View Transitions enabled with shared-element mappings for logo, hero CTA, and case-study cards, with Framer fallback when unsupported.
- AC-2: Lenis-powered smooth scrolling integrated globally, respecting `prefers-reduced-motion`, and exposing hooks for scroll-tied animations.
- AC-3: Micro-interactions (split text reveals, magnetic CTA buttons, icon flourishes) implemented on hero, lead strip, and key CTAs with accessible fallbacks.
- AC-4: WebGL accents added to hero and case-study thumbnails using lightweight React Three Fiber components gated behind reduced-motion and capability checks.
- AC-5: Visual, accessibility, performance, and workflow Playwright suites updated to cover new interactions (route transitions, scroll depth, WebGL gating).

## Edge Cases
- View Transition API unavailable → fallback animations must still run without errors.
- Reduced-motion users → all smooth scrolling, parallax, and WebGL effects disable gracefully.
- Low-power/GPU-constrained devices → WebGL components skip rendering and fall back to static imagery.

## Out of Scope (MVP)
- Fully custom GSAP timelines per section (limit to CSS scroll timelines + light Motion usage).
- Authoring a public animation styleguide; documentation limited to inline code comments and evidence notes.

## Constraints
- Stack: Next.js 14 App Router, Framer Motion / Motion One, Lenis, React Three Fiber, SplitType.
- Performance: Avoid layout thrash; use transform/opacity; keep additional JS bundles minimal (<50KB gzip combined).
- Accessibility: Honour `prefers-reduced-motion`, maintain focus order, ensure new animations don’t block input.
