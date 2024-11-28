import { Flex } from 'honorable'

import CatalogCard from '../components/CatalogCard'

export default {
  title: 'CatalogCard',
  component: CatalogCard,
}

function Template(args: any) {
  return (
    <Flex
      gap="small"
      wrap="wrap"
    >
      <CatalogCard {...args} />
      <CatalogCard
        {...{
          ...args,
          ...{ imageUrl: '/logos/plural-logomark-only-black.svg' },
        }}
      />
      <CatalogCard {...{ ...args, ...{ tags: null } }} />
      <CatalogCard
        {...{
          ...args,
          ...{ description: null, tags: ['tag1', 'tag2'] },
        }}
      />
      <CatalogCard {...args} />
      <CatalogCard {...args} />
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {
  name: 'Base catalog',
  author: 'Plural',
  category: 'Messaging',
  description:
    'The new open-source standard to sync data from applications, APIs & databases. One click deploys for data scientists and developers.',

  width: '500px',
  trending: true,
  featuredLabel: '',

  tags: [
    'Devops',
    'Deployment',
    'Fun',
    'Turkey',
    'Chickens',
    'Handball',
    'Cricket',
    'Support',
  ],
}
