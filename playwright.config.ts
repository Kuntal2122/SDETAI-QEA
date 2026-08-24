import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    reporter: [
        ['list'],
        ['./AI/Reporter/aiReporter.ts']
    ],

    use: {
        browserName: 'chromium',
        headless: false
    },

    workers: 5
});