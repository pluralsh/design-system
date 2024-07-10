import styled from 'styled-components'

import { Accordion, Button, Input } from '..'

export default {
  title: 'Accordion',
  component: Accordion,
}

const CustomContent = styled.div(({ theme }) => ({
  ...theme.partials.text.subtitle1,
}))

function Template({ customTrigger, customContent, ...args }: any) {
  if (customTrigger) {
    args.triggerButton = (
      <div>
        <Button primary>Show more</Button>
      </div>
    )
  }
  if (customContent) {
    args.children = <CustomContent>{args.children}</CustomContent>
  }

  return <Accordion {...args} />
}

export const Default = Template.bind({})

Default.args = {
  unstyled: false,
  customTrigger: false,
  label: 'Title',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const CustomStyling = Template.bind({})

CustomStyling.args = {
  unstyled: true,
  customTrigger: true,
  customContent: true,
  label: 'Title',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const Horizontal = Template.bind({})

Horizontal.args = {
  unstyled: true,
  horizontal: true,
  defaultOpen: true,
  customTrigger: true,
  customContent: true,
  padContent: false,
  label: 'Title',
  children: (
    <div>
      <Input
        titleContent="Test"
        width={250}
      />
    </div>
  ),
}
