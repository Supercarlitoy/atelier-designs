AEP: Playwright coverage for submission flows v1.0
Created: 2025-09-26 | Status: FROZEN | Dependencies: [B3]

Context
- Business requirement: Automated assurance for key submission journeys.
- User journey impact: Prevent regressions in claim/signup/contact flows.
- Technical constraints: Supabase unavailable in CI; need mock or interception.

Execution Scope
- Deliverables: New Playwright specs that mock Supabase responses and assert UX states.
- Success criteria: Tests pass locally/CI, documenting how to run with `PLAYWRIGHT_SUPABASE_MOCK=1`.
- Out of scope: Negative-path coverage beyond duplicate detection.

Technical Specifications
- Use Playwright `page.route` to intercept API requests and respond with success payloads when real Supabase not configured.
- Validate analytics events via console log listener or data attribute.

Quality Evidence Required
- Functionality: Link to new test file and summary of assertions.
- Coverage: Mention command to run suite.

Rollback Plan
- Failure conditions: Tests flake or slow down suite substantially.
- Reversion steps: Disable new tests and revisit mocking strategy.
- Data recovery: N/A.
