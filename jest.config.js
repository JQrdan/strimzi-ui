/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
const { jestModuleMapper } = require('./utils/aliasHelper.js');

const config = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/e2e/',
    '/utils/',
    '/coverage/',
  ],
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.config.*'],
  coverageReporters: ['json', 'text', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleDirectories: ['node_modules', 'client'],
  moduleFileExtensions: ['js', 'feature', 'ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts', '**/*.steps.ts'],
  testPathIgnorePatterns: ['/e2e/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: './utils/test/test.babel.js' },
    ],
  },
  moduleNameMapper: {
    ...jestModuleMapper,
  },
  setupFiles: ['<rootDir>/utils/test/support'],
};

module.exports = config;
