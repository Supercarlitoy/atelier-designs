import { test, expect } from 'playwright/test';

const FEATURED_SECTION_ID = 'featured';
const LEAD_SECTION_ID = 'lead';

test.describe('Homepage experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero renders expected messaging and gradient', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toContainText('Designers. Curated.');
    await expect(hero.getByRole('link', { name: /Claim your profile/i }).first()).toBeVisible();

    const heroClass = await hero.getAttribute('class');
    expect(heroClass).toContain('hero-gradient');
  });

  test('menu overlay lists top designers', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /Open navigation menu/i });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/A Friend of Mine/)).toBeVisible();
    await dialog.getByLabel('Close menu').click();
    await expect(dialog).toBeHidden();
  });

  test('search strip returns suggestions and submits query', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Search designers' });
    await input.focus();
    await input.fill('brand');

    await Promise.all([
      page.waitForURL('**/search?q=brand'),
      page.getByRole('button', { name: /^Search$/i }).click(),
    ]);
  });

  test('featured designer contact modal opens and closes', async ({ page }) => {
    await page.locator(`#${FEATURED_SECTION_ID}`).scrollIntoViewIfNeeded();
    const firstCard = page.locator(`#${FEATURED_SECTION_ID}`).getByRole('article').first();
    const designerName = (await firstCard.getByRole('heading', { level: 3 }).first().innerText())?.trim() ?? '';
    const contactButton = firstCard.getByRole('button', { name: /Contact /i });
    await contactButton.click();
    const dialog = page.getByRole('dialog', { name: new RegExp(designerName, 'i') });
    await expect(dialog).toBeVisible();

    await dialog.getByLabel('Close contact form').click();
    await expect(dialog).toBeHidden();
  });

  test('lead capture workflow enforces consent before submit', async ({ page }) => {
    await page.getByRole('button', { name: /Request a brief/i }).click();
    const dialog = page.getByRole('dialog', { name: /Tell us about your project/i });
    await expect(dialog).toBeVisible();

    await dialog.getByLabel('Your name').fill('Alex Tester');
    await dialog.getByLabel('Email').fill('alex@example.com');
    await dialog.getByLabel('Project brief').fill('Test brief for automation.');

    await dialog.getByRole('button', { name: /Submit brief/i }).click();
    await expect(dialog.getByText(/I agree to be contacted/)).toBeVisible();

    await dialog.getByLabel(/I agree to be contacted/).check();
    await dialog.getByRole('button', { name: /Submit brief/i }).click();
    await expect(dialog.getByText(/Thanks! We’ll be in touch shortly./i)).toBeVisible();
  });

  test('testimonials carousel renders verified feedback', async ({ page }) => {
    await page.locator(`#${FEATURED_SECTION_ID}`).scrollIntoViewIfNeeded();
    await page.locator('#testimonials').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /Partners validating/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Next/i })).toBeVisible();
  });

  test('case studies section links to detail pages', async ({ page }) => {
    await page.locator(`#case-studies`).scrollIntoViewIfNeeded();
    const firstCard = page.getByRole('link', { name: /Brand refresh for a Fitzroy roastery/i });
    await expect(firstCard).toBeVisible();
    await firstCard.focus();
  });
});
