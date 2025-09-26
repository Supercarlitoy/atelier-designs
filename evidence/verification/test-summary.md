# Automated Checks — 2025-09-26

Commands executed (with `PLAYWRIGHT_SUPABASE_MOCK=1` unless noted):
- `npm run lint`
- `npm run test:e2e -- tests/routes.spec.ts`
- `npm run test:e2e -- tests/forms.spec.ts`
- `npm run test:e2e -- tests/onboarding.spec.ts`
- `npm run test:e2e -- tests/a11y.spec.ts`
- `npm run test:e2e -- tests/perf.spec.ts`
- `npx playwright test tests/visual.spec.ts --update-snapshots`

All suites passed after accessibility contrast adjustments; visual baselines stored in `tests/visual.spec.ts-snapshots/`.
