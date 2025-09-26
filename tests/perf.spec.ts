import { test, expect } from "@playwright/test";

declare global {
  interface Window {
    __lcp: PerformanceEntry[];
  }
}

test.describe("Performance budgets", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.__lcp = [] as PerformanceEntry[];
      new PerformanceObserver((entryList) => {
        window.__lcp.push(...entryList.getEntries());
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });
  });

  test("homepage meets timing thresholds", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const navigationTiming = await page.evaluate(() => {
      const navEntries = performance.getEntriesByType("navigation");
      return navEntries.length ? navEntries[0] : null;
    });

    const lcp = await page.evaluate(() => {
      if (!window.__lcp || window.__lcp.length === 0) {
        return null;
      }
      const last = window.__lcp[window.__lcp.length - 1] as PerformanceEntry & {
        renderTime?: number;
        loadTime?: number;
      };
      return last.renderTime ?? last.loadTime ?? null;
    });

    expect(navigationTiming).not.toBeNull();
    if (navigationTiming) {
      expect(navigationTiming.domContentLoadedEventEnd, "DCL under 2000ms").toBeLessThanOrEqual(2000);
    }

    if (lcp !== null) {
      expect(lcp, "LCP under 2500ms").toBeLessThanOrEqual(2500);
    }
  });
});
