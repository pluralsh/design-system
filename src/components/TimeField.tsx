import { useRef } from 'react'
import {
  type AriaTimeFieldProps,
  type TimeValue,
  useLocale,
  useTimeField,
} from 'react-aria'
import { useTimeFieldState } from 'react-stately'
import styled from 'styled-components'

import { DateFieldWrapperSC, DateSegment } from './DateField'

export function TimeField(props: AriaTimeFieldProps<TimeValue>) {
  const { locale } = useLocale()
  const state = useTimeFieldState({
    ...props,
    locale,
  })

  const ref = useRef(null)
  const { fieldProps } = useTimeField(props, state, ref)

  return (
    <DateFieldWrapperSC
      {...fieldProps}
      ref={ref}
      className="field timeField"
    >
      {state.segments.map((segment, i) => (
        <DateSegment
          key={i}
          segment={segment}
          state={state}
        />
      ))}
      {state.validationState === 'invalid' && (
        <span aria-hidden="true">🚫</span>
      )}
    </DateFieldWrapperSC>
  )
}
