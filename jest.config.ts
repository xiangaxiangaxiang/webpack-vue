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
    },
    moduleFileExtensions: [
        'js',
        'ts',
        'jsx',
        'tsx',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '\\.[jt]sx?$': 'babel-jest'
    }
}
