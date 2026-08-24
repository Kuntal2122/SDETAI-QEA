# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web.spec.ts >> Table Data
- Location: tests/web.spec.ts:3:6

# Error details

```
Error: locator.check: Test ended.
Call log:
  - waiting for getByLabel('impressiveRadio')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.only('Table Data', async ({ page }) => {
  4  |   await page.goto('https://demoqa.com/webtables');
  5  |   const title = await page.title();
  6  |   console.log(title);
  7  |   await expect(page).toHaveTitle(/demosite/); 
  8  | 
  9  |   // You do not need to store this in a variable unless you plan to reuse it
  10 |   await page.getByText('Radio Button').click();
  11 | 
  12 |   // 1. Create the locator (Notice there is NO 'await' or '.check()' here)
  13 |   const rad_but = page.getByLabel('Yes');
  14 |   
  15 |   // 2. Perform the action
  16 |   await rad_but.check();
  17 |   
  18 |   // 3. Assert against the locator
  19 |   await expect(rad_but).toBeChecked();
  20 |   const impressive_but = page.getByLabel('Impressive')
> 21 |   await impressive_but.check();
     |                        ^ Error: locator.check: Test ended.
  22 | });
```