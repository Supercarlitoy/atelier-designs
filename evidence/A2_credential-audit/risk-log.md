# Risk Log — Task A2 Credential Audit

| Risk | Impact | Likelihood | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Missing Supabase service role key in deployment | Blocks admin operations (profile publish) | Medium | Add deployment secret before enabling moderation tooling; monitor CI for missing envs | carlg |
| Cloudinary preset misconfiguration | OG/share image generation fails | Medium | Test upload preset via staging script prior to launch | carlg |
| Accidental exposure of service key in client bundle | Critical | Low | Keep service key server-side only; review bundle analyzer before release | carlg |
| Credential rotation without update | Runtime failures | Medium | Document rotation SOP; update `.env.example` and platform secrets simultaneously | carlg |
