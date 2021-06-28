const {tst_dir} = require('./jest-dirs')
const config = require('./jest.config.lib')
config.collectCoverage=false
config.testMatch = [
  `${tst_dir}/**/*.shots.[jt]s?(x)`,
]
module.exports = config
