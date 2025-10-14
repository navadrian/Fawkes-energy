import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Fawkes Energy Website Smoke Tests', () => {
  test('homepage loads with hero heading', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check hero heading is visible
    const heroHeading = page.getByRole('heading', { name: /Deep Tech Battery Intelligence/i });
    await expect(heroHeading).toBeVisible();
  });

  test('charts render in Problem section', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that at least one chart canvas is present
    const chartCanvas = page.locator('canvas').first();
    await expect(chartCanvas).toBeVisible();
  });

  test('partner logos or fallbacks render in About section', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to About section
    await page.getByRole('heading', { name: /In Association With/i }).scrollIntoViewIfNeeded();
    
    // Check that partnership section exists
    const partnershipSection = page.getByRole('heading', { name: /In Association With/i });
    await expect(partnershipSection).toBeVisible();
    
    // Check for either logos or fallback text
    const hasRubaminLogo = await page.locator('img[alt*="Rubamin"]').count() > 0;
    const hasRubaminFallback = await page.locator('text=RUBAMIN').count() > 0;
    expect(hasRubaminLogo || hasRubaminFallback).toBeTruthy();
  });

  test('team section has at least 6 members', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to Team section
    await page.getByRole('heading', { name: /^Team$/i }).scrollIntoViewIfNeeded();
    
    // Count team member cards (they have User icons and names)
    const teamMembers = page.locator('.bg-background\\/30.rounded-lg.p-4');
    await expect(teamMembers).toHaveCount(6);
  });

  test('navigation links work', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check that navigation has links
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Click on a navigation link
    await page.getByRole('link', { name: /Problem/i }).click();
    
    // Verify URL updated with hash
    await expect(page).toHaveURL(/#problem/);
  });

  test('contact form is present', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to contact section
    await page.getByRole('heading', { name: /Get in Touch/i }).scrollIntoViewIfNeeded();
    
    // Check form elements exist
    await expect(page.getByPlaceholder(/Your Name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Your Email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Your Message/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
  });
});

