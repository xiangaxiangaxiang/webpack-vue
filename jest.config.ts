export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.spec.ts',
    ],
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    }
}
