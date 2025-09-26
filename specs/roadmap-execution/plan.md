# PLAN for SPEC v1.0

## Architecture
- No code changes in planning phase; document touchpoints only.
- Reference components: hero, overlays, modals.
- APIs: Supabase interfaces, notifications, stub routes.
- Data/state: Profile lifecycle draft→review→publish.

## Dependencies
- Supabase anon + service role credentials.
- Cloudinary account + upload preset.

## Risks & Mitigations
- Missing constitution → block; request creation.
- External config delays → add env verification tasks.

## Test Strategy
- Unit: Supabase helpers, form handlers.
- e2e: Extend to signup/claim/contact after wiring.
- Performance: Lighthouse for LCP/INP after integrations.
- A11y: axe audits on forms/modals.
