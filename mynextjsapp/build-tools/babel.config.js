module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {'ie': '11'},
        modules: 'commonjs',
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
}
