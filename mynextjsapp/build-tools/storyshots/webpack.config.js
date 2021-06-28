const transform = require('../storybook-lib/webpack-storybook-lib')

module.exports = ({config}) => {
  config = transform({config})
  return config
}
