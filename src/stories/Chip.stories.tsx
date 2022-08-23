import { Flex, H1 } from 'honorable'

import { StatusOkIcon } from '..'

import Chip from '../components/Chip'
import Card from '../components/Card'

export default {
  title: 'Chip',
  component: Chip,
  argTypes: {
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
    <>
      <H1
        subtitle2
        marginBottom="small"
      >Small
      </H1>
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          severity="neutral"
          size="small"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          marginLeft="medium"
          severity="info"
          size="small"
          {...args}
        >
          Info
        </Chip>
        <Chip
          marginLeft="medium"
          severity="success"
          size="small"
          {...args}
        >
          Success
        </Chip>
        <Chip
          marginLeft="medium"
          severity="warning"
          size="small"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          marginLeft="medium"
          severity="error"
          size="small"
          {...args}
        >
          Error
        </Chip>
        <Chip
          marginLeft="medium"
          severity="critical"
          size="small"
          {...args}
        >
          Critical
        </Chip>
      </Flex>
      {/* Small with loading spinner */}
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          loading
          severity="neutral"
          size="small"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="info"
          size="small"
          {...args}
        >
          Info
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="success"
          size="small"
          {...args}
        >
          Success
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="warning"
          size="small"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="error"
          size="small"
          {...args}
        >
          Error
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="critical"
          size="small"
          {...args}
        >
          Critical
        </Chip>
      </Flex>
      {/* Small with icon */}
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          icon={<StatusOkIcon />}
          severity="neutral"
          size="small"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="info"
          size="small"
          {...args}
        >
          Info
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="success"
          size="small"
          {...args}
        >
          Success
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="warning"
          size="small"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="error"
          size="small"
          {...args}
        >
          Error
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="critical"
          size="small"
          {...args}
        >
          Critical
        </Chip>
      </Flex>

      <H1
        subtitle2
        marginBottom="small"
      >Medium
      </H1>
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          severity="neutral"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          marginLeft="medium"
          severity="info"
          {...args}
        >
          Info
        </Chip>
        <Chip
          marginLeft="medium"
          severity="success"
          {...args}
        >
          Success
        </Chip>
        <Chip
          marginLeft="medium"
          severity="warning"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          marginLeft="medium"
          severity="error"
          {...args}
        >
          Error
        </Chip>
        <Chip
          marginLeft="medium"
          severity="critical"
          {...args}
        >
          Critical
        </Chip>
      </Flex>
      {/* Medium with loading spinner */}
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          loading
          severity="neutral"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="info"
          {...args}
        >
          Info
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="success"
          {...args}
        >
          Success
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="warning"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="error"
          {...args}
        >
          Error
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="critical"
          {...args}
        >
          Critical
        </Chip>
      </Flex>
      {/* Medium with icon */}
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          icon={<StatusOkIcon />}
          severity="neutral"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="info"
          {...args}
        >
          Info
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="success"
          {...args}
        >
          Success
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="warning"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="error"
          {...args}
        >
          Error
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="critical"
          {...args}
        >
          Critical
        </Chip>
      </Flex>

      <H1
        subtitle2
        marginBottom="small"
      >Large
      </H1>
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          severity="neutral"
          size="large"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          marginLeft="medium"
          severity="info"
          size="large"
          {...args}
        >
          Info
        </Chip>
        <Chip
          marginLeft="medium"
          severity="success"
          size="large"
          {...args}
        >
          Success
        </Chip>
        <Chip
          marginLeft="medium"
          severity="warning"
          size="large"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          marginLeft="medium"
          severity="error"
          size="large"
          {...args}
        >
          Error
        </Chip>
        <Chip
          marginLeft="medium"
          severity="critical"
          size="large"
          {...args}
        >
          Critical
        </Chip>
      </Flex>
      {/* Large with loading spinner */}
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          loading
          severity="neutral"
          size="large"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="info"
          size="large"
          {...args}
        >
          Info
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="success"
          size="large"
          {...args}
        >
          Success
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="warning"
          size="large"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="error"
          size="large"
          {...args}
        >
          Error
        </Chip>
        <Chip
          loading
          marginLeft="medium"
          severity="critical"
          size="large"
          {...args}
        >
          Critical
        </Chip>
      </Flex>
      {/* Large with icon */}
      <Flex
        align="center"
        marginBottom="xlarge"
      >
        <Chip
          icon={<StatusOkIcon />}
          severity="neutral"
          size="large"
          {...args}
        >
          Neutral
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="info"
          size="large"
          {...args}
        >
          Info
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="success"
          size="large"
          {...args}
        >
          Success
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="warning"
          size="large"
          {...args}
        >
          Warning
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="error"
          size="large"
          {...args}
        >
          Error
        </Chip>
        <Chip
          icon={<StatusOkIcon />}
          marginLeft="medium"
          severity="critical"
          size="large"
          {...args}
        >
          Critical
        </Chip>
      </Flex>
      {/* Wrapping */}
      <H1
        subtitle2
        marginBottom="small"
      >Wrapping
      </H1>
      <Card
        align="center"
        padding="medium"
        width="140px"
        gap="4px"
        wrap="wrap"
      >
        <Chip
          severity="neutral"
          size="small"
          {...args}
        >
          Physical
        </Chip>
        <Chip
          severity="warning"
          size="small"
          marginTop="4px"
          {...args}
        >
          Local
        </Chip>
        <Chip
          severity="error"
          size="small"
          marginTop="4px"
          {...args}
        >
          Adjacent Network
        </Chip>
        <Chip
          severity="critical"
          size="small"
          marginTop="4px"
          {...args}
        >
          Network
        </Chip>
      </Card>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  hue: 'default',
  closeButton: false,
  clickable: false,
}
