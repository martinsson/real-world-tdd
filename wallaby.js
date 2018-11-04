module.exports = w => ({
    files: [
        'src/**/*.ts'
    ],

    tests: [
        'test/**/*Spec.ts'
    ],

    env: {
        type: 'node'
    }
});