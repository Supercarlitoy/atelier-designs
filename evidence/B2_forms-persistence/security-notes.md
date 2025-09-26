# Security Notes — Task B2

- Service role usage isolated to server utilities via `getSupabaseAdmin` in `utils/supabase/admin.ts` (guards missing env vars with `SupabaseConfigError`).
- All forms write to the existing `public.leads` table with lower-cased emails to support duplicate detection.
- No client-side Supabase writes were introduced; forms continue to call server routes.
- Error handlers log sanitized payload details (no full form dumps).
