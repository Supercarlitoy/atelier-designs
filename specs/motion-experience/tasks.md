- TASK ID: M1
  TITLE: View transitions & navigation progress
  MAPS TO SPEC: AC-1
  DEPENDS ON: []
  ACCEPTANCE:
    - Enable Next.js view transitions with shared `view-transition-name` across logo, hero CTA, and case-study cards.
    - Provide fallback animation for unsupported browsers.
    - Add header scroll progress indicator using scroll timeline.
  EVIDENCE REQUIRED:
    - Functionality: screenshots/description of transitions.
    - Performance: confirmation transforms-only usage.

- TASK ID: M2
  TITLE: Lenis smooth scroll foundation
  MAPS TO SPEC: AC-2
  DEPENDS ON: [M1]
  ACCEPTANCE:
    - Global Lenis provider with reduce-motion guard and cleanup.
    - Hook exposing scroll progress for future components.
  EVIDENCE REQUIRED:
    - Functionality: provider description + test note.
    - Accessibility: reduced-motion check documented.

- TASK ID: M3
  TITLE: Micro-interactions & text reveals
  MAPS TO SPEC: AC-3
  DEPENDS ON: [M2]
  ACCEPTANCE:
    - Split text reveal on hero and key headings using SplitType.
    - Magnetic motion on hero & lead CTA buttons.
    - Optional Lottie-based icon flourish integrated with pause on blur.
  EVIDENCE REQUIRED:
    - Functionality: description/screenshots of new states.
    - Accessibility: statement on reduced-motion behaviour.

- TASK ID: M4
  TITLE: WebGL hero and case-study accents
  MAPS TO SPEC: AC-4
  DEPENDS ON: [M3]
  ACCEPTANCE:
    - React Three Fiber displacement effect on hero background & case-study thumbnails, gated behind dynamic import + reduced-motion.
    - Graceful fallback to static images when disabled.
  EVIDENCE REQUIRED:
    - Functionality: evidence of canvas rendering and fallback path.
    - Performance: note on throttling/conditional rendering.

- TASK ID: M5
  TITLE: Test suite updates & documentation
  MAPS TO SPEC: AC-5
  DEPENDS ON: [M4]
  ACCEPTANCE:
    - Playwright suites updated to assert new transitions, Lenis integration, WebGL gating, and magnetic button behaviour.
    - Evidence summary + CI workflow update recorded.
  EVIDENCE REQUIRED:
    - Functionality: updated test logs & notes.
    - Accessibility/Performance: mention of lint/a11y/perf suites rerun.
