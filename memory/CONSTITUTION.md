# Constitution — Atelier Designs

## Security & Privacy
- Supabase RLS enforced for all profile data.
- No PII in logs or analytics payloads.

## Accessibility
- WCAG AA baseline.
- Honor reduced-motion; trap focus in modals; full keyboard nav.

## Performance Budgets
- LCP ≤ 2.0s (p75)
- INP ≤ 200ms (p75)
- API p95 ≤ 400ms (staging)

## Testing Standards
- Unit + integration where applicable.
- Playwright for critical journeys.
- Coverage target ≥ 85% for changed lines.

## Analytics Policy
- Track only events enumerated in homepage spec.
- Consent required before any tracking.

## Moderation & Reviews
- Human review before publishing designer profiles.
- Audit trail for all claim requests.

## Observability & Logging
- Structured logs with request IDs.
- Centralized analytics `track()` with schema registry.

## Change Control
- Any spec edit marks plan/tasks **STALE** until regenerated.
