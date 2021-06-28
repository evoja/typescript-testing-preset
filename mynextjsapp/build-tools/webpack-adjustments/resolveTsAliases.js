const path = require('path')

function resolveTsConfigPathsToAlias() {
  const tsconfigPath = '../storybook-lib/tsconfig.json'
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

function adjustConfigToResolveTsAliases(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    ...resolveTsConfigPathsToAlias(),
  }
}

module.exports = adjustConfigToResolveTsAliases
