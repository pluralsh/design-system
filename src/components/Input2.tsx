import {
  type ComponentProps,
  type ComponentPropsWithRef,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ReactNode,
  forwardRef,
  useCallback,
  useRef,
} from 'react'
import styled from 'styled-components'
import { mergeRefs } from 'react-merge-refs'
import { mergeProps } from 'react-aria'

import { simulateInputChange } from '../utils/simulateInputChange'

import { useFillLevel } from './contexts/FillLevelContext'
import { TitleContent } from './Select'
import Tooltip from './Tooltip'
import IconFrame from './IconFrame'
import CloseIcon from './icons/CloseIcon'

import { useFormField } from './FormField'

export type InputProps = {
  suffix?: ReactNode
  prefix?: ReactNode
  titleContent?: ReactNode
  startContent?: ReactNode[]
  showClearButton?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  dropdownButton?: ReactNode
  inputProps?: ComponentProps<typeof InputBaseSC>
  /**
   * @deprecated use `size`
   */
  small?: boolean
  /**
   * @deprecated use `size`
   */
  medium?: boolean
  /**
   * @deprecated use `size`
   */
  large?: boolean
  size?: 'small' | 'medium' | 'large'
  error?: boolean
  onEnter?: KeyboardEventHandler<HTMLInputElement>
  onClick?: MouseEventHandler<HTMLDivElement>
}
export type InputPropsFull = InputProps & { className?: string } & Pick<
    // eslint-disable-next-line @typescript-eslint/ban-types
    ComponentPropsWithRef<'input'>,
    | 'value'
    | 'disabled'
    | 'defaultValue'
    | 'placeholder'
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
  >

const PrefixSuffix = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  paddingLeft: theme.spacing.small,
  paddingRight: theme.spacing.small,
  backgroundColor:
    theme.mode === 'light'
      ? theme.colors['fill-three']
      : theme.colors['fill-two'],
}))

const ClearButtonSC = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  paddingRight: theme.spacing.xsmall,
}))

function ClearButton({
  className,
  ...props
}: Omit<ComponentProps<typeof IconFrame>, 'clickable' | 'icon' | 'size'>) {
  return (
    <ClearButtonSC className={className}>
      <Tooltip
        placement="top"
        label="Clear"
      >
        <IconFrame
          clickable
          icon={<CloseIcon />}
          size="small"
          {...props}
        />
      </Tooltip>
    </ClearButtonSC>
  )
}

const InputTitleContent = styled(TitleContent)((_) => ({
  alignSelf: 'stretch',
}))

const InputRootSC = styled.div<{
  $error: boolean
  $size: InputProps['size']
}>(({ theme, $error, $size }) => ({
  ...($size === 'small'
    ? theme.partials.text.caption
    : theme.partials.text.body2),
  display: 'flex',
  overflow: 'hidden',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 'auto',
  minHeight: 'auto',
  width: 'auto',
  padding: 0,
  border: theme.borders.input,
  borderColor: $error ? theme.colors['border-danger'] : theme.colors.border,
  borderRadius: theme.borderRadiuses.normal,
  '&:focus-within': {
    borderColor: theme.colors['border-outline-focused'],
  },
  '&[aria-disabled=true], &[aria-disabled=true] *': {
    color: theme.colors['text-disabled'],
    borderColor: theme.colors['border-disabled'],
  },
}))
const InputBaseSC = styled.input<{
  $hasPrefix: boolean
  $hasSuffix: boolean
  $hasTitleContent: boolean
  $hasClearButton: boolean
  $hasStartIcon: boolean
  $hasEndIcon: boolean
  $hasDropdownButton: boolean
  $size: InputProps['size']
}>(
  ({
    theme,
    $hasPrefix,
    $hasSuffix,
    $hasTitleContent,
    $hasClearButton,
    $hasStartIcon,
    $hasEndIcon,
    $hasDropdownButton,
    $size,
    disabled,
  }) => ({
    ...theme.partials.reset.input,
    width: '100%',
    flex: '1 1',
    height: $size === 'small' ? 30 : $size === 'large' ? 46 : 38,
    lineHeight: $size === 'small' ? 30 : $size === 'large' ? 46 : 38,
    color: disabled ? theme.colors['text-input-disabled'] : theme.colors.text,
    paddingLeft: $hasPrefix
      ? theme.spacing.xsmall
      : $hasTitleContent
      ? $hasStartIcon
        ? theme.spacing.xsmall
        : theme.spacing.small
      : theme.spacing.medium,
    paddingRight: $hasSuffix
      ? theme.spacing.xsmall
      : $hasClearButton || $hasEndIcon
      ? theme.spacing.xsmall
      : $hasDropdownButton
      ? 0
      : theme.spacing.medium,
    ':placeholder': {
      color: disabled
        ? theme.colors['text-input-disabled']
        : theme.colors['text-xlight'],
    },
  })
)

