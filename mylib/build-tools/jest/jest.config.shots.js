const {src_dir, compiled_dir} = require('./jest-dirs')
const config = require('./jest.config.lib')
config.collectCoverage=false
config.testMatch = [
  `${compiled_dir}/test/**/*.shots.[jt]s?(x)`,
]
module.exports = config
