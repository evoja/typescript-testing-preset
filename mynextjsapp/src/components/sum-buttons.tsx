import {memo} from 'react'
import SumButton from '@evoja/typescript-testing-preset--lib/blocks/SumButton'

function SumButtons() {
  return (
    <div>
      <SumButton a={10} b={20}/>
      <SumButton a={100} b={200} red/>
    </div>
  )
}

const Pure = memo(SumButtons)
export {
  Pure as SumButtons
}
