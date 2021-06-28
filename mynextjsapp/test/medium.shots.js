import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

initStoryshots({
  configPath: 'build-tools/storybook',
  suite: 'Puppeteer medium storyshots',
  storyNameRegex: / \(m\)$/,
  test: imageSnapshot({
    storybookUrl: 'http://localhost:8080',
    customizePage: page => {
      page.setViewport({width: 500, height: 500, deviceScaleFactor: .5})
      page.screenshot({
        captureBeyondViewport: true,
        // fullPage: true,
      })
      page.captureBeyondViewport
    }
  }),
})
