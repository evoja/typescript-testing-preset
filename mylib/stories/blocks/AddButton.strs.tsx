import { storiesOf } from '@storybook/react'
import AddButton from '@evoja/typescript-testing-preset--lib/blocks/AddButton'

storiesOf("Blocks/AddButton", module).add("with text", () => {
  return (
    <div>
      <div><AddButton a={1000} b={1} /></div>
      <div><AddButton a={1} b ={1} red={true}/></div>
    </div>
  )
})
