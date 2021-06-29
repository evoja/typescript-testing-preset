import type {Story} from '@storybook/react/types-6-0'
import {SumButtons} from 'mynextjsapp@/components/sum-buttons'

export default {
  title: 'Components / SumButtons (t)',
  component: SumButtons,
}
type TemplateProps = {
}
const Template: Story<TemplateProps> = props => {
  return <SumButtons/>
}

export const account = (() => {
  const story_case = Template.bind({})
  story_case.storyName = 'SumButtons (t)'
  return story_case
})()
