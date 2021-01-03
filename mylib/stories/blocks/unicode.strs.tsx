import { storiesOf } from '@storybook/react'

storiesOf("Unicode", module).add("with text", () => {
  return (
    <div>
      <p>Привет, ромашки.</p>
      <p>😀 😎 👍 💯</p>
      <p>你好雏菊</p>
    </div>
  )
})
