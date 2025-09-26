# PLAN for SPEC v1.0

## Architecture
- App: Update POST routes under `app/api` to use Supabase admin client for persistence, returning structured JSON.
- UI/Components: Ensure claim, signup, contact forms handle loading/error states and surface retry guidance.
- API/Services: Extend `utils/supabase/admin.ts` helpers, add repository utilities for form submissions, document how we reuse the existing `leads` table (no new tables required).
- Data/State machine: Encode duplicate/cooling logic per source within `leads`, storing structured summaries of claim/signup payloads.

## Dependencies
- Supabase project with service-role key and anon key loaded into env.
- Existing `public.leads` table capable of storing generic requests.
- Cloudinary unchanged; ensure env check doesn’t regress.

## Risks & Mitigations
- Risk: Missing service role key → Mitigation: Early env guard returning 503 with actionable message.
- Risk: Supabase schema divergence → Mitigation: Deliver SQL migration + RLS checklist in evidence.
- Risk: Playwright flake due to network → Mitigation: Mock Supabase via API interception when env absent.

## Test Strategy
- Unit: Validate submission utils with mocked Supabase client (if feasible); otherwise rely on integration tests.
- e2e: Extend Playwright to submit claim/signup/contact forms and assert success banner + analytics event stub.
- Performance: Log API response timings via console for future profiling.
- Accessibility: Ensure form error/status messages use `aria-live` regions (existing pattern) and verify via Playwright assertions.
