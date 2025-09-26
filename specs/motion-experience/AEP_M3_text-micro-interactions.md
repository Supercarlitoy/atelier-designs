AEP: Micro-interactions & text reveals v1.0
Created: 2025-09-26 | Status: FROZEN | Dependencies: [M2]

Context
- Requirement: deliver tactile micro-interactions (split text, magnetic buttons, icon flourishes).
- Impact: elevate perceived quality while remaining restrained and accessible.
- Constraints: avoid hydration issues, respect reduced-motion.

Execution Scope
- Deliverables: SplitType integration for hero/section headings, magnetic CTA buttons, optional Lottie flourish for success states.
- Success criteria: animations trigger on enter/hover only once, degrade gracefully.
- Out of scope: site-wide reanimation of all copy.

Technical Specs
- Install `split-type`, run split on client using `useEffect` with `requestAnimationFrame` guard.
- Implement magnetic effect with Framer Motion or Motion One using pointer vector.

Quality Evidence Required
- Functionality: documentation of behaviours with screenshots or text.
- Accessibility: statement on reduced-motion logic.

Rollback Plan
- Failure conditions: hydration mismatches or jitter.
- Reversion: remove split/magnetic components, restore static text/buttons.
- Data recovery: n/a.
