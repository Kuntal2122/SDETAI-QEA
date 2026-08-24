import { test, expect } from '../fixture/Aitest';

test('test one', async ({ page }) => {

    await page.goto(
        'https://testpages.eviltester.com/pages/input-elements/number-inputs/'
    );

    const numberInput = page.locator('#number-input');

    await numberInput.click();
    await numberInput.fill("454354354");
    await numberInput.clear();


    const range = page.locator('#range-input');

    const box = await range.boundingBox();

    if (!box) {
        throw new Error('Range slider not found');
}   

const x = box.x + box.width * 0.75;
const y = box.y + box.height / 2;

await page.mouse.click(x, y);
    await page.goto('https://testpages.eviltester.com/pages/forms/basic-inputs/');
    const radio_button = page.locator('#radio-input-1');
    await radio_button.click();
});