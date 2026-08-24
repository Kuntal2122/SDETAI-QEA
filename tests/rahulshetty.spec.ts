import { test, expect } from '@playwright/test';

test('rahul shetty', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/AutomationPractice/'
    );

    const webtable = page
        .locator('#product tbody tr')
        .filter({ has: page.locator('td') });

    const web_count = await webtable.count();

    console.log(`Total Products Count is: ${web_count}`);

    const course =
        'QA Expert Course :Software Testing + Bugzilla + SQL + Agile';

    const row = page
        .locator('#product tr')
        .filter({ hasText: course });

    await expect(row).toBeVisible();

    await row.scrollIntoViewIfNeeded();

    console.log('Course is present in the table');
});


test('selectors_arc', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/AutomationPractice/'
    );

    const locator = page
        .locator('#product tbody tr')
        .filter({
            hasText: 'QA Expert Course'
        });

    await expect(locator).toBeVisible();

    console.log('QA Expert Course is present');
});

test('courses', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/AutomationPractice/'
    );

    const courses = page.locator('#product tbody tr td:nth-child(2)');
    const count = await courses.count();
    console.log(`Total Courses: ${count}`);

    for (let i=0; i <count; i++){
        console.log(`Course ${i + 1}: ${await courses.nth(i).innerText()}`)
    }
});
test('courses1', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/AutomationPractice/'
    );

    const courses = page.locator('div.tableFixHead table#product');
    const count = await courses.count();
    console.log(`Total Courses: ${count}`);

    for (let i=0; i <count; i++){
        console.log(`Course ${i + 1}: ${await courses.nth(i).innerText()}`)
    }
    const player = courses.locator('tbody tr').filter({
        hasText: 'Smith'
    })
    await expect(player).toBeVisible();
    console.log(await player.innerText());
});