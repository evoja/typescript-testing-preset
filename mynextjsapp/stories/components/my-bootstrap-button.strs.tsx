import type {Story} from '@storybook/react/types-6-0'
import {MyBootstrapButton} from 'mynextjsapp@/components/my-bootstrap-button'

export default {
  title: 'Components / MyBootstrapButton',
  component: MyBootstrapButton,
}
type TemplateProps = {
}
const Template: Story<TemplateProps> = props => {
  return <MyBootstrapButton>hello</MyBootstrapButton>
}

export const account = (() => {
  const story_case = Template.bind({})
  story_case.storyName = 'MyBootstrapButton'
  return story_case
})()
