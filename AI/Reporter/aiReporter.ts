import fs from 'fs';

import type {
    FullConfig,
    FullResult,
    Reporter,
    TestCase,
    TestResult
} from '@playwright/test/reporter';

import { analyzeFailure } from '../../utils/failureAnalyzer';

class AIReporter implements Reporter {

    async onTestEnd(
        test: TestCase,
        result: TestResult
    ): Promise<void> {

        // Ignore passed/skipped tests
        if (result.status !== 'failed') {
            return;
        }

        console.log('\n');
        console.log('==============================================');
        console.log('❌ PLAYWRIGHT TEST FAILURE');
        console.log('==============================================');

        const testName = test.title;
        const testFile = test.location.file;

        const projectName =
            test.parent.project()?.name || 'default';

        console.log(`Test   : ${testName}`);
        console.log(`File   : ${testFile}`);
        console.log(`Project: ${projectName}`);

        // ================================================
        // 1. Collect Playwright errors
        // ================================================

        const errors = result.errors ?? [];

        let errorMessage = errors
            .map((error, index) => {

                return `
--- Error ${index + 1} ---

MESSAGE:
${error.message ?? 'No error message'}

STACK:
${error.stack ?? 'No stack trace'}
`;
            })
            .join('\n');

        if (!errorMessage.trim()) {

            errorMessage = `
Test failed but Playwright did not provide result.errors.

Test: ${testName}
File: ${testFile}
Status: ${result.status}
Duration: ${result.duration}ms
`;
        }

        // ================================================
        // 2. Read test source code
        // ================================================

        let testSource = '';

        try {

            testSource = fs.readFileSync(
                testFile,
                'utf-8'
            );

        } catch {

            testSource =
                'Unable to read test source file.';
        }

        // ================================================
        // 3. Read error context + runtime URL
        // ================================================

        let errorContext = '';
        let currentUrl = 'URL not available';

        for (const attachment of result.attachments ?? []) {

            // --------------------------------------------
            // Playwright error context
            // --------------------------------------------

            if (
                attachment.name === 'error-context' &&
                attachment.path
            ) {

                try {

                    errorContext = fs.readFileSync(
                        attachment.path,
                        'utf-8'
                    );

                } catch {

                    errorContext =
                        'Unable to read error context.';
                }
            }

            // --------------------------------------------
            // Runtime URL
            // --------------------------------------------

            if (
                attachment.name === 'current-url' &&
                attachment.path
            ) {

                try {

                    currentUrl = fs.readFileSync(
                        attachment.path,
                        'utf-8'
                    ).trim();

                } catch {

                    currentUrl =
                        'Unable to read current URL.';
                }
            }
        }

        console.log(`URL    : ${currentUrl}`);

        // ================================================
        // 4. Send failure to NVIDIA AI
        // ================================================

        console.log(
            '\n🤖 Sending failure to NVIDIA AI...\n'
        );

        try {

            const analysis = await analyzeFailure(
                testName,
                errorMessage,
                currentUrl,
                testSource,
                errorContext,
                projectName
            );

            // ============================================
            // 5. Print AI analysis
            // ============================================

            if (analysis) {

                console.log(
                    '\n🤖 NVIDIA AI FAILURE ANALYSIS:\n'
                );

                console.log(analysis);

            } else {

                console.log(
                    '⚠️ NVIDIA AI returned no analysis.'
                );
            }

        } catch (error) {

            // ============================================
            // AI failure must NOT break Playwright
            // ============================================

            console.error(
                '\n⚠️ NVIDIA AI analysis failed:\n'
            );

            console.error(
                error instanceof Error
                    ? error.message
                    : error
            );
        }
    }

    async onBegin(
        config: FullConfig,
        suite: any
    ): Promise<void> {

        console.log('\n🤖 AI Reporter initialized');
    }

    async onEnd(
        result: FullResult
    ): Promise<void> {

        console.log('\n🤖 AI Reporter finished');
    }
}

export default AIReporter;