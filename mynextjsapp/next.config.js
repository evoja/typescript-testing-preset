const path = require('path')
const applyTsAliases = require('./build-tools/webpack-adjustments/ts-aliases')
const fixNextjStyleModules = require('./build-tools/webpack-adjustments/nextjs-style-modules')
const {adjustSvgLoaders2Next} = require('./build-tools/webpack-adjustments/nextjs-svg')
const stopExcluding = require('./build-tools/webpack-adjustments/stop-excluding')

module.exports = {
  webpack(config, options) {
    applyTsAliases(config, path.resolve(__dirname, './tsconfig.json'))
    fixNextjStyleModules(config)
    adjustSvgLoaders2Next(config)
    stopExcluding(config, /@evoja/)
    return config
  },
  webpack5: true,
}
