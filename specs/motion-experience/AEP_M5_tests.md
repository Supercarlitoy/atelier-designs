AEP: Test suite updates & documentation v1.0
Created: 2025-09-26 | Status: FROZEN | Dependencies: [M4]

Context
- Requirement: ensure new motion stack is verifiable in CI.
- Impact: confidence that transitions, smooth scroll, micro-interactions, and WebGL gating behave as expected.
- Constraints: reuse Playwright setup with mocks; keep runtime manageable.

Execution Scope
- Deliverables: expanded Playwright specs (route transitions, motion states, WebGL toggles) and updated evidence log/CI workflow.
- Success criteria: all suites pass, docs refreshed with commands.
- Out of scope: visual diff SaaS integration (tracked separately).

Technical Specs
- Add assertions for `document.startViewTransition` support, Lenis data attributes, presence/absence of WebGL canvas, and magnetic button transform.
- Update `.ci/workflows.md` + `docs/todos.md` to reflect new automation steps.

Quality Evidence Required
- Functionality: updated test logs & notes / evidence entry.
- Accessibility/Performance: mention lint/a11y/perf rerun after changes.

Rollback Plan
- Failure conditions: flake due to animations.
- Reversion: revert new tests and adjust features as needed.
- Data recovery: n/a.
