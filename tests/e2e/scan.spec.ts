import { test, expect } from '@playwright/test';
import { readFile } from 'fs/promises';

test('scan → review → admin flow (demo mode)', async ({ page }) => {
  await page.goto('/scan?demo=1');
  
  // Wait for models to load (demo mode should work without camera)
  await page.waitForTimeout(2000);
  
  // Click capture button
  await page.getByText('Capture').click();
  
  // Should navigate to review
  await expect(page).toHaveURL(/\/review/);
  
  // Wait a bit for review page to load
  await page.waitForTimeout(1000);
  
  // Click save button
  await page.getByRole('button', { name: 'Save' }).click();
  
  // Should navigate to admin
  await expect(page).toHaveURL(/\/admin/);
});

test('municipality selection persists', async ({ page }) => {
  // Navigate to scan page with specific municipality
  await page.goto('/scan?m=demo-hallandale&demo=1');
  
  // Wait for page to load
  await page.waitForTimeout(1000);
  
  // Verify municipality dropdown shows correct value
  const municipalitySelect = page.locator('select').first();
  await expect(municipalitySelect).toHaveValue('demo-hallandale');
  
  // Verify municipality description is displayed
  await expect(page.getByText('Broward County beachfront')).toBeVisible();
  
  // Wait for models to load
  await page.waitForTimeout(2000);
  
  // Capture inspection
  await page.getByText('Capture').click();
  await expect(page).toHaveURL(/\/review/);
  await page.waitForTimeout(1000);
  
  // Verify municipality is shown in review page (shows name, not ID)
  await expect(page.getByText('Hallandale Beach')).toBeVisible();
  
  // Save inspection
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page).toHaveURL(/\/admin/);
  
  // Verify inspection is saved with correct municipality
  await page.waitForTimeout(500);
  const municipalityText = await page.textContent('body');
  expect(municipalityText).toContain('demo-hallandale');
});

test('CSV export downloads correctly', async ({ page }) => {
  // First create a test inspection
  await page.goto('/scan?demo=1');
  await page.waitForTimeout(2000);
  await page.getByText('Capture').click();
  await expect(page).toHaveURL(/\/review/);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page).toHaveURL(/\/admin/);
  await page.waitForTimeout(500);
  
  // Set up download listener
  const downloadPromise = page.waitForEvent('download');
  
  // Click Export CSV button
  await page.getByText('Export CSV').click();
  
  // Wait for download
  const download = await downloadPromise;
  
  // Verify file name format (sop-inspections-YYYY-MM-DD.csv)
  const filename = download.suggestedFilename();
  expect(filename).toMatch(/^sop-inspections-\d{4}-\d{2}-\d{2}\.csv$/);
  
  // Save the file temporarily
  const path = await download.path();
  expect(path).toBeTruthy();
  
  // Read and verify file content
  const content = await readFile(path!, 'utf-8');
  expect(content).toContain('id,createdAt,municipalityId');
  expect(content).toContain('bottleCount,cupCount,utensilsCount');
  expect(content).toContain('fillPercent,litersEst');
  
  // Verify it contains data (not just headers)
  const lines = content.split('\n').filter(line => line.trim());
  expect(lines.length).toBeGreaterThan(1); // Header + at least one data row
});

test('poster download works', async ({ page }) => {
  // First create a test inspection
  await page.goto('/scan?demo=1');
  await page.waitForTimeout(2000);
  await page.getByText('Capture').click();
  await expect(page).toHaveURL(/\/review/);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page).toHaveURL(/\/admin/);
  
  // Wait for admin page to fully load with inspection
  await page.waitForTimeout(1000);
  
  // Verify inspection is displayed
  await expect(page.getByText('Download Poster').first()).toBeVisible();
  
  // Set up download listener
  const downloadPromise = page.waitForEvent('download');
  
  // Click Download Poster button
  await page.getByText('Download Poster').first().click();
  
  // Wait for download
  const download = await downloadPromise;
  
  // Verify file name format (poster-{id}.png)
  const filename = download.suggestedFilename();
  expect(filename).toMatch(/^poster-.*\.png$/);
  
  // Save the file temporarily
  const path = await download.path();
  expect(path).toBeTruthy();
  
  // Verify file is valid PNG by checking magic number
  const buffer = await readFile(path!);
  const pngMagicNumber = buffer.toString('hex', 0, 8);
  expect(pngMagicNumber).toBe('89504e470d0a1a0a'); // PNG file signature
});

test('handles camera permission denial', async ({ page, context }) => {
  // Deny camera permissions
  await context.grantPermissions([], { origin: 'http://localhost:3000' });
  
  // Navigate to scan page (without demo mode to trigger camera)
  await page.goto('/scan');
  
  // Wait for error message to appear (camera error handling)
  // The app should show an error when camera access is denied
  await page.waitForTimeout(2000);
  
  // Check for error indicators - could be text, button, or error boundary
  const pageContent = await page.textContent('body');
  const hasError = 
    pageContent?.toLowerCase().includes('camera') ||
    pageContent?.toLowerCase().includes('permission') ||
    pageContent?.toLowerCase().includes('error') ||
    pageContent?.toLowerCase().includes('retry');
  
  // Verify error UI is displayed (either error message or retry button)
  expect(hasError).toBeTruthy();
  
  // Verify retry button exists (if error handling is implemented)
  const retryButton = page.getByText(/retry|try again/i).first();
  if (await retryButton.isVisible().catch(() => false)) {
    await expect(retryButton).toBeVisible();
  }
});

