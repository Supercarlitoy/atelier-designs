# Credential Inventory — Task A2

## Supabase
- Project URL env var: `NEXT_PUBLIC_SUPABASE_URL`
- Anon key env var: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Service role key env var: `SUPABASE_SERVICE_ROLE_KEY`
- Client helper: `utils/supabase/client.ts`
- Server helper: `utils/supabase/server.ts`
- Admin helper usage: `utils/supabase/admin.ts` (requires service role key)

## Cloudinary
- Account variables (per `.env.example`):
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_UPLOAD_PRESET`
- Assets referenced via `/public/` directory and upload presets (future OG image generation)

## Notes
- No secrets captured; references only.
- Confirmed presence of `.env.example` with required keys.
