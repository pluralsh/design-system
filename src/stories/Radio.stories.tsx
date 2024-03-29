import { useState } from 'react'
import styled, { useTheme } from 'styled-components'

import Button from '../components/Button'
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

const H1 = styled.h1(({ theme }) => ({
  ...theme.partials.text.subtitle1,
  '&:not(:first-child)': {
    marginTop: theme.spacing.xxlarge,
  },
}))

function Template(args: any) {
  const [selectedValueRG, setSelectedValueRG] = useState(undefined)
  const theme = useTheme()

  return (
    <>
      <H1>Controlled by RadioGroup</H1>
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
      <Button
        marginTop={theme.spacing.medium}
        onClick={() => {
          setSelectedValueRG(null)
        }}
      >
        Reset
      </Button>
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
