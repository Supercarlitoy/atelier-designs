- TASK ID: A1
  TITLE: Establish constitution baseline
  MAPS TO SPEC: Goal, AC-1
  DEPENDS ON: []
  ACCEPTANCE:
    - memory/CONSTITUTION.md exists with all sections.
    - Approval workflow documented.
  EVIDENCE REQUIRED:
    - Security: Constitution review notes.
    - Functionality: Owner approval recorded.

- TASK ID: A2
  TITLE: Service credential readiness audit
  MAPS TO SPEC: AC-1, Constraints
  DEPENDS ON: [A1]
  ACCEPTANCE:
    - Inventory Supabase/Cloudinary credentials + env placement.
    - Secret handling plan validated.
  EVIDENCE REQUIRED:
    - Security: Credential audit artifact.
    - Functionality: Env checklist signed.

- TASK ID: A3
  TITLE: Execution traceability framework
  MAPS TO SPEC: AC-2, AC-3
  DEPENDS ON: [A2]
  ACCEPTANCE:
    - Task→evidence mapping + gating procedure finalized.
    - Evidence folder scaffolding created.
  EVIDENCE REQUIRED:
    - Functionality: Approved tasks.md with gates.
    - Security: Evidence index excludes sensitive data.
