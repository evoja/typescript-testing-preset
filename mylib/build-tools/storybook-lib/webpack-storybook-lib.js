const path = require('path')

const addScss = require('./adjustments/scss')
const supportStyleModules = require('./adjustments/style-modules')
const adjustStyleModuleNames = require('./adjustments/style-module-names')

module.exports = ({config}) => {
  addScss(config)
  supportStyleModules(config, path.resolve(__dirname, '../../src'))
  adjustStyleModuleNames(config, 'evjttp')
  return config
}
