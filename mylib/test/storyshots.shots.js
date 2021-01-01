import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

initStoryshots({
  configPath: 'build-tools/storyshots',
  suite: 'Puppeteer storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:8080',
  }),
})
