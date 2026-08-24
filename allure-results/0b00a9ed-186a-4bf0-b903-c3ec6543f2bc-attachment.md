# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: aidemo.spec.ts >> AI should analyze Playwright failure
- Location: tests/aidemo.spec.ts:3:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('#ticket-count')
Expected: "2"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#ticket-count')

```

```yaml
- heading "Example Domain" [level=1]
- paragraph: This domain is for use in documentation examples without needing permission. Avoid use in operations.
- paragraph:
  - link "Learn more":
    - /url: https://iana.org/domains/example
```

# Test source

```ts
  1  | import { test, expect } from '../fixture/Aitest';
  2  | 
  3  | test('AI should analyze Playwright failure', async ({ page }) => {
  4  | 
  5  |     await page.goto('https://example.com');
  6  | 
  7  |     const locator = page.locator('#ticket-count');
  8  | 
> 9  |     await expect(locator).toHaveText('2');
     |                           ^ Error: expect(locator).toHaveText(expected) failed
  10 | 
  11 | });
```