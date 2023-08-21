import {
  type CalendarDate,
  type CalendarDateTime,
  type ZonedDateTime,
  getLocalTimeZone,
  now,
} from '@internationalized/date'
import { type ComponentProps, useState } from 'react'
import styled from 'styled-components'

import { DatePicker } from '..'
import { Calendar } from '../components/Calendar'

export default {
  title: 'Date Picker',
  component: DatePicker,
}

const TemplateSC = styled.div((_) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '30px',
}))

function Template(args: any) {
  const localTZ = getLocalTimeZone()

  console.log('tz', localTZ)
  const [date, setDate] = useState<
    ZonedDateTime | CalendarDate | CalendarDateTime | null
  >(null)
  const props: ComponentProps<typeof DatePicker> = {
    onChange: (d) => {
      console.log('changed date', d)
      setDate(d)
    },
  }

  return (
    <>
      <h4>{args.header} Date Picker</h4>

      <TemplateSC>
        <Calendar />
        <DatePicker
          // {...args}
          placeholderValue={now('America/Los_Angeles')}
          value={date}
          {...props}
        />
        {/* <DatePicker
          {...props}
          {...args}
        />
        <DatePicker
          {...props}
          {...args}
        />
        <DatePicker
          {...props}
          {...args}
        /> */}
      </TemplateSC>
    </>
  )
}

export const Default = Template.bind({})

Default.args = {
  header: 'Default',
  title: 'Confirm Uninstall',
  form: false,
  size: 'medium',
  hasActions: true,
}
