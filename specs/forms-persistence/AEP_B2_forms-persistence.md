AEP: Persist claim/signup/contact API routes v1.0
Created: 2025-09-26 | Status: FROZEN | Dependencies: [B1]

Context
- Business requirement: real submissions stored for follow-up.
- User journey impact: forms must continue to feel fast and reliable.
- Technical constraints: Supabase service role available only server-side; must guard env presence.

Execution Scope
- Deliverables: Updated API route handlers, shared persistence utilities, improved error handling.
- Success criteria: Successful 200 responses on valid payload, 4xx on validation errors, 503 on missing env.
- Out of scope: Email notifications beyond existing `queueNotification` stub.

Technical Specifications
- Use `supabaseAdmin` for mutations.
- Implement duplicate detection with 1-hour cooling window for claim and signup.
- Log errors via `console.error` with sanitized payloads.

Quality Evidence Required
- Security: Evidence env guard prevents client exposure.
- Functionality: Example JSON responses attached in evidence folder.

Rollback Plan
- Failure conditions: Routes break existing tests or analytics.
- Reversion steps: Restore previous implementations from git.
- Data recovery: N/A (no prod execution here).
