const path = require('path')

function resolveTsConfigPathsToAlias(tsconfigPath) {
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

function applyTsAliases(config, tsconfigPath) {
  config.resolve.alias = {
    ...config.resolve.alias,
    ...resolveTsConfigPathsToAlias(tsconfigPath),
  }
}

module.exports = applyTsAliases
