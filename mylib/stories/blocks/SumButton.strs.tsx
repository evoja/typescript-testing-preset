import { storiesOf } from '@storybook/react'
import SumButton from '@evoja/typescript-testing-preset--lib/blocks/SumButton'

storiesOf("Blocks/SumButton", module).add("with text", () => {
  return (
    <div>
      <div><SumButton a={1000} b={1} /></div>
      <div><SumButton a={1} b ={1} red={true}/></div>
    </div>
  )
})
