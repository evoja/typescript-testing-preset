import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

initStoryshots({
  configPath: 'build-tools/storyshots',
  suite: 'Puppeteer storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:8080',
    customizePage: page => {
      page.setViewport({width: 300, height: 200, deviceScaleFactor: .5})
      page.screenshot({
        captureBeyondViewport: true,
      })
      page.captureBeyondViewport
    }
  }),
})
