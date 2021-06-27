const path = require('path')

const addScss = require('../webpack-adjustments/scss')
const supportStyleModules = require('../webpack-adjustments/style-modules')
const adjustStyleModuleNames = require('../webpack-adjustments/style-module-names')

module.exports = ({config}) => {
  addScss(config)
  supportStyleModules(config, path.resolve(__dirname, '../../src'))
  adjustStyleModuleNames(config, 'evjttp')
  return config
}
