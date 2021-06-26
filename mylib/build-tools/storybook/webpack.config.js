const path = require('path')
const transform = require('../storybook-lib/webpack-storybook-lib')

module.exports = ({config}) => {
  config = transform({config})

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.alias = {
    ...config.resolve.alias,
    ...resolve_tsconfig_paths_to_alias(),
  }

  return config
}

function resolve_tsconfig_paths_to_alias() {
  const tsconfigPath = './tsconfig.json'
  const webpackConfigBasePath = __dirname
  const { paths, baseUrl } = require(tsconfigPath).compilerOptions;
  const aliases = {};
  Object.keys(paths).forEach((item) => {
      const key = item.replace('/*', '');
      const value = path.resolve(webpackConfigBasePath, baseUrl, paths[item][0].replace('/*', '').replace('*', ''));
      aliases[key] = value;
  });
  return aliases;
}
