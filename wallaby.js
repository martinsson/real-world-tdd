module.exports = w => ({
    files: [
        'src/**/*.ts',
        '!src/**/*[sS]pec.ts',
        '!src/**/*[tT]est.ts'
    ],

    tests: [
        'src/**/*[sS]pec.ts',
        'src/**/*[tT]est.ts'
    ],

    env: {
        type: 'node'
    }
});
