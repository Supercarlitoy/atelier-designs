# SPEC: Forms Persistence & Supabase Integration (v1.1)

## Goal Statement
Persist claim, signup, and contact enquiries to Supabase (reusing the existing `leads` table) so moderation and sales teams can action real submissions while maintaining existing UX and analytics flows.

## Acceptance Criteria
- AC-1: `/api/profiles/claim` stores claim submissions in `public.leads` with `source='claim_form'`, providing validation, duplicate protection, and success/error messaging consumed by `app/claim/page.tsx`.
- AC-2: `/api/profiles/signup` writes draft signup requests to `public.leads` with `source='signup_form'`, triggers notification, and returns status the client form uses for optimistic UX.
- AC-3: `/api/leads/submit` writes contact enquiries to `public.leads` with `source='contact_form'`, enforcing consent and basic field validation.
- AC-4: Forms surface friendly error states when Supabase is unreachable or env secrets are missing.
- AC-5: Playwright coverage asserts happy-path submissions for claim, signup, and contact flows.

## Edge Cases
- Missing Supabase env vars → routes must respond with 503 and inform ops.
- Duplicate submissions from same email/source within cooling window.
- Supabase mutation errors (RLS, validation) bubble with supportable error codes.

## Out of Scope (MVP)
- Automated email replies or CRM sync.
- Authenticated dashboard for reviewing submissions.

## Constraints
- Stack: Next.js 14 App Router, Supabase JS v2, Playwright e2e.
- Compliance: Supabase RLS (service role only on server), privacy-safe logging.
- Perf targets: API mutations ≤ 400ms p95; no blocking UI spinners > 3s.
- UX/a11y: Existing forms keep keyboard/focus handling; error copy accessible to screen readers.
