import { Div } from 'honorable'
import { useState } from 'react'

import { Button, Checkbox } from '..'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

const checks = {
  0: {
    label: 'Drawing',
  },
  1: {
    label: 'Sports',
  },
  2: {
    label: 'Reading',
  },
  3: {
    label: 'Music',
  },
}

type CheckedVals = Record<string, 'checked' | 'unchecked' | 'indeterminate'>

function Template(args: any) {
  const initialCheckedVals: CheckedVals = {}

  for (const [key] of Object.entries(checks)) {
    initialCheckedVals[key] = 'indeterminate'
  }
  const [checkedVals, setCheckedVals] = useState(initialCheckedVals)

  console.log('checkedVals', checkedVals)

  return (
    <>
      <h1>Controlled</h1>
      <Div>
        {Object.entries(checks).map(([value, { label }]) => (
          <Checkbox
            key={value}
            name="options"
            value={value}
            checked={checkedVals[value] === 'checked'}
            onChange={({ target: { checked } }: any) => {
              console.log('onChange outside', checked)
              setCheckedVals({
                ...checkedVals,
                [value]: checked ? 'checked' : 'unchecked',
              })
            }}
            indeterminate={checkedVals[value] === 'indeterminate'}
            {...args}
          >
            {label}
          </Checkbox>
        ))}
        <Button
          marginTop="medium"
          onClick={() => setCheckedVals(initialCheckedVals)}
        >
          Reset
        </Button>
      </Div>
      <h1>Uncontrolled</h1>
      <Div>
        {Object.entries(checks).map(([value, { label }]) => (
          <Checkbox
            key={value}
            name="options"
            value={value}
            {...args}
          >
            {label}
          </Checkbox>
        ))}
      </Div>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  small: false,
  disabled: false,
  defaultSelected: false,
}

export const Small = Template.bind({})
Small.args = {
  small: true,
  disabled: false,
  defaultSelected: false,
}
