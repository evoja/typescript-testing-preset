const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const loaderUtils = require('loader-utils') // a dependency of webpack
const x = require('css-loader')
module.exports = ({config}) => {
  config.module.rules[3] = {
    test: /\.m\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            mode: 'local',
            localIdentName: 'evoja-tstest-lib-[path][name]__[local]', //'[hash:base64:5]__[name]__[local]',
            getLocalIdent: getLocalIdent,
            localIdentContext: path.resolve(__dirname, '../../src'),
            // localIdentHashPrefix: 'evoja-tstest-lib-hash',
          },
        },
      },
    ],
  }

  config.module.rules.push({
    test: /\.css$/,
    exclude: /\.m\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.scss$/,
    exclude: /\.m\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'sass-loader',
    ],
  })

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css"
    }),
  )

  return config
}


function builtInGetLocalIdent(loaderContext, localIdentName, localName, options) {
  if(!options.context) {
    options.context = loaderContext.options && typeof loaderContext.options.context === "string" ? loaderContext.options.context : loaderContext.context
  }
  var request = path.relative(options.context, loaderContext.resourcePath)
  options.content = options.hashPrefix + request + "+" + localName
  localIdentName = localIdentName.replace(/\[local\]/gi, localName)
  var hash = loaderUtils.interpolateName(loaderContext, localIdentName, options)
  var hash_rep = hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1")
  return hash_rep
}

function getLocalIdent(loaderContext, localIdentName, localName, options) {
  const resourcePath = dedupe_deext_last_path_segment(loaderContext.resourcePath)
  return builtInGetLocalIdent({...loaderContext, resourcePath}, localIdentName, localName, options)
}

function dedupe_deext_last_path_segment(path) {
  const path_segments = path.split('/')
  const name = path_segments.pop().split('.')[0]
  if (name !== path_segments[path_segments.length - 1]) {
    path_segments.push(name)
  }
  return path_segments.join('/')
}
