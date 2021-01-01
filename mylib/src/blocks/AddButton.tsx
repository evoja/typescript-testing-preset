import {add} from '@evoja/typescript-testing-preset--lib/tools/add'
import cls from './AddButton.m.css'

type AddButtonProps = {
  a: number
  b: number
  red?: boolean
}

export default function AddButton(props: AddButtonProps) {
  const {a, b, red} = props
  return (
    <button className={red ? cls['red'] : ''}>
      {`add(${a}, ${b}) -> ${add(a,b)}`}
    </button>
  )
}
