import { useSliderState } from '@react-stately/slider'
import { AriaSliderProps, useSlider, useSliderThumb } from '@react-aria/slider'
import { useNumberFormatter } from '@react-aria/i18n'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'
import { useRef } from 'react'
import styled from 'styled-components'
import range from 'lodash/range'

import Tooltip from './Tooltip'

export type SliderProps = AriaSliderProps & {
   // TODO: Allow using 'vertical' once it will be ready.
  orientation?: 'horizontal'
  formatOptions?: Intl.NumberFormatOptions
  label?: string
  step?: number
  // TODO: Allow using custom tickSteps arrays instead, i.e. [1, 5, 10, 15, 20, 25].
  // Right now minValue + x * tickStep has to be equal to maxValue.
  tickStep?: number
  defaultValue?: number
  minValue: number
  maxValue: number
  tooltip?: boolean
  size?: number | string
  onChange?: (value: any) => void
}

const SliderWrap = styled.div<{percent: number, size: number | string}>(({ theme, percent, size }) => ({
  '.slider': {
    display: 'flex',

    // Additional padding to make sure that slider does not go outside parent element.
    paddingLeft: 12,
    paddingRight: 12,

    '&.horizontal': {
      flexDirection: 'column',
      width: size || '100%',

      '.track': {
        height: '30px',
        width: '100%',

        '&:before': {
          height: '12px',
          top: '50%',
          transform: 'translateY(-50%)',

          // Additional padding inside track to align ticks with correct points on track.
          marginLeft: -12,
          marginRight: 12,
          width: 'calc(100% + 24px)',
        },
      },

      '.thumb': {
        top: '50%',
      },
    },

    '.&.vertical': {
      height: size || '300px',

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
    backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(74, 81, 242, 0.85) ${percent}%, transparent ${percent}%)`,
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

  '.ticks': {
    ...theme.partials.text.caption,
    color: theme.colors['text-xlight'],
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginRight: -12,
    marginTop: theme.spacing.xxsmall,

    '.tick': {
      cursor: 'pointer',
      marginLeft: '-12px',
      width: 24,
      textAlign: 'center',

      '&.active': {
        color: theme.colors.text,
        fontWeight: 600,
      },

      '&:hover': {
        color: theme.colors['text-light'],
      },
    },
  },

  '.label-container': {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: -12,
    marginRight: 12,
    width: 'calc(100% + 24px)',
  },
}))

function Slider({
  tooltip = true, size, tickStep, ...props
}: SliderProps) {
  const trackRef = useRef(null)
  const numberFormatter = useNumberFormatter(props.formatOptions)
  const state = useSliderState({ ...props, numberFormatter })
  const {
    groupProps,
    trackProps,
    labelProps,
    outputProps,
  } = useSlider(props, state, trackRef)

  const ticks = tickStep ? range(state.getThumbMinValue(0), state.getThumbMaxValue(0) + 1, tickStep) : undefined

  return (
    <SliderWrap
      percent={(state.getThumbPercent(0) || 0) * 100}
      size={size}
    >
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
        {ticks && (
          <div className="ticks">
            {ticks.map(tick => (
              <div
                className={`tick ${tick === state.getThumbValue(0) ? 'active' : ''}`}
                onClick={() => state.setThumbValue(0, tick)}
              >
                {tick}
              </div>
            ))}
          </div>
        )}

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
