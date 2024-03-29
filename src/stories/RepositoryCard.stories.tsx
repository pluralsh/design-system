import { Div, Flex, H4 } from 'honorable'

import RepositoryCard from '../components/RepositoryCard'

export default {
  title: 'RepositoryCard',
  component: RepositoryCard,
}

function Template(args: any) {
  return (
    <Flex
      gap={16}
      direction="column"
      maxWidth={697}
    >
      <Div marginBottom="large">
        <H4
          subtitle
          marginBottom="small"
        >
          Default
        </H4>{' '}
        <RepositoryCard {...args} />
      </Div>
      <Div marginBottom="large">
        <H4
          subtitle
          marginBottom="small"
        >
          Marketing
        </H4>
        <RepositoryCard
          variant="marketing"
          {...args}
        />
      </Div>
      <Div marginBottom="large">
        <H4
          subtitle
          marginBottom="small"
        >
          Medium
        </H4>
        <RepositoryCard
          size="medium"
          mt={1}
          {...args}
        />
      </Div>
      <Div marginBottom="large">
        <h4>Large</h4>
        <RepositoryCard
          size="large"
          mt={1}
          {...args}
        />
      </Div>
    </Flex>
  )
}

function ListTemplate(args: any) {
  return (
    <Flex
      gap="small"
      wrap="wrap"
    >
      <RepositoryCard {...args} />
      <RepositoryCard
        {...{
          ...args,
          ...{
            description:
              'The new open-source standard to sync data from applications, APIs & databases. One click deploys for data scientists and developers.',
          },
        }}
      />
      <RepositoryCard
        {...{
          ...args,
          ...{
            description:
              'The new open-source standard to sync data from applications, APIs & databases. One click deploys for data scientists and developers.',
            tags: null,
          },
        }}
      />
      <RepositoryCard
        {...{
          ...args,
          ...{
            priv: true,
            description: null,
            tags: ['tag1', 'tag2'],
          },
        }}
      />
      <RepositoryCard
        {...args}
        releaseStatus="BETA"
      />
      <RepositoryCard
        {...args}
        releaseStatus="ALPHA"
      />
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {
  installed: true,
  title: 'Plural',
  priv: true,
  verified: true,
  trending: true,
  publisher: 'Plural',
  featuredLabel: '',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  imageUrl: '/logos/plural-logomark-only-black.svg',
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

export const List = ListTemplate.bind({})
List.args = { width: '500px', ...Default.args }
