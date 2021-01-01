const path = require('path')
const transform = require('../storybook-lib/webpack-storybook-lib')

module.exports = ({config}) => {
  config = transform({config})

  config.resolve.alias = {
    ...config.resolve.alias,
    '@evoja/typescript-testing-preset--lib': path.resolve(__dirname, '../../out/compiled/src'),
  }

  return config
}
