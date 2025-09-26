import { test, expect } from "@playwright/test";

const shouldMock = process.env.PLAYWRIGHT_SUPABASE_MOCK !== "false";

async function mockEndpoint(
  page: Parameters<typeof test>[0]["page"],
  path: string,
  body: unknown
) {
  if (!shouldMock) {
    return;
  }

  await page.route(`**${path}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body)
    });
  });
}

test.describe("Form submissions", () => {
  test("claim form shows success message", async ({ page }) => {
    await mockEndpoint(page, "/api/profiles/claim", { ok: true, id: "mock-claim" });

    await page.goto("/claim");

    await page.getByLabel("Your name").fill("Alex Claimant");
    await page.getByLabel("Work email").fill("alex@example.com");
    await page.getByLabel("Which profile are you claiming?").selectOption("chromatix");
    await page.getByLabel("Proof of ownership").fill("https://example.com/proof");

    await Promise.all([
      page.waitForResponse((response) => response.url().includes("/api/profiles/claim")),
      page.getByRole("button", { name: /submit claim/i }).click()
    ]);

    await expect(page.getByText(/Thanks! Our team will review/)).toBeVisible();
  });

  test("claim form handles duplicate submission", async ({ page }) => {
    await mockEndpoint(page, "/api/profiles/claim", {
      ok: false,
      error: "duplicate_submission",
      message: "A claim with this email was recently submitted."
    });

    await page.goto("/claim");

    await page.getByLabel("Your name").fill("Alex Claimant");
    await page.getByLabel("Work email").fill("alex@example.com");
    await page.getByLabel("Which profile are you claiming?").selectOption("chromatix");
    await page.getByLabel("Proof of ownership").fill("https://example.com/proof");

    await Promise.all([
      page.waitForResponse((response) => response.url().includes("/api/profiles/claim")),
      page.getByRole("button", { name: /submit claim/i }).click()
    ]);

    await expect(
      page.getByText(/already submitted a claim recently/i)
    ).toBeVisible();
  });

  test("signup form acknowledges submission", async ({ page }) => {
    await mockEndpoint(page, "/api/profiles/signup", {
      ok: true,
      requestId: "mock-signup",
      studioSlug: "studio-slug"
    });

    await page.goto("/signup");

    await page.getByLabel("Your name").fill("Jordan Designer");
    await page.getByLabel("Work email").fill("jordan@example.com");
    await page.getByLabel("Studio name").fill("Studio Slug");
    await page.getByLabel("Location / suburb").fill("Fitzroy");
    await page.getByLabel("Website").fill("https://studio.example.com");
    await page.getByLabel("Tell us about your studio").fill("We make beautiful products.");
    await page.locator('input[type="checkbox"][name="services"]').first().check();

    await Promise.all([
      page.waitForResponse((response) => response.url().includes("/api/profiles/signup")),
      page.getByRole("button", { name: /create draft profile/i }).click()
    ]);

    await expect(page.getByText(/Thanks! Your draft profile has been created/)).toBeVisible();
  });

  test("signup form surfaces duplicate message", async ({ page }) => {
    await mockEndpoint(page, "/api/profiles/signup", {
      ok: false,
      error: "duplicate_submission",
      message: "A signup request already exists."
    });

    await page.goto("/signup");

    await page.getByLabel("Your name").fill("Jordan Designer");
    await page.getByLabel("Work email").fill("jordan@example.com");
    await page.getByLabel("Studio name").fill("Studio Slug");
    await page.getByLabel("Location / suburb").fill("Fitzroy");
    await page.getByLabel("Website").fill("https://studio.example.com");
    await page.getByLabel("Tell us about your studio").fill("We make beautiful products.");
    await page.locator('input[type="checkbox"][name="services"]').first().check();

    await Promise.all([
      page.waitForResponse((response) => response.url().includes("/api/profiles/signup")),
      page.getByRole("button", { name: /create draft profile/i }).click()
    ]);

    await expect(
      page.getByText(/already have a signup in review for this studio/i)
    ).toBeVisible();
  });

  test("contact form submits enquiry", async ({ page }) => {
    await mockEndpoint(page, "/api/leads/submit", { ok: true, id: "mock-lead" });

    await page.goto("/contact");

    await page.getByLabel("Name").fill("Taylor Client");
    await page.getByLabel("Email", { exact: true }).fill("taylor@example.com");
    await page.getByLabel("Organisation").fill("Great Org");
    await page.getByLabel("Project overview").fill("Looking for rebrand support.");
    await page.getByLabel("I agree to receive follow-up emails about my enquiry.").check();

    await Promise.all([
      page.waitForResponse((response) => response.url().includes("/api/leads/submit")),
      page.getByRole("button", { name: /send enquiry/i }).click()
    ]);

    await expect(page.getByText(/Thanks! We’ll be in touch within 24 hours./i)).toBeVisible();
  });

  test("contact form reports duplicate enquiry", async ({ page }) => {
    await mockEndpoint(page, "/api/leads/submit", {
      ok: false,
      error: "duplicate_submission",
      message: "We already have your enquiry."
    });

    await page.goto("/contact");

    await page.getByLabel("Name").fill("Taylor Client");
    await page.getByLabel("Email", { exact: true }).fill("taylor@example.com");
    await page.getByLabel("Organisation").fill("Great Org");
    await page.getByLabel("Project overview").fill("Looking for rebrand support.");
    await page.getByLabel("I agree to receive follow-up emails about my enquiry.").check();

    await Promise.all([
      page.waitForResponse((response) => response.url().includes("/api/leads/submit")),
      page.getByRole("button", { name: /send enquiry/i }).click()
    ]);

    await expect(page.getByText(/already have your enquiry/i)).toBeVisible();
  });
});
