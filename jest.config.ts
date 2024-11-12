module.exports = {
    preset: 'ts-jest',  // Tells Jest to use ts-jest to handle TypeScript files
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Transpile TypeScript files
    },
    moduleFileExtensions: ['ts', 'js'],  // Supports TypeScript and JavaScript files
    testMatch: ['**/?(*.)+(spec|test).ts'],  // Matches test files with .ts extension
  };