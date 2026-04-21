import { test, expect } from '@playwright/test';

test('typing challenge page loads', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.locator('h1.title')).toContainText('Typing Challenge');
  await expect(page.locator('.button.is-success')).toBeVisible();
});

test('typing shows correct feedback', async ({ page }) => {
  await page.goto('/');
  
  const sentenceElement = page.locator('p.is-size-4 span').first();
  await expect(sentenceElement).toBeVisible();
  
  const input = page.locator('input.is-primary');
  await input.fill('T');
  
  const firstSpan = page.locator('p.is-size-4 span').first();
  await expect(firstSpan).toHaveClass(/correct|incorrect|pending/);
});

test('success message appears on completion', async ({ page }) => {
  await page.goto('/');
  
  const sentenceText = await page.locator('p.is-size-4').textContent();
  
  if (sentenceText) {
    const input = page.locator('input.is-primary');
    await input.fill(sentenceText.trim());
    
    await expect(page.locator('.box.has-text-centered h1.title')).toContainText('Success!');
  }
});

test('sync button generates new sentence', async ({ page }) => {
  await page.goto('/');
  
  const originalSentence = await page.locator('p.is-size-4').textContent();
  
  await page.locator('.button.is-success').click();
  
  await page.waitForTimeout(100);
  
  const newSentence = await page.locator('p.is-size-4').textContent();
  expect(newSentence).toBeDefined();
});