import { test, expect } from "@playwright/test";
import axe from "axe-core";

declare global {
  interface Window {
    axe: typeof axe;
  }
}

async function checkAccessibility(page: Parameters<typeof test>[0]["page"], context: string) {
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => await window.axe.run());
  if (results.violations.length) {
    console.warn(`${context} accessibility violations`, results.violations);
  }
  expect(results.violations, `${context} has accessibility violations`).toEqual([]);
}

test.describe("Accessibility", () => {
  const pages = [
    { path: "/", context: "home" },
    { path: "/claim", context: "claim" },
    { path: "/signup", context: "signup" },
    { path: "/contact", context: "contact" }
  ];

  for (const pageConfig of pages) {
    test(`${pageConfig.context} page passes axe scan`, async ({ page }) => {
      await page.goto(pageConfig.path);
      await checkAccessibility(page, pageConfig.context);
    });
  }
});
