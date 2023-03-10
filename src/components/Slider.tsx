import { useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'
import { useNumberFormatter } from '@react-aria/i18n'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'
import { useRef } from 'react'

import './Slider.css'

function Slider(props: any) {
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
    <div
      {...groupProps}
      className={`slider ${state.orientation}`}
    >
      {props.label
        && (
          <div className="label-container">
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
        />
      </div>
    </div>
  )
}

function Thumb(props: any) {
  const { state, trackRef, index } = props
  const inputRef = useRef(null)
  const { thumbProps, inputProps, isDragging } = useSliderThumb({
    index,
    trackRef,
    inputRef,
  }, state)

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
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
}

export default Slider
