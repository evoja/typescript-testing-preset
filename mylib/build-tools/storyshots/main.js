module.exports = {
  ...require('../storybook-lib/main-lib'),
  stories: ['../../out/compiled/stories/**/*.strs.@(js|jsx|ts|tsx|mdx)'],
}
