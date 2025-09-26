AEP: WebGL hero and case-study accents v1.0
Created: 2025-09-26 | Status: FROZEN | Dependencies: [M3]

Context
- Requirement: add subtle WebGL displacement to hero/case-study media for luxe feel.
- Impact: depth and polish without overwhelming content.
- Constraints: SSR disabled, skip on reduced-motion/low capability.

Execution Scope
- Deliverables: React Three Fiber components for hero background overlay and case-study card hover effect.
- Success criteria: effects render on capable devices, fallback imagery on others.
- Out of scope: heavy shader authoring or video backgrounds.

Technical Specs
- Use `dynamic` import with `{ ssr: false }`; detect reduced-motion.
- Leverage Drei helpers (e.g., `MeshDistortMaterial`) for lightweight implementation.

Quality Evidence Required
- Functionality: note of canvas render + fallback path.
- Performance: mention throttling strategy / conditional render.

Rollback Plan
- Failure conditions: performance regressions or WebGL errors.
- Reversion: disable dynamic imports and revert to static imagery.
- Data recovery: n/a.