const BaseIcon = styled.div((_) => ({
  alignSelf: 'stretch',
  display: 'flex',
  gap: 'small',
  margin: 0,
  padding: 0,
}))
const StartIcon = styled(BaseIcon)<{ $hasStartContent: boolean }>(
  ({ theme, $hasStartContent }) => ({
    paddingLeft: $hasStartContent ? theme.spacing.small : theme.spacing.medium,
  })
)
const EndIcon = styled(BaseIcon)<{
  $hasEndContent: boolean
  $hasDropdownButton: boolean
}>(({ theme, $hasEndContent, $hasDropdownButton }) => ({
  paddingRight: $hasEndContent
    ? theme.spacing.small
    : $hasDropdownButton
    ? 0
    : theme.spacing.medium,
}))
const Input2 = forwardRef<HTMLDivElement, InputPropsFull>(
  (
    {
      startIcon,
      endIcon,
      dropdownButton,
      suffix,
      prefix,
      showClearButton,
      titleContent,
      startContent: _startContent,
      size,
      small,
      large,
      onEnter,
      inputProps,
      //   Input props
      disabled,
      value,
      error,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)

    inputProps = {
      ...(inputProps ?? {}),
      ref: mergeRefs([inputRef, ...(inputProps?.ref ? [inputProps.ref] : [])]),
    }

    const parentFillLevel = useFillLevel()

    size = size || large ? 'large' : small ? 'small' : 'medium'

    inputProps = mergeProps(useFormField()?.fieldProps ?? {}, inputProps)

    const hasEndContent = !!suffix
    const hasStartContent = !!prefix || !!titleContent
    const hasClearButton = showClearButton && value

    const wrappedOnChange: InputPropsFull['onChange'] = useCallback(
      (e) => {
        onChange?.(e)
      },
      [onChange]
    )

    const wrappedOnKeyDown: InputPropsFull['onKeyDown'] = useCallback(
      (e) => {
        if (e.key === 'Enter' && typeof onEnter === 'function') {
          onEnter?.(e)
        }
        if (typeof onKeyDown === 'function') {
          onKeyDown?.(e)
        }
      },
      [onEnter, onKeyDown]
    )

    const outerOnClick: InputPropsFull['onClick'] = useCallback((e) => {
      e.preventDefault()
      console.log('clicked')
      inputRef?.current?.focus()
    }, [])

    return (
      <InputRootSC
        ref={ref}
        $size={size}
        $error={!!error}
        aria-disabled={disabled}
        onClick={outerOnClick}
        {...props}
      >
        {(titleContent && (
          <InputTitleContent
            $size={size}
            $parentFillLevel={parentFillLevel}
          >
            {titleContent}
          </InputTitleContent>
        )) ||
          (prefix && <PrefixSuffix>{prefix}</PrefixSuffix>)}

        {startIcon && (
          <StartIcon $hasStartContent={hasStartContent}>{startIcon}</StartIcon>
        )}
        <InputBaseSC
          $hasPrefix={!!prefix}
          $hasSuffix={!!suffix}
          $hasTitleContent={!!titleContent}
          $hasClearButton={hasClearButton}
          $hasStartIcon={!!startIcon}
          $hasEndIcon={!!endIcon}
          $size={size}
          disabled={disabled}
          value={value}
          error={error}
          placeholder={placeholder}
          onChange={wrappedOnChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onEnter={onEnter}
          onKeydown={wrappedOnKeyDown}
          {...inputProps}
        />
        {hasClearButton && (
          <ClearButton
            onClick={() => {
              const input = inputRef?.current

              if (input) {
                simulateInputChange(input, '')
                input.focus()
              }
            }}
          />
        )}
        {!!endIcon && (
          <EndIcon
            $hasEndContent={hasEndContent}
            $hasDropdownButton={!!dropdownButton}
          >
            {endIcon}
          </EndIcon>
        )}
        {!!suffix && <PrefixSuffix>{suffix}</PrefixSuffix>}
        {dropdownButton}
      </InputRootSC>
    )
  }
)

export default Input2
