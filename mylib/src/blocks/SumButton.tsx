import {sum} from '@evoja/typescript-testing-preset--lib/tools/sum'
import cls from './SumButton.m.css'

type SumButtonProps = {
  a: number
  b: number
  red?: boolean
}

export default function SumButton(props: SumButtonProps) {
  const {a, b, red} = props
  return (
    <button className={red ? cls['red'] : ''}>
      {`sum(${a}, ${b}) -> ${sum(a,b)}`}
    </button>
  )
}
