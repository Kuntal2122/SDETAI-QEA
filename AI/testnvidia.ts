import { askNvidia } from './nvidia';

async function main() {

    const response = await askNvidia(`
A Playwright test is failing.

Test name:
ticket count should be 2

Error:
expect(locator).toHaveText()

Expected: "2"
Received: "1"

Locator:
#ticket-count

Explain:

1. What is the likely root cause?
2. Why did the test fail?
3. What should I change in my Playwright test?
4. Provide the corrected Playwright TypeScript code.

IMPORTANT:
- We are using Playwright with TypeScript.
- Do not provide Python or Java code.
- Answer as an experienced SDET.
`);

    console.log('\n🤖 NVIDIA AI TEST ANALYSIS:\n');
    console.log(response);
}

main();