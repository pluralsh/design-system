import {
  MutableRefObject, forwardRef, memo, useId, useRef,
} from 'react'
import { InputProps, Label } from 'honorable'
import classNames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useToggleState } from '@react-stately/toggle'
import { useCheckbox } from '@react-aria/checkbox'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'

const CheckedIcon = memo(({ small }: { small: boolean }) => {
  if (small) {
    return (
      <svg
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m11 6-4 4-2-2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    )
  }

  return (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m17 9-6 6-3-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
})

const IndeterminateIcon = memo(({ small }: { small: boolean }) => {
  const width = small ? 6 : 8
  const height = small ? 2 : 3

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx={0.5}
        fill="currentColor"
      />
    </svg>
  )
})

const HonorableLabelStyled = styled(Label)<{
  $small: boolean
  $isFocusVisible: boolean
  $disabled: boolean
}>(({
  $small = false, $disabled = false, $isFocusVisible, theme,
}) => ({
  ...theme.partials.text.body2,
  gap: theme.spacing.small,
  alignItems: 'center',
  padding: theme.spacing.xxsmall,
  color: $disabled
    ? theme.colors['text-input-disabled']
    : theme.colors['text-light'],
  cursor: $disabled ? 'not-allowed' : 'pointer',
  margin: 0,
  '.box': {
    width: $small ? theme.spacing.medium : theme.spacing.large,
    height: $small ? theme.spacing.medium : theme.spacing.large,
    backgroundColor: 'transparent',
    position: 'relative',
    borderRadius: theme.borderRadiuses.medium,
    ':before': {
      position: 'absolute',
      content: '""',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: theme.borders.input,
      borderRadius: theme.borderRadiuses.medium,
      ...($isFocusVisible
        ? { ...theme.partials.focus.outline, border: 'none' }
        : {}),
      ...($disabled
        ? {
          borderColor: theme.colors['border-disabled'],
          backgroundColor: theme.colors['action-primary-disabled'],
        }
        : {}),
    },
    '.icon': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: !$disabled
        ? theme.colors['icon-default']
        : theme.colors['icon-disabled'],
    },
  },
  ...(!$disabled
    ? {
      ':hover': {
        color: theme.colors.text,
        '> span': {
          backgroundColor: theme.colors['action-input-hover'],
        },
      },
      ':focus': {
        outline: 'none',
      },
      ':focus-visible': {
        '.box': {
          ...theme.partials.focus.outline,
        },
        '*': {
          fill: theme.colors['action-primary-hover'],
        },
      },
      '&.checked': {
        color: theme.colors.text,
      },
      '&.checked, &.indeterminate': {
        '.box:before': {
          border: 'none',
          backgroundColor: theme.colors['action-primary'],
        },
      },
      ':hover.checked, :hover.indeterminate': {
        '.box:before': {
          border: 'none',
          backgroundColor: theme.colors['action-primary-hover'],
        },
      },
    }
    : {}),
}))

export type CheckboxProps = {
  small: boolean
  indeterminate: boolean
  disabled: boolean
  defaultSelected: boolean
  onChange: (e: { target: { checked: boolean } }) => any
} & Omit<InputProps, 'onChange'>

function Checkbox({
  small,
  onChange,
  checked: checkedProp,
  indeterminate,
  disabled,
  defaultSelected,
  onFocus,
  onBlur,
  onFocusChange,
  onKeyDown,
  onKeyUp,
  ...props
}: CheckboxProps,
ref: MutableRefObject<any>) {
  const toggleStateProps = {
    ...(checkedProp !== undefined ? { isSelected: checkedProp } : {}),
    defaultSelected: !!defaultSelected,
  }
  const labelId = useId()
  const toggleState = useToggleState(toggleStateProps)
  const inputRef = useRef<any>()
  const { isFocusVisible, focusProps } = useFocusRing()
  const { inputProps } = useCheckbox({
    ...toggleStateProps,
    isDisabled: disabled,
    onFocus,
    onBlur,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    'aria-labelledby': labelId,
    value: props.value,
    name: props.name,
  },
  toggleState,
  inputRef)

  const icon = indeterminate ? (
    <IndeterminateIcon small={small} />
  ) : toggleState.isSelected ? (
    <CheckedIcon small={small} />
  ) : null

  return (
    <HonorableLabelStyled
      htmlFor={inputProps.id}
      id={labelId}
      ref={ref}
      className={classNames({
        checked: toggleState.isSelected,
        indeterminate,
      })}
      $isFocusVisible={isFocusVisible}
      $small={small}
      $disabled={disabled}
      display="flex"
      marginBottom="0"
      {...props}
    >
      <VisuallyHidden>
        <input
          {...inputProps}
          {...focusProps}
          onChange={e => {
            if (typeof onChange === 'function') {
              onChange(e)
            }
            inputProps.onChange(e)
          }}
          ref={inputRef}
        />
      </VisuallyHidden>
      <div className="box">
        <div className="icon">{icon}</div>
      </div>
      <div className="label"> {props.children}</div>
    </HonorableLabelStyled>
  )
}

Checkbox.propTypes = {
  small: PropTypes.bool,
}

export default forwardRef(Checkbox)
