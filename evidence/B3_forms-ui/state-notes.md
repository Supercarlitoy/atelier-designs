# Form State Notes — Task B3

## Claim form
- Displays duplicate submission message when API returns `duplicate_submission`.
- Shows configuration message when Supabase env missing (`configuration_error`).
- Success message unchanged, delivered via `role="status"` paragraph.
- Submission stored in `leads` with source `claim_form` and message JSON payload.

## Signup form
- Validates additional required fields (full name, bio).
- Maps Supabase error codes to friendly copy; analytics fire only on successful submission.
- Submission stored in `leads` with source `signup_form` (message includes studio data snapshot).

## Contact form
- Adds async submission using `/api/leads/submit` with loading state on button.
- Error/success feedback rendered inside `aria-live="polite"` paragraph to support screen readers.
- Requires consent checkbox before network call.
- Tracks `lead_submit` analytics event on success.
