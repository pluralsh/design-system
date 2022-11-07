import {
  MutableRefObject,
  forwardRef,
  memo,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { InputProps, Label } from 'honorable'
import classNames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRadio } from '@react-aria/radio'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'
import { flexRender } from '@tanstack/react-table'

const CheckedIcon = memo(({ small }: { small: boolean }) => {
  const checkWidth = small ? 10 : 16
  const checkRadius = checkWidth / 2

  return (
    <svg
      width={checkWidth}
      viewBox={`0 0 ${checkWidth} ${checkWidth}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={checkRadius}
        cy={checkRadius}
        r={checkRadius}
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
  ':focus': {
    outline: 'none',
  },
  '.box': {
    width: $small ? theme.spacing.medium : theme.spacing.large,
    height: $small ? theme.spacing.medium : theme.spacing.large,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...($isFocusVisible
      ? { ...theme.partials.focus.outline, border: 'none' }
      : {}),
    borderRadius: '50%',
    border: theme.borders.input,
    borderColor: $disabled
      ? theme.colors['border-disabled']
      : theme.colors['border-input'],
    backgroundColor: $disabled
      ? theme.colors['action-primary-disabled']
      : 'transparent',
    '.icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: !$disabled
        ? theme.colors['action-primary']
        : theme.colors['action-primary-disabled'],
    },
  },
  ...(!$disabled
    ? {
      ':hover': {
        color: theme.colors.text,
        ':not(.checked) .box': {
          backgroundColor: theme.colors['action-input-hover'],
        },
        '.icon': {
          color: theme.colors['action-primary-hover'],
        },
      },
      ...($isFocusVisible
        ? {
          color: theme.colors.text,
          ':not(.checked) .box': {
            backgroundColor: theme.colors['action-input-hover'],
          },
        }
        : {}),
      '&.checked': {
        color: theme.colors.text,
        ...(!$isFocusVisible
          ? {
            '.box': {
              borderColor: theme.colors['border-selected'],
            },
          }
          : {}),
      },
    }
    : {}),
}))

export type RadioProps = {
  small: boolean
  disabled: boolean
  defaultSelected: boolean
  onChange: (e: { target: { checked: boolean } }) => any
} & Omit<InputProps, 'onChange'>

function Radio({
  small,
  value,
  checked: checkedProp,
  disabled,
  defaultChecked,
  'aria-describedby': ariaDescribedBy,
  tabIndex,
  onChange,
  onBlur,
  onClick,
  onDragStart,
  onFocus,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onPointerDown,
  onPointerUp,
  name,
  ...props
}: RadioProps,
ref: MutableRefObject<any>) {
  const [checked, setChecked] = useState(defaultChecked || checkedProp)

  useEffect(() => {
    setChecked(checkedProp)
  }, [checkedProp])

  const labelId = useId()
  const inputRef = useRef<any>()
  const { isFocusVisible, focusProps } = useFocusRing()
  const { inputProps, isSelected, isDisabled } = useRadio({
    value,
    name,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': labelId,
    disabled,
    tabIndex,
    onBlur,
    onClick,
    onDragStart,
    onFocus,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onPointerDown,
    onPointerUp,
  },
  {
    setSelectedValue: () => {},
    selectedValue: checkedProp || checked ? value : undefined,
  },
  inputRef)

  const icon = isSelected ? <CheckedIcon small={small} /> : null

  console.log('inputProps', inputProps)

  return (
    <HonorableLabelStyled
      htmlFor={inputProps.id}
      id={labelId}
      ref={ref}
      className={classNames({ checked: isSelected })}
      $isFocusVisible={isFocusVisible}
      $small={small}
      $disabled={isDisabled}
      display="flex"
      marginBottom="0"
      {...props}
    >
      <VisuallyHidden>
        <input
          {...inputProps}
          {...focusProps}
          name={name}
          onChange={e => {
            console.log(e.target, ' changed to ', e.target.checked)
            if (typeof onChange === 'function') {
              onChange(e)
            }
            console.log('setSelected', !checked)
            setChecked(!checked)
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

Radio.propTypes = {
  small: PropTypes.bool,
}

export default forwardRef(Radio)
