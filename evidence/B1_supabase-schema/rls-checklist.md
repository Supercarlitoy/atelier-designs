# RLS Policy Checklist — Shared Leads Table

## Current State
- Existing `public.leads` table stores all enquiry types.
- Row level security currently disabled; enable when moderation dashboard moves to Supabase Auth.

## Recommended Policies (when ready)
- Enable RLS: `alter table public.leads enable row level security;`
- Allow service role full access (insert/select/update/delete).
- Optional: allow anon inserts for Edge functions or API routes using `auth.role()` checks.
- Deny anon select to keep enquiry data private.

## Notes
- Since this project reuses `public.leads`, no new tables were provisioned.
- Duplicate prevention handled in application layer via email + source cooldown.
- Revisit policies before exposing a read interface to authenticated users.
