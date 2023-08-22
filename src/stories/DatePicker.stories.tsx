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

export default {
  title: 'Date Picker',
  component: DatePicker,
}

const TemplateSC = styled.div((_) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  columnGap: 48,
  rowGap: 500,
}))

function Template(args: any) {
  const nowTime = now(getLocalTimeZone())
  const [date, setDate] = useState<
    ZonedDateTime | CalendarDate | CalendarDateTime | null
  >(null)
  const minDate = nowTime.subtract({ years: 5 })
  const maxDate = nowTime
  const props: ComponentProps<typeof DatePicker> = {
    onChange: (d) => {
      setDate(d)
    },
    value: date,
    minValue: minDate,
    maxValue: maxDate,
  }

  return (
    <>
      <h4>{args.header} Date Picker</h4>

      <TemplateSC>
        <DatePicker
          placeholderValue={nowTime}
          {...props}
        />
        <DatePicker
          {...props}
          {...args}
        />
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
