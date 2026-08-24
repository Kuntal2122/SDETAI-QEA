import { test, expect } from '@playwright/test';

test('soldout products', async ({ page }) => {

    await page.goto('https://sauce-demo.myshopify.com/collections/all');

    const soldout = page
        .locator('section.product-grid a[id^="product-"]')
        .filter({
            has: page.locator('.sold-out')
        });

    const sold_count = await soldout.count();

    console.log(`Total Products Sold: ${sold_count}`);

    for (let i = 0; i < sold_count; i++) {

        const product = soldout.nth(i);

        const title = await product.locator('h3').innerText();
        const price = await product.locator('h4').innerText();

        console.log(
            `Sold Out Product ${i + 1}: ${title} | ${price}`
        );
    }
});