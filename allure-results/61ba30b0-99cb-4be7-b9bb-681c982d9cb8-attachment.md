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
  1  | import { test, expect } from '../fixture/aiFixture';
  2  | 
  3  | test('AI should analyze Playwright failure', async ({
  4  |     page,
  5  |     analyzeTestFailure
  6  | }) => {
  7  | 
  8  |     await page.goto('https://example.com');
  9  | 
  10 |     const locator = page.locator('#ticket-count');
  11 | 
  12 |     try {
  13 | 
> 14 |         await expect(locator).toHaveText('2');
     |                               ^ Error: expect(locator).toHaveText(expected) failed
  15 | 
  16 |     } catch (error) {
  17 | 
  18 |         const errorMessage =
  19 |             error instanceof Error
  20 |                 ? error.message
  21 |                 : String(error);
  22 | 
  23 |         const aiAnalysis = await analyzeTestFailure(
  24 |             'AI should analyze Playwright failure',
  25 |             errorMessage,
  26 |             page.url()
  27 |         );
  28 | 
  29 |         console.log('\n🤖 NVIDIA AI ANALYSIS:\n');
  30 |         console.log(aiAnalysis);
  31 | 
  32 |         throw error;
  33 |     }
  34 | });
```