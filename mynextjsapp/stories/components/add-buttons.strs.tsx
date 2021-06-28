import type {Story} from '@storybook/react/types-6-0'
import {AddButtons} from 'mynextjsapp@/components/add-buttons'

export default {
  title: 'Components / AddButtons',
  component: AddButtons,
}
type TemplateProps = {
}
const Template: Story<TemplateProps> = props => {
  return <AddButtons/>
}

export const account = (() => {
  const story_case = Template.bind({})
  story_case.storyName = 'AddButtons'
  return story_case
})()
