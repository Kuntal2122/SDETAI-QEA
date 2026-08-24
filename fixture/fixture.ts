import { test as base, expect, Locator } from '@playwright/test';

type MyFixtures = {
    fixedTable: Locator;
};

export const test = base.extend<MyFixtures>({
    fixedTable: async ({ page }, use) => {

        const table = page
            .locator('fieldset')
            .filter({ hasText: 'Web Table Fixed header' })
            .locator('table#product');

        await use(table);
    }
});

export { expect };