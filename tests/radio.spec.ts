import { test, expect } from '@playwright/test';

test('Radio buttons', async ({ page }) => {

    await page.goto(
        'https://testpages.eviltester.com/pages/forms/basic-inputs/'
    );

    const radio1 = page.locator('#radio-input-1');
    const radio2 = page.locator('#radio-input-2');

    // Select Radio 1
    await radio1.check();

    console.log(
        'Radio 1:',
        await radio1.isChecked()
    );

    console.log(
        'Radio 2:',
        await radio2.isChecked()
    );

    // Select Radio 2
    await radio2.check();

    console.log(
        'Radio 1:',
        await radio1.isChecked()
    );

    console.log(
        'Radio 2:',
        await radio2.isChecked()
    );
});