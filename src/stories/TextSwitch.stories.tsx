import { type ComponentProps, useState } from 'react'
import { useTheme } from 'styled-components'

import { Flex } from 'honorable'

import Button from '../components/Button'
import TextSwitch from '../components/TextSwitch'

export default {
  title: 'TextSwitch',
  component: TextSwitch,
}

const options1 = [
  {
    value: 'AND',
    label: 'All',
  },
  {
    value: 'OR',
    label: 'Any',
  },
] as const satisfies ComponentProps<typeof TextSwitch>['options']
const options2 = [
  {
    value: '0',
    label: '1',
  },
  {
    value: '1',
    label: '2',
  },
  {
    value: '2',
    label: '3',
  },
  {
    value: '3',
    label: '4',
  },
] as const satisfies ComponentProps<typeof TextSwitch>['options']

function Template({ label, ...args }: ComponentProps<typeof TextSwitch>) {
  const [selectedValue1, setSelectedValue1] = useState<string>(
    'AND' satisfies (typeof options1)[number]['value']
  )
  const [selectedValue2, setSelectedValue2] = useState<string>(
    '0' satisfies (typeof options2)[number]['value']
  )

  return (
    <Flex
      gap="medium"
      flexDirection="column"
    >
      <TextSwitch
        name="radio-group-controlled"
        label={label || 'Match:'}
        value={selectedValue1}
        onChange={setSelectedValue1}
        options={options1}
        {...args}
      />
      <TextSwitch
        name="radio-group-controlled"
        label={label || 'Tabs'}
        labelPosition="end"
        value={selectedValue2}
        onChange={setSelectedValue2}
        options={options2}
        {...args}
      />
    </Flex>
  )
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: '',
  isDisabled: false,
} as const satisfies Partial<ComponentProps<typeof TextSwitch>>
