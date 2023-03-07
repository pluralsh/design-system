import { AppList, ContentCard } from '..'

export default {
  title: 'AppList',
  component: AppList,
  argTypes: {
  },
}

function Template({ ...args }: any) {
  return (
    <ContentCard
      width={600}
      height={600}
    >
      <AppList {...args} />
    </ContentCard>
  )
}

export const Default = Template.bind({})
Default.args = {
}
