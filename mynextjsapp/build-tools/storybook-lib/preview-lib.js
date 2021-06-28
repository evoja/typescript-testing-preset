import 'mynextjsapp@/pages/_app'  // import styles from _app.js

import * as nextImage from 'next/image'
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => typeof props.src === 'string'
    ? <img {...props}/>
    : <img {...props} {...props.src} />,
})
