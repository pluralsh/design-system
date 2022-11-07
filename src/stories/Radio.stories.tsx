import { RadioGroup } from 'honorable'
import { useState } from 'react'

import Radio from '../components/Radio'

export default {
  title: 'Radio',
  component: Radio,
}

const radios = [
  {
    value: 0,
    label: 'Implement design system',
  },
  {
    value: 1,
    label: 'Fix a bug',
  },
  {
    value: 2,
    label: 'Take a break',
  },
]

function Template(args: any) {
  const [selectedValue, setSelectedValue] = useState(0)

  return (
    <>
      <h1>Controlled</h1>
      <RadioGroup tabIndex={-1}>
        {radios.map(({ value, label }) => (
          <Radio
            value={value}
            checked={selectedValue === value}
            onChange={({ target: { checked } }: any) => {
              if (checked) setSelectedValue(value)
            }}
            {...args}
          >
            {label}
          </Radio>
        ))}
      </RadioGroup>
      <h1>Uncontrolled</h1>
      <RadioGroup tabIndex={-1}>
        {radios.map(({ value, label }) => (
          <Radio
            name="uncontrolled"
            value={value}
            {...args}
          >
            {label}
          </Radio>
        ))}
      </RadioGroup>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  small: false,
}

export const Small = Template.bind({})
Small.args = {
  small: true,
}
