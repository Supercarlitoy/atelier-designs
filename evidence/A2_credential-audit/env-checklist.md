# Environment Checklist — Task A2

## Local Development
- `.env.local` should define:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only usage)
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_UPLOAD_PRESET`
- Ensure runtime does not expose `SUPABASE_SERVICE_ROLE_KEY` to browser bundle.

## Staging / Production
- Configure secrets via platform (e.g., Vercel Environment Variables):
  - Supabase URL + anon key in public scope.
  - Service role key in server scope only.
  - Cloudinary values in server scope.
- Align with middleware usage (`middleware.ts`, `utils/supabase/middleware.ts`).

## Validation Steps
- Verify `utils/supabase/client.ts` reads only public vars.
- Confirm `utils/supabase/admin.ts` guarded by server execution.
- Spot-check build output to ensure service role key excluded.
