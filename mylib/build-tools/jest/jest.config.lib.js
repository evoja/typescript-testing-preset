const {out_dir, compiled_dir, jest_dir, root_dir} = require('./jest-dirs')
module.exports = {
  coverageDirectory: `${out_dir}/coverage`,
  collectCoverage: true,
  collectCoverageFrom : [
    `${compiled_dir}/src/**/*.{js,jsx,ts,tsx}`,
    '!**/*.d.ts',
  ],
  rootDir: root_dir,
  testMatch: [
    `${compiled_dir}/test/**/*.test.[jt]s?(x)`,
    // "../test/**/?(*-)+(spec|test).[jt]s?(x)"
  ],
  // testRegex: '(/__test__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  // testURL: 'http://localhost:8080',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@evoja/typescript-testing-preset--lib/(.*\\.[tj]sx?)$': `${compiled_dir}/src/$1`,
    '^@evoja/typescript-testing-preset--lib(.*/[^.]+)$': `${compiled_dir}/src/$1`,
    '\\.(scss|css|less)$': `${jest_dir}/jest.mock.blank.js`,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      `${jest_dir}/jest.mock.blank.js`,
  },
  globals: {
    'React': require('react'),
  },
  transform: {
    '.(js|jsx)': ['babel-jest', { configFile: `${jest_dir}/jest-babel.js` }],
  },
}
