
function applyToARule(pred, rules, fn) {
  rules.forEach(rule => {
    if (rule.oneOf) {
      applyToARule(pred, rule.oneOf, fn)
    } else if (pred(rule)) {
      fn(rule, rules)
    }
  })
}


function replaceCssTest(test) {
  if (Array.isArray(test)) {
    return test.map(replaceCssTest)
  }
  const tst = test.toString()
  if (tst == /\.module\.css$/.toString()) {
    return /\.m\.css$/
  } else if (tst == /\.module\.(scss|sass)$/.toString()) {
    return/\.m\.(scss|sass)$/
  } else if (tst == /(?<!\.module)\.css$/.toString()) {
    return /(?<!\.m)\.css$/
  } else if (tst == /(?<!\.module)\.(scss|sass)$/.toString()) {
    return /(?<!\.m)\.(scss|sass)$/
  }
  return test
}

function replaceTestOfCssRule(rule) {
  const {test, issuer} = rule
  if (test) {
    rule.test = replaceCssTest(test)
  } else if (issuer) {
    rule.issuer = replaceCssTest(issuer)
  }
}


function fixNextjStyleModules(config) {
  applyToARule(() => true, config.module.rules, replaceTestOfCssRule)
}

module.exports = fixNextjStyleModules
