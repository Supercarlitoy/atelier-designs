import { test, expect } from "@playwright/test";

test.describe("Visual baselines", () => {
  test("homepage hero", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const hero = page.locator("#hero");
    await expect(hero).toHaveScreenshot("home-hero.png");
  });

  test("claim form", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/claim");
    const form = page.locator("form");
    await expect(form).toHaveScreenshot("claim-form.png");
  });

  test("signup form", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/signup");
    const form = page.locator("form");
    await expect(form).toHaveScreenshot("signup-form.png");
  });

  test("contact form", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");
    const form = page.locator("form");
    await expect(form).toHaveScreenshot("contact-form.png");
  });
});
