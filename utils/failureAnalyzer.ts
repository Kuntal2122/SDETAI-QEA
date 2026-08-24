import { askNvidia } from '../AI/nvidia';

export async function analyzeFailure(
    testName: string,
    errorMessage: string,
    url: string,
    testSource: string,
    errorContext: string,
    nodeConsoleLogs: string = '',
    browserConsoleLogs: string = ''
): Promise<string | null> {

    const prompt = `
You are a Senior SDET with 10+ years of Playwright TypeScript experience.

Analyze this REAL Playwright test failure.

========================================
TEST INFORMATION
========================================

Test Name:
${testName}

URL:
${url}

========================================
PLAYWRIGHT FAILURE
========================================

${errorMessage}

========================================
TEST SOURCE CODE
========================================

${testSource}

========================================
PLAYWRIGHT ERROR CONTEXT
========================================

${errorContext}

========================================
TEST CONSOLE OUTPUT
========================================

${nodeConsoleLogs || 'No console output captured.'}

========================================
BROWSER CONSOLE OUTPUT
========================================

${browserConsoleLogs || 'No browser console output captured.'}

========================================
YOUR TASK
========================================

1. Identify the SINGLE most likely root cause.

2. Classify the failure as exactly ONE of:
   - Test automation issue
   - Application defect
   - Environment issue

3. Give confidence:
   - High
   - Medium
   - Low

4. Explain WHY the failure happened.

5. Recommend the best fix.

6. Provide corrected Playwright TypeScript code
   ONLY if appropriate.

Important rules:

- Analyze the actual failure, test source, error context, AND console output together.
- BEFORE suggesting timing/wait/loading-related fixes, check TEST CONSOLE OUTPUT.
- Do NOT guess unnecessarily.
- Distinguish between:
  - Wrong locator
  - Wrong page
  - Timing issue
  - Incorrect test data
  - Incorrect assertion
  - Application defect
  - Environment issue
- Prefer Playwright Locator API.
- Prefer web-first assertions.
- Do NOT recommend waitForSelector unless absolutely necessary.
- Do NOT recommend locator.exists().
- Use locator.count() only when genuinely necessary.
- If an element does not exist, clearly say so.

Classification guidance:

- If the failure is caused by hardcoded test code such as:
  - out-of-range index
  - wrong expected value
  - bad selector
  classify as "Test automation issue".

- Only classify as "Application defect" when the UI/API produces
  incorrect behavior despite the test being correct.

- If fixing only the test code would make the failure disappear,
  classify it as "Test automation issue".

- NEVER recommend locator.exists().

Keep the answer under 250 words.

Return exactly:

Root Cause:
Classification:
Confidence:
Explanation:
Recommended Fix:
Corrected Code:
`;

    return await askNvidia(prompt);
}