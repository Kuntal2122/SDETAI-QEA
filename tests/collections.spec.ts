
import { test, expect } from '@playwright/test';

test('Home', async ({ page }) => {

    await page.goto('https://sauce-demo.myshopify.com/collections/all');

    const pageName = await page.title();
    console.log(`Page title: ${pageName}`);

    // Find all products
    const products = page.locator(
        'section.product-grid a[id^="product-"]'
    );

    const productCount = await products.count();

    console.log(`Total products: ${productCount}`);

    for (let i = 0; i < productCount; i++) {

        const product = products.nth(i);

        console.log(
            `Product ${i + 1}: ${await product.innerText()}`
        );
    }
});