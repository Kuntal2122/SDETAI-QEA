import { analyzeFailure } from '../utils/failureAnalyzer';

type Scenario = {
    label: string;
    testName: string;
    errorMessage: string;
    url: string;
    testSource: string;
    errorContext: string;
    nodeConsoleLogs: string;
    browserConsoleLogs: string;
    expectedRootCause: string; // what YOU expect the AI to say, for manual comparison
};

const scenarios: Scenario[] = [

    // ================================================
    // 1. Index out of bounds (the dropdown bug you found)
    // ================================================
    {
        label: 'Dropdown index out of bounds',
        testName: 'Dropdown',
        errorMessage: `
Test timeout of 30000ms exceeded.

Error: locator.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#dropdown-class-example')
    - locator resolved to <select id="dropdown-class-example">
  - attempting select option action
    - did not find some options
    - retrying select option action
`,
        url: 'https://rahulshettyacademy.com/AutomationPractice/',
        testSource: `
test('Dropdown', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const dropdown = page.locator('#dropdown-class-example');
    const optionCount = await dropdown.locator('option').count();
    console.log(\`Total Options: \${optionCount}\`);
    const select1 = await dropdown.selectOption({ index: 5 });
});
`,
        errorContext: 'select#dropdown-class-example contains 4 <option> elements.',
        nodeConsoleLogs: '[log] Total Options: 4',
        browserConsoleLogs: '',
        expectedRootCause:
            'index:5 is out of range — dropdown only has 4 options (valid indices 0-3). Not a timing issue.'
    },

    // ================================================
    // 2. Wrong/stale locator (element genuinely absent)
    // ================================================
    {
        label: 'Locator not found on page',
        testName: 'AI should analyze Playwright failure',
        errorMessage: `
Error: expect(locator).toHaveText(expected) failed
Locator: locator('#ticket-count')
Error: element(s) not found
`,
        url: 'https://example.com',
        testSource: `
test('AI should analyze Playwright failure', async ({ page }) => {
    await page.goto('https://example.com');
    const locator = page.locator('#ticket-count');
    await expect(locator).toHaveText('2');
});
`,
        errorContext: 'DOM snapshot at failure shows no element with id="ticket-count" anywhere on the page.',
        nodeConsoleLogs: '',
        browserConsoleLogs: '',
        expectedRootCause:
            'The target URL (example.com) is almost certainly wrong/a placeholder — it has no ticket-count element at all, unlike a real app page.'
    },

    // ================================================
    // 3. Assertion mismatch WITH evidence the value is
    //    actually correct but expectation is stale/wrong
    // ================================================
    {
        label: 'Incorrect expected test data',
        testName: 'Sold out products count',
        errorMessage: `
Error: expect(received).toBe(expected)
Expected: 3
Received: 2
`,
        url: 'https://www.saucedemo.com/inventory.html',
        testSource: `
test('soldout products', async ({ page }) => {
    const soldOutCount = await page.locator('.sold-out').count();
    console.log(\`Total Products Sold: \${soldOutCount}\`);
    expect(soldOutCount).toBe(3);
});
`,
        errorContext: 'Page shows 2 products marked SOLD OUT: "Brown Shades" and "White sandals".',
        nodeConsoleLogs: '[log] Total Products Sold: 2',
        browserConsoleLogs: '',
        expectedRootCause:
            'Test asserts 3 but console output + DOM both confirm only 2 sold-out products exist — the hardcoded expected value (3) in the test is wrong, not the app.'
    },

    // ================================================
    // 4. Real async/timing issue (genuine race condition,
    //    to make sure the AI does NOT over-correct and
    //    dismiss every timeout as "check your data")
    // ================================================
    {
        label: 'Genuine timing/race condition',
        testName: 'Cart badge updates after add to cart',
        errorMessage: `
Error: expect(locator).toHaveText(expected) failed
Locator: locator('.cart-badge')
Expected: "1"
Received: ""
Timeout: 5000ms
`,
        url: 'https://www.saucedemo.com/inventory.html',
        testSource: `
test('cart badge updates', async ({ page }) => {
    await page.click('.add-to-cart-btn');
    await expect(page.locator('.cart-badge')).toHaveText('1', { timeout: 5000 });
});
`,
        errorContext: 'Network log shows POST /cart/add returned 200 at T+4800ms, well after the assertion timeout window started.',
        nodeConsoleLogs: '',
        browserConsoleLogs: '[browser:log] Cart update pending...',
        expectedRootCause:
            'Genuine backend/network latency — the cart API call resolves after the assertion timeout. A real timing issue, not a data/index problem.'
    },

    // ================================================
    // 5. Application defect (app is genuinely broken,
    //    not a test problem)
    // ================================================
    {
        label: 'Application defect',
        testName: 'Checkout total calculates correctly',
        errorMessage: `
Error: expect(received).toBe(expected)
Expected: "£84.99"
Received: "£184.99"
`,
        url: 'https://www.saucedemo.com/checkout-step-two.html',
        testSource: `
test('checkout total', async ({ page }) => {
    const total = await page.locator('.summary_total_label').innerText();
    console.log(\`Total: \${total}\`);
    expect(total).toBe('£84.99');
});
`,
        errorContext: 'Cart contains exactly 2 items priced £39.99 and £45.00 (sum £84.99). UI displays £184.99 — a £100 discrepancy not explained by any visible line item.',
        nodeConsoleLogs: '[log] Total: £184.99',
        browserConsoleLogs: '[browser:error] Uncaught TypeError: NaN in applyDiscount()',
        expectedRootCause:
            'Browser console shows a JS error in applyDiscount() — the app itself is miscalculating the total. This is an application defect, not a test issue.'
    }
];

async function main() {

    for (const scenario of scenarios) {

        console.log('\n==============================================');
        console.log(`SCENARIO: ${scenario.label}`);
        console.log('==============================================');

        const result = await analyzeFailure(
            scenario.testName,
            scenario.errorMessage,
            scenario.url,
            scenario.testSource,
            scenario.errorContext,
            scenario.nodeConsoleLogs,
            scenario.browserConsoleLogs
        );

        console.log('\n🤖 NVIDIA AI FAILURE ANALYSIS:\n');
        console.log(result);

        console.log('\n✅ EXPECTED (for manual comparison):');
        console.log(scenario.expectedRootCause);
    }
}

main();