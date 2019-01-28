module.exports = w => ({
    files: [
        'src/**/*.ts',
        '!src/**/*Spec.ts'
    ],

    tests: [
        'src/**/*Spec.ts'
    ],

    env: {
        type: 'node'
    }
});
