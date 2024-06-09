module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^fs$': '<rootDir>/__mocks__/fs.js',
    '^readline$': '<rootDir>/__mocks__/readline.js',
    '^winston$': '<rootDir>/__mocks__/winston.js',
  },
};
