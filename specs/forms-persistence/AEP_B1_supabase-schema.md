AEP: Supabase schema & policy specification v1.0
Created: 2025-09-26 | Status: FROZEN | Dependencies: []

Context
- Business requirement: persistence tables for claim, signup, and contact flows.
- User journey impact: ensures moderation team receives actionable records.
- Technical constraints: Must align with Supabase (Postgres) and support RLS.

Execution Scope
- Deliverables: `schema.sql` defining tables; `rls-checklist.md` documenting policies.
- Success criteria: schema addresses required fields, timestamps, status enums; RLS guidance differentiates anon vs service role.
- Out of scope: Executing migrations on live Supabase.

Technical Specifications
- Use UUID primary keys, ISO timestamps, and indexes on email/slug.
- Provide suggestions for unique constraints to prevent duplicates.

Quality Evidence Required
- Security: RLS notes referencing Supabase docs.
- Functionality: SQL script stored under `evidence/B1_supabase-schema/`.

Rollback Plan
- Failure conditions: Schema incompatible with existing tables.
- Reversion steps: Update SQL and rerun review.
- Data recovery: N/A (documentation task).
