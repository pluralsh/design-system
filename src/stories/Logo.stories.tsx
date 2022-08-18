import { Flex } from 'honorable'

import Logo, { LogoProps, LogoType } from '../components/Logo'

export default {
  title: 'Logo',
  component: Logo,
  argTypes: {
    type: {
      options: Object.values(LogoType),
      control: {
        type: 'select',
      },
    },
  },
}

function Template(args: LogoProps) {
  return (
    <Flex
      grow={1}
      justify="center"
    >
      <Logo {...args} />
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {
  isDark: false,
  scale: 1,
  type: LogoType.Full,
}
