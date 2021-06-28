const {out_dir, src_dir, tst_dir, jest_dir, root_dir} = require('./jest-dirs')
module.exports = {
  coverageDirectory: `${out_dir}/coverage`,
  collectCoverage: true,
  collectCoverageFrom : [
    `${src_dir}/**/*.{js,jsx,ts,tsx}`,
    '!**/*.d.ts',
  ],
  preset: 'ts-jest',
  rootDir: root_dir,
  testMatch: [
    `${tst_dir}/**/*.test.[jt]s?(x)`,
    // "../test/**/?(*-)+(spec|test).[jt]s?(x)"
  ],
  // testRegex: '(/__test__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  // testURL: 'http://localhost:8080',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^mynextjsapp@/(.*\\.[tj]sx?)$': `${src_dir}/$1`,
    '^mynextjsapp@(.*/[^.]+)$': `${src_dir}$1`,
    '\\.(scss|css|less)$': `${jest_dir}/jest.mock.blank.js`,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)(\\?\\w*?)?$':
      `${jest_dir}/jest.mock.blank.js`,
  },
  globals: {
    'React': require('react'),
  },
  transform: {
    '.(js|jsx|ts|tsx)': ['babel-jest', { configFile: `${jest_dir}/jest-babel.js` }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@evoja/)'],
}
