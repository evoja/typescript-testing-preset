const config = require('./jest.config.lib')
const {tst_dir} = require('./jest-dirs')
config.testMatch = [
  `${tst_dir}/**/*.test.[jt]s?(x)`,
]
module.exports = config
