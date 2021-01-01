const path = require('path')
module.exports = {
  useBabel: true,
  useCache: true,
  cacheDirectory: 'out/typescript-awcache',
  babelCore: '@babel/core',
  babelOptions: require('../babel.config'),
  configFileName: path.resolve(__dirname, './tsconfig.json'),
}
module.exports.babelOptions.presets.push('@babel/preset-typescript')
