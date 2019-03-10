module.exports = w => ({
    files: [
        'src/**/*.ts',
        '!src/**/*spec.ts',
        '!src/**/*test.ts'
    ],

    tests: [
        'src/**/*spec.ts',
        'src/**/*test.ts'
    ],

    env: {
        type: 'node'
    }
});
