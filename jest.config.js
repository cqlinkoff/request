module.exports = {
  'collectCoverage': true,
  'collectCoverageFrom': [
    'src/**/*.js'
  ],
  'transform': {
    '^.+\\.js$': 'babel-jest'
  },
  'transformIgnorePatterns': [],
  'testRegex': '/test/.+\\.spec\\.js$',
  'moduleDirectories': [
    '<rootDir>',
    'node_modules'
  ],
  'globals': {
    'NODE_ENV': 'test'
  },
  'setupFiles': [
    './test/setup.js'
  ]
}
