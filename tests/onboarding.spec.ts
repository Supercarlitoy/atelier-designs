import { test, expect } from "@playwright/test";

test.describe("Designer onboarding", () => {
  test("profile editor saves draft and submits for review", async ({ page }) => {
    await page.route("**/api/profiles/chromatix", async (route) => {
      if (route.request().method() === "PUT") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ ok: true })
        });
        return;
      }
      await route.continue();
    });

    await page.route("**/api/profiles/chromatix/submit", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ state: "UNDER_REVIEW" })
      });
    });

    await page.goto("/profiles/chromatix/edit");

    const taglineInput = page.getByLabel("Tagline");
    await expect(taglineInput).toBeVisible();
    await taglineInput.fill("Conversion-led web experiences with measurable outcomes.");

    await Promise.all([
      page.waitForResponse((response) =>
        response.url().includes("/api/profiles/chromatix") && response.request().method() === "PUT"
      ),
      page.getByRole("button", { name: /save draft/i }).click()
    ]);

    await expect(page.getByText(/Saved\. Your draft is up to date\./i)).toBeVisible();

    await Promise.all([
      page.waitForResponse((response) =>
        response.url().includes("/api/profiles/chromatix/submit")
      ),
      page.getByRole("button", { name: /submit for review/i }).click()
    ]);

    await expect(page.getByText(/Submitted for review/i)).toBeVisible();
  });
});
