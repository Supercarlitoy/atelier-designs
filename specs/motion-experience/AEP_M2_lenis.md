AEP: Lenis smooth scroll foundation v1.0
Created: 2025-09-26 | Status: FROZEN | Dependencies: [M1]

Context
- Requirement: introduce smooth scrolling baseline for premium feel.
- Impact: enables scroll-driven depth while keeping controls responsive.
- Constraints: disable for reduced-motion, minimal bundle overhead.

Execution Scope
- Deliverables: Lenis provider hooked into App layout, custom hook for scroll progress, cleanup on unmount.
- Success criteria: default scroll replaced with Lenis when allowed, no double-scroll issues.
- Out of scope: GSAP/ScrollTrigger scenes.

Technical Specs
- Install `@studio-freight/lenis`; set `wrapper` + `content` attributes.
- Use `matchMedia('(prefers-reduced-motion: reduce)')` to disable.

Quality Evidence Required
- Functionality: provider description in evidence.
- Accessibility: note verifying reduced-motion short-circuits.

Rollback Plan
- Failure conditions: jitter or input lag.
- Reversion: remove provider, restore native scroll.
- Data recovery: n/a.
