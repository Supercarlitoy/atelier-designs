- TASK ID: B1
  TITLE: Supabase schema audit & policy notes
  MAPS TO SPEC: AC-1, AC-2, AC-3
  DEPENDS ON: []
  ACCEPTANCE:
    - Document how existing `public.leads` satisfies storage needs for the three forms.
    - Provide RLS checklist outlining recommended policies for the shared table.
  EVIDENCE REQUIRED:
    - Security: RLS policy notes.
    - Functionality: schema audit summary.

- TASK ID: B2
  TITLE: Persist claim/signup/contact API routes
  MAPS TO SPEC: AC-1, AC-2, AC-3, AC-4
  DEPENDS ON: [B1]
  ACCEPTANCE:
    - `/api/profiles/claim`, `/api/profiles/signup`, `/api/leads/submit` insert into Supabase via admin client with validation.
    - Env guard returns 503 with actionable message when service role missing.
    - Duplicate detection implemented per route (email+slug / email+timestamp).
  EVIDENCE REQUIRED:
    - Security: confirmation service role kept server-side.
    - Functionality: API response samples.

- TASK ID: B3
  TITLE: Form UX & error handling updates
  MAPS TO SPEC: AC-4
  DEPENDS ON: [B2]
  ACCEPTANCE:
    - Claim, signup, contact forms display loading state, success, and meaningful error copy.
    - Analytics events still fire after successful submission.
  EVIDENCE REQUIRED:
    - Functionality: screenshots or description of new states.
    - Accessibility: note on aria-live / focus handling.

- TASK ID: B4
  TITLE: Playwright coverage for submission flows
  MAPS TO SPEC: AC-5
  DEPENDS ON: [B3]
  ACCEPTANCE:
    - Add Playwright tests covering claim, signup, contact happy paths with Supabase mocked when necessary.
    - Document how to run tests with env toggles.
  EVIDENCE REQUIRED:
    - Functionality: test case references.
    - Coverage: statement of updated suite + run command.
