# Playwright Coverage Notes — Task B4

- Added `tests/forms.spec.ts` covering claim, signup, and contact submissions (happy + duplicate paths).
- Route smoke tests live in `tests/routes.spec.ts`; designer onboarding flow in `tests/onboarding.spec.ts`.
- Accessibility, performance, and visual baselines tracked via `tests/a11y.spec.ts`, `tests/perf.spec.ts`, `tests/visual.spec.ts`.
- To run all suites individually:
  ```bash
  PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/forms.spec.ts
  PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/routes.spec.ts
  PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/onboarding.spec.ts
  PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/a11y.spec.ts
  PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/perf.spec.ts
  PLAYWRIGHT_SUPABASE_MOCK=1 npx playwright test tests/visual.spec.ts --update-snapshots
  ```
- Assertions verify success/error copy, analytics-friendly flows, and guard budgets for a11y/perf/visual regressions.
