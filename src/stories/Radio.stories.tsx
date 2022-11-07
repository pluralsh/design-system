import { Div } from 'honorable'
import { useState } from 'react'

import Radio from '../components/Radio'
import RadioGroup from '../components/RadioGroup'

export default {
  title: 'Radio',
  component: Radio,
}

const radios = [
  {
    value: '0',
    label: 'Implement design system',
  },
  {
    value: '1',
    label: 'Fix a bug',
  },
  {
    value: '2',
    label: 'Take a break',
  },
]

function Template(args: any) {
  const [selectedValueRG, setSelectedValueRG] = useState(undefined)
  const [selectedValueManual, setSelectedValueManual] = useState(undefined)

  return (
    <>
      <h1>Controlled by RadioGroup</h1>
      <RadioGroup
        name="radio-group-controlled"
        value={selectedValueRG}
        onChange={setSelectedValueRG}
      >
        {radios.map(({ value, label }) => (
          <Radio
            value={value}
            {...args}
          >
            {label}
          </Radio>
        ))}
      </RadioGroup>

      <h1>Manually Controlled</h1>
      <Div>
        {radios.map(({ value, label }) => (
          <Radio
            name="manually-controlled"
            value={value}
            checked={selectedValueManual === value}
            onChange={({ target: { checked } }: any) => {
              if (checked) setSelectedValueManual(value)
            }}
            {...args}
          >
            {label}
          </Radio>

        ))}
      </Div>

      <h1>Uncontrolled</h1>
      <Div>
        {radios.map(({ value, label }) => (
          <Radio
            name="uncontrolled"
            value={value}
            {...args}
          >
            {label}
          </Radio>
        ))}
      </Div>
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
