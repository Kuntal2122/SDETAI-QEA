import {
    test as base,
    expect
} from '@playwright/test';

export const test = base.extend({

    page: async ({ page }, use, testInfo) => {

        // Give the test the normal Playwright page
        await use(page);

        // Capture the actual URL after the test finishes
        const currentUrl = page.url();

        await testInfo.attach('current-url', {
            body: currentUrl,
            contentType: 'text/plain'
        });
    }
});

export { expect };