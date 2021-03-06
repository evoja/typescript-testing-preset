import type {Story} from '@storybook/react/types-6-0'
import {ImagesTable} from 'mynextjsapp@/components/images-table'

export default {
  title: 'Components / ImagesTable (m)',
  component: ImagesTable,
}
type TemplateProps = {
}
const Template: Story<TemplateProps> = props => {
  return <ImagesTable/>
}

export const account = (() => {
  const story_case = Template.bind({})
  story_case.storyName = 'ImagesTable (m)'
  return story_case
})()
