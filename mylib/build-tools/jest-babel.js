const babel_conf = require('./babel.config')
babel_conf.presets[0][1].targets = {node: 'current'}
module.exports = require('babel-jest').createTransformer(babel_conf)
