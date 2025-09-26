# CI Workflows

1. **Static checks**
   - `npm run lint`
   - Optional typecheck (if added later)
2. **Unit/Integration**
   - Future slot (currently n/a)
3. **Playwright suites**
   - `PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/routes.spec.ts`
   - `PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/forms.spec.ts`
   - `PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/onboarding.spec.ts`
   - `PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/a11y.spec.ts`
   - `PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/perf.spec.ts`
   - `PLAYWRIGHT_SUPABASE_MOCK=1 npm run test:e2e -- tests/visual.spec.ts`
4. **Coverage & artifacts**
   - Collect Playwright reports/screenshots under `/evidence`.
5. **Perf/Accessibility gates**
   - Axe violations fail build.
   - Perf test enforces DCL ≤ 2000ms and LCP ≤ 2500ms.

Escalate on repeated perf breaches; merge blocked if lint, a11y, or Playwright failures occur. Update scripts as suites grow.
