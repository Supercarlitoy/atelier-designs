# API Response Samples — Task B2

## Claim submission
```json
{
  "ok": true,
  "id": "00000000-0000-0000-0000-000000000000"
}
```

Error (duplicate):
```json
{
  "ok": false,
  "error": "duplicate_submission",
  "message": "A claim with this email was recently submitted."
}
```

## Signup submission
```json
{
  "ok": true,
  "requestId": "00000000-0000-0000-0000-000000000000",
  "studioSlug": "studio-name"
}
```

Missing configuration (Supabase env absent):
```json
{
  "ok": false,
  "error": "configuration_error",
  "message": "Supabase configuration missing"
}
```

## Contact enquiry
```json
{
  "ok": true,
  "id": "00000000-0000-0000-0000-000000000000"
}
```
