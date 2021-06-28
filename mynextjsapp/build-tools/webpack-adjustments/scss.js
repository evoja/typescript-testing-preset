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

function addScss(config) {
  let cssRule;
  applyToARule(isCssRule, config.module.rules, rule => {
    cssRule = rule
  })

  const sassRule = {
    ...cssRule,
    test: /\.scss$/,
    use: [...cssRule.use, 'sass-loader']
  }

  config.module.rules.push(sassRule)

}


module.exports = addScss
