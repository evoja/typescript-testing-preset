const path = require('path')

function applyToARule(pred, rules, fn) {
  rules.forEach(rule => {
    if (rule.oneOf) {
      applyToARule(pred, rule.oneOf, fn)
    } else if (pred(rule)) {
      fn(rule, rules)
    }
  })
}

function isSvgRule(rule) {
  return rule.test.source.toLowerCase().indexOf('svg') >= 0
}

function isNextImageLoader(rule) {
  return rule.loader && rule.loader === 'next-image-loader'
}

// same test as they have but without SVG
const nextImageTest = /\.(png|jpg|jpeg|gif|webp|ico|bmp)$/i

function adjustSvgLoaders2Next(config) {
  const svgRule = {
    oneOf: [
      {
        test: () => {
          // their rule is not available on config stage,
          // that's why I modify it at runtime
          applyToARule(isNextImageLoader, config.module.rules, rule => {
            rule.test = nextImageTest
          })
          return false
        },
      },
      {
        test: /\.svg$/,
        resourceQuery: /^\?data$/, // foo.svg?data
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        resourceQuery: /^\?icon$/, // foo.svg?icon
        loader: '@svgr/webpack',
        options: {
          titleProp: true,
          icon: true,
          memo: true,
        }
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[hash].[ext]',
          outputPath: '../public/out',
          publicPath: '/out',
        },
      },
    ],
  }
  config.module.rules.push(svgRule)

}



function adjustSvgLoaders2Storybook(config) {

  let assetRule
  let assetTest
  applyToARule(isSvgRule, config.module.rules, (r, p) => {
    assetTest = new RegExp(r.test.source.replace(/svg\|/g, ''))
    r.test = new RegExp(assetTest.source.replace(/png\|/g, ''))
    assetRule = r
  })
  const svgRule = {
    oneOf: [
      {
        test: /\.svg$/,
        resourceQuery: /^\?data$/, // foo.svg?data
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        resourceQuery: /^\?icon$/, // foo.svg?icon
        loader: '@svgr/webpack',
        options: {
          titleProp: true,
          icon: true,
          memo: true,
        }
      },
      {
        ...assetRule,
        test: /\.svg$/,
      },
      {
        test: assetTest,
        issuer: /\.(t|j)sx?$/,
        use: [
          path.resolve(__dirname, 'next-like-loader.js'),
          'file-loader',
        ],
      },
      {
        ...assetRule,
        test: /\.png$/,
        issuer: /(?<!\.(t|j)sx?)$/,
      },
    ],
  }
  config.module.rules.push(svgRule)
}


module.exports = {
  adjustSvgLoaders2Next,
  adjustSvgLoaders2Storybook,
}
