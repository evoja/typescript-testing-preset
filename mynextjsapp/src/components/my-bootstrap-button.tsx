import {memo} from 'react'
import Button from 'react-bootstrap/Button'

type MyBootstrapButtonProps = {
  children: any
}

function MyBootstrapButton(props: MyBootstrapButtonProps) {
  const {children} = props
  return (
    <Button>{children}</Button>
  )
}

const Pure = memo(MyBootstrapButton)
export {
  Pure as MyBootstrapButton
}
