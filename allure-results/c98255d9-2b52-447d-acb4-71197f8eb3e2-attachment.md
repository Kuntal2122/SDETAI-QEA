# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home
- Location: tests/home.spec.ts:3:5

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByRole('link', { name: 'Home' })

```

# Test source

```ts
  1 | import {test, expect} from '@playwright/test'
  2 | 
  3 | test('Home', async({page})=>{
  4 |     const website = await page.goto('https://sauce-demo.myshopify.com/')
  5 |     const Home = page.getByRole('link', {name: 'Home'});
> 6 |     Home.click()
    |          ^ Error: locator.click: Test ended.
  7 |     const Page_Name = await page.title()
  8 |     console.log(Page_Name)
  9 | });
```