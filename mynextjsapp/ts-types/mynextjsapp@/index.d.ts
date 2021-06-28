declare module 'bootstrap-icons/icons/*.svg' {
  const src:string
  export default src
}

declare module 'bootstrap-icons/icons/*.svg?data' {
  const src:string
  export default src
}

declare module 'bootstrap-icons/icons/*.svg?next' {
  const src:StaticImageData
  export default src
}

declare module 'bootstrap-icons/icons/*.svg?icon' {
  import type {ExoticComponent, SVGProps} from 'react'
  const ReactComponent:ExoticComponent<SVGProps<SVGSVGElement> & {title?:string}>
  export default ReactComponent
}



declare module '*.m.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.m.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
