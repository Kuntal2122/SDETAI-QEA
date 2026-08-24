import { test, expect } from '../fixture/Aitest';

test('Dropdown', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/AutomationPractice/'
    );

    // Select the second table
    const table = page.locator('#product').nth(1);

    const rowCount = await table.locator('tr').count();

    console.log(`Total Rows: ${rowCount}`);

    // Dropdown
    const dropdown = page.locator('#dropdown-class-example');

    const optionCount = await dropdown.locator('option').count();

    console.log(`Total Options: ${optionCount}`);

    // Select 3rd option
    await dropdown.selectOption({ index: 2 });

    // Input field
    const type = page.getByPlaceholder('Hide/Show Example');

    await type.fill('Kuntal');

    // Assertion
    await expect(type).toHaveValue('Kuntal');

    // Get actual value from the input
    const currentValue = await type.inputValue();

    if (currentValue !== '') {
        console.log(`Match found! The field is filled with: ${currentValue}`);
    } else {
        console.log('The field is currently empty.');
    }
});         