import { test, expect } from "@playwright/test";

test.describe("profiles", () => {
  test("renders Chromatix profile with share controls", async ({ page }) => {
    await page.goto("/profiles/chromatix");
    await expect(page.getByRole("heading", { name: /Chromatix/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Copy link/i })).toBeVisible();
  });
});
