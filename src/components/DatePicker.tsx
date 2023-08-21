import {
  type ComponentProps,
  type ReactNode,
  type RefObject,
  forwardRef,
  useRef,
} from 'react'
import {
  type AriaButtonProps,
  type AriaDatePickerProps,
  type AriaDialogProps,
  type DateValue,
  useButton,
  useDatePicker,
  useDialog,
} from 'react-aria'
import { type DatePickerStateOptions, useDatePickerState } from 'react-stately'
import styled from 'styled-components'

import { type Merge } from 'type-fest'

import { useFloatingCornerScale } from '../hooks/useFloatingCornerScale'

import { Calendar } from './Calendar'
import { DateField } from './DateField'
import { PopoverCalendar as PopoverCornerScale } from './PopoverCornerScale'
import CalendarIcon from './icons/CalendarIcon'
import IconFrame from './IconFrame'
import Card from './Card'

const CalendarButton = forwardRef(
  (
    { selected, ...props }: AriaButtonProps & { selected: boolean },
    ref: RefObject<any>
  ) => {
    const { buttonProps: buttonEltProps } = useButton(props, ref)

    console.log('buttonProps', buttonEltProps)

    return (
      <IconFrame
        {...buttonEltProps}
        type="floating"
        clickable
        size="medium"
        icon={<CalendarIcon clickable />}
        selected={selected}
        ref={ref}
      />
    )
  }
)

const FieldWrapSC = styled.div(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing.medium,
  padding: `${theme.spacing.small}px ${theme.spacing.medium}px`,
  borderRadius: theme.borderRadiuses.medium,
  border: theme.borders.input,
  '& > :first-child': {
    flexGrow: 1,
  },
}))

const DatePickerSC = styled.div(({ theme: _ }) => ({}))

export function DatePicker({
  elementProps = {},
  ...props
}: Merge<
  AriaDatePickerProps<any> & DatePickerStateOptions<DateValue>,
  {
    elementProps: ComponentProps<typeof DatePickerSC>
  }
>) {
  const state = useDatePickerState(props)

  const ref = useRef(null)

  console.log('kprops', props)

  const pickerResult = useDatePicker(
    { granularity: 'minute', hourCycle: 24, hideTimeZone: false, ...props },
    state,
    ref
  )

  const {
    groupProps,
    // labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = pickerResult

  console.log('2')

  const buttonRef = useRef<HTMLButtonElement>(null)

  console.log('3')

  console.log('buttonRef', buttonRef)
  const { floating, triggerRef } = useFloatingCornerScale({
    triggerRef: ref,
    placement: 'bottom-end',
  })

  console.log('fieldProps', fieldProps)

  return (
    <DatePickerSC {...elementProps}>
      <FieldWrapSC
        {...groupProps}
        ref={triggerRef}
      >
        <DateField {...fieldProps} />
        <CalendarButton
          // ref={triggerRef}
          {...buttonProps}
          selected={state.isOpen}
        />
      </FieldWrapSC>
      <PopoverCornerScale
        isOpen={state.isOpen}
        // isOpen
        onClose={state.close}
        floating={floating}
      >
        <CalendarDialog {...dialogProps}>
          <Calendar {...calendarProps} />
        </CalendarDialog>
      </PopoverCornerScale>
    </DatePickerSC>
  )
}

interface DialogProps extends AriaDialogProps {
  title?: ReactNode
  children: ReactNode
}

const CalendarDialogSC = styled(Card)(({ theme }) => ({
  justifySelf: 'end',
  flexGrow: 0,
  backgroundColor: theme.colors['fill-one'],
  padding: theme.spacing.medium,
}))

function CalendarDialog({ title, children, ...props }: DialogProps) {
  const ref = useRef(null)
  const { dialogProps, titleProps } = useDialog(props, ref)

  return (
    <CalendarDialogSC
      fillLevel={2}
      {...dialogProps}
      ref={ref}
    >
      {title && (
        <h3
          {...titleProps}
          style={{ marginTop: 0 }}
        >
          {title}
        </h3>
      )}
      {children}
    </CalendarDialogSC>
  )
}
