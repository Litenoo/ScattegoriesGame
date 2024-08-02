module.exports = {
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest'
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    rootDir: 'src',
    testMatch: ['**/*.test.ts'],
  };
  