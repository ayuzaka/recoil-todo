module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['./src'],
  testPathIgnorePatterns: ['./node_modules/'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx)', '**/?(*.)+(test).+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
    NODE_ENV: 'test',
  },
}
