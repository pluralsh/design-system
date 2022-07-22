import { Flex, H3 } from 'honorable'

import Icon from '../components/Icon'

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    icon: {
      options: ['/logos/plural-logomark-only-black.svg', '/logos/plural-logomark-only-white.svg', '/logos/airflow-logo.svg', '/logos/airbyte-logo.svg'],
      control: {
        type: 'select',
        labels: {
          '/logos/plural-logomark-only-black.svg': 'Plural Black',
          '/logos/plural-logomark-only-white.svg': 'Plural White',
          '/logos/airflow-logo.svg': 'Airflow',
          '/logos/airbyte-logo.svg': 'Airbyte',
        },
      },
    },
    hue: {
      options: ['default', 'lighter', 'lightest'],
      control: {
        type: 'select',
      },
    },
  },
}

function Template(args: any) {
  return (
    <Flex
      gap={16}
      direction="column"
    >
      <H3>Extra Large</H3>
      <Flex
        direction="row"
        gap={16}
      >
        <Icon
          size="xlarge"
          url={args.icon}
          {...args}
        />

        <Icon
          size="xlarge"
          url="photo.png"
          spacing="none"
          {...args}
        />

        <Icon
          size="xlarge"
          url="user.png"
          spacing="none"
          {...args}
        />
      </Flex>

      <H3>Large</H3>
      <Flex
        direction="row"
        gap={16}
      >
        <Icon
          size="large"
          url={args.icon}
          {...args}
        />

        <Icon
          size="large"
          url="photo.png"
          spacing="none"
          {...args}
        />

        <Icon
          size="large"
          url="user.png"
          spacing="none"
          {...args}
        />
      </Flex>

      <H3>Medium</H3>
      <Flex
        direction="row"
        gap={16}
      >
        <Icon
          url={args.icon}
          {...args}
        />

        <Icon
          url="photo.png"
          spacing="none"
          {...args}
        />

        <Icon
          url="user.png"
          spacing="none"
          {...args}
        />
      </Flex>

      <H3>Small</H3>
      <Flex
        direction="row"
        gap={16}
      >
        <Icon
          size="small"
          url={args.icon}
          {...args}
        />

        <Icon
          size="small"
          url="photo.png"
          spacing="none"
          {...args}
        />

        <Icon
          size="small"
          url="user.png"
          spacing="none"
          {...args}
        />
      </Flex>

      <H3>Extra Small</H3>
      <Flex
        direction="row"
        gap={16}
      >
        <Icon
          size="xsmall"
          url={args.icon}
          {...args}
        />

        <Icon
          size="xsmall"
          url="photo.png"
          spacing="none"
          {...args}
        />

        <Icon
          size="xsmall"
          url="user.png"
          spacing="none"
          {...args}
        />
      </Flex>
    </Flex>
  )
}

export const Default = Template.bind({})
Default.args = {
  icon: '/logos/plural-logomark-only-black.svg',
  hue: 'default',
  clickable: false,
}
