const transform = require('../storybook-lib/webpack-storybook-lib')

module.exports = ({config}) => {
  config = transform({config})

  // config.resolve.extensions.push('.ts', '.tsx')

  return config
}
