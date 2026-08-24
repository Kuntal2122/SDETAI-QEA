import { test, expect } from '../fixture/Aitest';

test.skip('AI should analyze Playwright failure', async ({ page }) => {

    await page.goto('https://example.com');

    const locator = page.locator('#ticket-count');

    await expect(locator).toHaveText('2');

});