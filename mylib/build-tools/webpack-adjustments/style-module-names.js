const path = require('path')
const loaderUtils = require('loader-utils') // a dependency of webpack


function applyToARule(pred, rules, fn) {
  rules.forEach(rule => {
    if (rule.oneOf) {
      applyToARule(pred, rule.oneOf, fn)
    } else if (pred(rule)) {
      fn(rule, rules)
    }
  })
}

function isModuleRule(rule) {
  return rule.test.source.match(/^\\.m\\.s?css\$$/)
}

function builtInGetLocalIdent(loaderContext, localIdentName, localName, options) {
  if(!options.context) {
    options.context = loaderContext.options && typeof loaderContext.options.context === 'string' ? loaderContext.options.context : loaderContext.context
  }
  var request = path.relative(options.context, loaderContext.resourcePath)
  options.content = options.hashPrefix + request + '+' + localName
  localIdentName = localIdentName.replace(/\[local\]/gi, localName)
  var hash = loaderUtils.interpolateName(loaderContext, localIdentName, options)
  return hash.replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-').replace(/^((-?[0-9])|--)/, '_$1')
}

function getLocalIdent(loaderContext, localIdentName, localName, options) {
  const resourcePath = dedupeDeextLastPathSegment(loaderContext.resourcePath)
  return builtInGetLocalIdent({...loaderContext, resourcePath}, localIdentName, localName, options)
}

function dedupeDeextLastPathSegment(path) {
  const pathSegments = path.split('/')
  const name = pathSegments.pop().split('.')[0]
  if (name !== pathSegments[pathSegments.length - 1]) {
    pathSegments.push(name)
  }
  return pathSegments.join('/')
}


function adjustStyleModuleNames(config, projectPrefix) {

  applyToARule(isModuleRule, config.module.rules, rule => {
    rule.use[1].options.modules = {
      ...rule.use[1].options.modules,
      localIdentName: projectPrefix + '-[path][name]__[local]', //'[hash:base64:5]__[name]__[local]',
      getLocalIdent: getLocalIdent,
    }
  })

}

module.exports = adjustStyleModuleNames
