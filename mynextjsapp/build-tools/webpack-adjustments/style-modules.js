const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function applyToARule(pred, rules, fn) {
  rules.forEach(rule => {
    if (rule.oneOf) {
      applyToARule(pred, rule.oneOf, fn)
    } else if (pred(rule)) {
      fn(rule, rules)
    }
  })
}

function isCssRule(rule) {
  return rule.test.source == '\\.css$'
}

function isScssRule(rule) {
  return rule.test.source == '\\.scss$'
}


function adjustCssModules(config, srcDir) {

  let cssRule;

  applyToARule(isCssRule, config.module.rules, rule => {
    rule.exclude = /\.m\.css$/
    cssRule = rule
  })
  applyToARule(isScssRule, config.module.rules, rule => {
    rule.exclude = /\.m\.scss$/
  })

  const moduleCssRule = {
    test: /\.m\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            mode: 'local',
            localIdentContext: srcDir,
          },
        },
      },
    ],
  }

  const moduleScssRule = {
    ...moduleCssRule,
    test: /\.m\.scss$/,
    use: [...moduleCssRule.use, 'sass-loader'],
  }

  config.module.rules.push(moduleCssRule)
  config.module.rules.push(moduleScssRule)

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      chunkFilename: "[name].[fullhash].css"
    }),
  )
}

module.exports = adjustCssModules
