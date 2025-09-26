AEP: Service credential readiness audit v1.0
Created: 2025-02-14 | Status: FROZEN | Dependencies: [A1]

Context
- Business: Verify externals before persistence wiring.
- Journey: Prevent runtime failures in signup/claim.
- Constraints: No secrets exposed.

Execution Scope
- Deliverables: Credential inventory; env placement plan.
- Success: Checklist signed; risks logged.
- Out of scope: Key rotation.

Technical Specs
- Interfaces: Supabase client/server helpers; Cloudinary upload.
- Env schema: .env* and deployment secrets.

Quality Evidence Required
- Security: Audit artifact.
- Functionality: Env readiness confirmation.

Rollback Plan
- Failure: Missing credentials.
- Reversion: Document blockers; halt downstream tasks.
- Recovery: Remove temp secrets securely.
