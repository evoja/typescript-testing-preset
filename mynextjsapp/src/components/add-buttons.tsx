import {memo} from 'react'
import AddButton from '@evoja/typescript-testing-preset--lib/blocks/AddButton'

function AddButtons() {
  return (
    <div>
      <AddButton a={10} b={20}/>
      <AddButton a={100} b={200} red/>
    </div>
  )
}

const Pure = memo(AddButtons)
export {
  Pure as AddButtons
}
