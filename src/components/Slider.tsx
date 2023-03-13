import { useSliderState } from '@react-stately/slider'
import { AriaSliderProps, useSlider, useSliderThumb } from '@react-aria/slider'
import { useNumberFormatter } from '@react-aria/i18n'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'
import { useRef } from 'react'
import styled from 'styled-components'

import Tooltip from './Tooltip'

export type SliderProps = AriaSliderProps & {
  orientation?: 'horizontal' // TODO: Allow using 'vertical' once it will be ready.
  formatOptions?: Intl.NumberFormatOptions,
  label?: string
  step?: number,
  defaultValue?: number,
  minValue: number,
  maxValue: number,
  tooltip?: boolean
  onChange?: (values: number[]) => void
}

const SliderWrap = styled.div<{percent: number}>(({ theme, percent }) => ({
  '.slider': {
    display: 'flex',

    '&.horizontal': {
      flexDirection: 'column',
      width: '300px',

      '.track': {
        height: '30px',
        width: '100%',

        '&:before': {
          height: '12px',
          width: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },

      '.thumb': {
        top: '50%',
      },
    },

    '.&.vertical': {
      height: '150px',

      '.track': {
        width: '30px',
        height: '100%',

        '&:before': {
          width: '12px',
          height: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },

      '.thumb': {
        left: '50%',
      },
    },
  },

  '.track:before': {
    content: 'attr(x)',
    display: 'block',
    position: 'absolute',
    background: theme.colors['fill-one'],
    backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(74, 81, 242, 0.85) ${percent}%, transparent ${percent + 1}%)`,
    borderRadius: '6px',
    boxShadow: 'inset 0px 0.5px 2px rgba(0, 0, 0, 0.25), inset 0px -0.5px 1.5px rgba(255, 255, 255, 0.16)',
  },

  '.thumb': {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: `radial-gradient(${theme.colors['border-selected']} 37%, ${theme.colors['fill-primary']} 40%)`,
    boxShadow: `
      3px 3px 4px 0 rgba(255, 255, 255, 0.15) inset,
      -2px -2px 3px 0 rgba(0, 0, 0, .1) inset,
      ${theme.boxShadows.moderate}
    `,

    '&.dragging': {
      background: `radial-gradient(${theme.colors['border-selected']} 37%, ${theme.colors['fill-primary-hover']} 40%)`,
    },

    '&.focus': {
      background: `radial-gradient(${theme.colors['border-selected']} 37%, ${theme.colors['fill-primary-hover']} 40%)`,
    },

    '&.disabled': {
      opacity: 0.4,
    },
  },

  '.label-container': {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

function Slider({ tooltip = true, ...props }: SliderProps) {
  const trackRef = useRef(null)
  const numberFormatter = useNumberFormatter(props.formatOptions)
  const state = useSliderState({ ...props, numberFormatter })
  const {
    groupProps,
    trackProps,
    labelProps,
    outputProps,
  } = useSlider(props, state, trackRef)

  return (
    <SliderWrap percent={(state.getThumbPercent(0) || 0) * 100}>
      <div
        {...groupProps}
        className={`slider ${state.orientation}`}
      >
        {props.label
        && (
          <div className="label-container">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label {...labelProps}>{props.label}</label>
            <output {...outputProps}>
              {state.getThumbValueLabel(0)}
            </output>
          </div>
        )}
        <div
          {...trackProps}
          ref={trackRef}
          className={`track ${state.isDisabled ? 'disabled' : ''}`}
        >
          <Thumb
            index={0}
            state={state}
            trackRef={trackRef}
            tooltip={tooltip}
          />
        </div>
      </div>
    </SliderWrap>
  )
}

function Thumb({
  state, trackRef, index, tooltip,
}: any) {
  const inputRef = useRef(null)
  const { thumbProps, inputProps, isDragging } = useSliderThumb({
    index,
    trackRef,
    inputRef,
  }, state)

  const { focusProps, isFocusVisible } = useFocusRing()

  const thumb = (
    <div
      {...thumbProps}
      className={`thumb ${isFocusVisible ? 'focus' : ''} ${
        isDragging ? 'dragging' : ''
      }`}
    >
      <VisuallyHidden>
        <input
          ref={inputRef}
          {...mergeProps(inputProps, focusProps)}
        />
      </VisuallyHidden>
    </div>
  )

  return (!tooltip
    ? thumb : (
      <Tooltip
        arrow
        placement="top"
        label={state.getThumbValueLabel(0) || 0}
      >
        {thumb}
      </Tooltip>
    )
  )
}

export default Slider
