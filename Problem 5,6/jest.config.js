module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};