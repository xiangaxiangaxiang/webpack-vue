module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
    ],
    overrides: [
        {
            files: ['**/__tests__/**/*.js', '**/__tests__/**/*.ts'],
            env: {
                jest: true
            },
            rules: {
                'node/no-extraneous-require': 'off'
            }
        }
    ],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'parser': '@typescript-eslint/parser',
    },
    'plugins': [
        'vue',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        '@typescript-eslint/no-var-requires': 0,
        'vue/multi-word-component-names': [
            'error',
            {ignores: ['index']}
        ]
    }
}
