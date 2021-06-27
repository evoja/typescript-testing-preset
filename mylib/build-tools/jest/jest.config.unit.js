const config = require('./jest.config.lib')
const {compiled_dir} = require('./jest-dirs')
config.testMatch = [
  `${compiled_dir}/test/**/*.test.[jt]s?(x)`,
]
module.exports = config
