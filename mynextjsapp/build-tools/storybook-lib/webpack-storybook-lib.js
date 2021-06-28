const path = require('path')

const stopExcluding = require('../webpack-adjustments/stop-excluding')
const addScss = require('../webpack-adjustments/scss')
const supportStyleModules = require('../webpack-adjustments/style-modules')
const adjustStyleModuleNames = require('../webpack-adjustments/style-module-names')
const {adjustSvgLoaders2Storybook} = require('../webpack-adjustments/nextjs-svg')
const resolveTsAliases = require('../webpack-adjustments/resolveTsAliases')

module.exports = ({config}) => {
  stopExcluding(config, /@evoja/)
  addScss(config)
  supportStyleModules(config, path.resolve(__dirname, '../../src'))
  adjustStyleModuleNames(config, 'evj-mynextjsapp')
  adjustSvgLoaders2Storybook(config)
  resolveTsAliases(config)

  return config
}
