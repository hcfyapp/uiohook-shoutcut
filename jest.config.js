const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  verbose: false,
  resetMocks: true,
  restoreMocks: true,
}

if (process.env.GITHUB_ACTIONS) {
  config.cacheDirectory = '.jest-cache'
}

module.exports = config
