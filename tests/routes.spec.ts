import { test, expect } from "@playwright/test";

const ROUTES = [
  { path: "/", heading: /Designers\. Curated\./i },
  { path: "/designers", heading: /Curated Melbourne designers/i },
  { path: "/collections", heading: /Curated groupings/i },
  { path: "/case-studies", heading: /Deep dives/i },
  { path: "/claim", heading: /Verify ownership/i },
  { path: "/signup", heading: /List your Melbourne studio/i },
  { path: "/contact", heading: /Let’s build your shortlist/i }
];

test.describe("Navigation smoke tests", () => {
  for (const route of ROUTES) {
    test(`loads ${route.path}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
    });
  }
});
