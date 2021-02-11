module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['node_modules/', 'build/'],
    rootDir: 'src',
    moduleDirectories: ['node_modules', 'src']

};