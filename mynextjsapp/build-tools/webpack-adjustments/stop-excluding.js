function applyToARule(pred, rules, fn) {
  rules.forEach(rule => {
    if (rule.oneOf) {
      applyToARule(pred, rule.oneOf, fn)
    } else if (pred(rule)) {
      fn(rule, rules)
    }
  })
}

function isSriptRule(rule) {
  return rule.test && rule.test.toString().toLowerCase().indexOf('tsx') >= 0
}

function dontExclude(resource, packageRegex) {
  return resource.match(packageRegex)
}

function stopExcluding(config, packageRegex) {

  applyToARule(isSriptRule, config.module.rules, rule => {
    const oldExcl = rule.exclude
    rule.exclude =
        typeof oldExcl === 'function' ? resource => !dontExclude(resource, packageRegex) && oldExcl(resource)
      : oldExcl ? resource => !dontExclude(resource, packageRegex) && resource.match(oldExcl)
      : resource => !dontExclude(resource, packageRegex)
  })
}

module.exports = stopExcluding
