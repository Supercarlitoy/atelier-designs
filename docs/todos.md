# Atelier Designs – Automated Verification Roadmap

## Routes & Workflows
- [x] Extend Playwright coverage to negative-path scenarios (duplicate, validation errors) for claim/signup/contact.
- [x] Add Playwright journeys for designer onboarding (profile editor save/submit) with Supabase-mocked responses.
- [x] Script smoke navigation across key routes (`/`, `/designers`, `/collections`, `/case-studies`, `/claim`, `/signup`, `/contact`).

## Visual Regression
- [x] Capture Playwright baseline screenshots for hero, claim/signup/contact forms.
- [ ] Evaluate integrating optional visual diff tooling (e.g., Percy) into CI for homepage + submission screens.

## Accessibility & Lint
- [x] Run `axe-core` scans within Playwright for hero, claim/signup/contact pages and record findings.
- [x] Enforce `npm run lint` as part of pre-commit/CI gate with documentation in evidence.

## Performance & Sync
- [x] Add Playwright-based performance check for homepage LCP/DCL budgets.
- [ ] Document Supabase sync expectations (cooldown windows, notification logs) and add integration test for persistence helper.

## CI Automation
- [x] Update `.ci/workflows.md` to chain lint → Playwright → visual/perf checks.
- [x] Provide CLI scripts (npm/yarn) to run each suite locally with `PLAYWRIGHT_SUPABASE_MOCK` toggle.
