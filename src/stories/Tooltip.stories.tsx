import { Button, Flex } from 'honorable'

import Tooltip from '../components/Tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
}

function Template(args: any) {
  return (
    <Flex
      width="100%"
      height={500}
      alignItems="center"
      justifyContent="center"
    >
      <Tooltip
        label="Here's some info for you!"
        {...args}
      >
        <Button>Hover me</Button>
      </Tooltip>
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {}
