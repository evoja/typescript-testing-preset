import {createElement as h} from 'react'
import type {AppProps} from 'next/app'
import 'normalize.css'

import '@evoja/typescript-testing-preset--lib/styles.css'

import 'mynextjsapp@/sass/global.css'
import 'mynextjsapp@/sass/my-bootstrap.scss'

function EvjApp({ Component, pageProps }: AppProps) {
  return h(Component, {...pageProps})
}

export default EvjApp
