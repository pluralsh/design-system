import { omitBy } from 'lodash'
import { isUndefined, omit, pick } from 'lodash-es'
import {
  type HTMLAttributes,
  type Key,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { type AriaButtonProps, useButton, useComboBox } from 'react-aria'
import { mergeRefs } from 'react-merge-refs'
import {
  type ComboBoxState,
  type ComboBoxStateOptions,
  useComboBoxState,
} from 'react-stately'
import styled, { useTheme } from 'styled-components'

import { useFloatingDropdown } from '../hooks/useFloatingDropdown'

import DropdownArrowIcon from './icons/DropdownArrowIcon'
import SearchIcon from './icons/SearchIcon'
import { type InputProps } from './Input'
import { Spinner } from './Spinner'

import { type ListBoxItemBaseProps } from './ListBoxItem'
import { PopoverListBox } from './PopoverListBox'
import { SelectInner } from './Select'
import {
  setNextFocusedKey,
  useSelectComboStateProps,
} from './SelectComboShared'
import Input2 from './Input2'

type Placement = 'left' | 'right'

type ComboBoxProps = Exclude<ComboBoxInputProps, 'children'> & {
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
  dropdownHeaderFixed?: ReactNode
  dropdownFooterFixed?: ReactNode
  dropdownHeader?: ReactElement
  dropdownFooter?: ReactElement
  onHeaderClick?: () => unknown
  onFooterClick?: () => unknown
  startIcon?: ReactNode
  placement?: Placement
  width?: string | number
  maxHeight?: string | number
  inputProps?: InputProps
  filter?: ComboBoxStateOptions<object>['defaultFilter']
  loading?: boolean
  titleContent?: ReactNode
  tags?: ReactElement[]
} & Pick<InputProps, 'suffix' | 'prefix' | 'titleContent' | 'showClearButton'> &
  Omit<
    ComboBoxStateOptions<object>,
    'onLoadMore' | 'isLoading' | 'validationState' | 'placeholder'
  >

export const ComboBoxInputInner = styled.div<{ isOpen: boolean }>(
  ({ theme, isOpen }) => ({
    '.arrow': {
      transition: 'transform 0.1s ease',
      display: 'flex',
      marginLeft: theme.spacing.medium,
      alignItems: 'center',
      ...(isOpen
        ? {
            transform: 'scaleY(-100%)',
          }
        : {}),
    },
  })
)

type ComboBoxInputProps = {
  showArrow?: boolean
  isOpen?: boolean
  outerInputProps?: InputProps
  onInputClick?: MouseEventHandler
  inputRef?: RefObject<HTMLInputElement>
  buttonRef?: RefObject<HTMLDivElement>
  buttonProps?: AriaButtonProps
  loading?: boolean
}

const OpenButtonSC = styled.div(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  paddingLeft: theme.spacing.medium,
  paddingRight: theme.spacing.medium,
  borderRadius: theme.borderRadiuses.medium - theme.borderWidths.default,
  ...theme.partials.dropdown.arrowTransition({ isOpen: false }),
  '&[aria-expanded=true]': {
    ...theme.partials.dropdown.arrowTransition({ isOpen: true }),
  },
  '&:focus, &:focus-visible': {
    outline: 'none',
  },
}))

function OpenButton({
  isOpen: _isOpen,
  buttonRef,
  buttonProps,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean
  buttonRef: RefObject<any>
  buttonProps: AriaButtonProps
}) {
  const { buttonProps: useButtonProps } = useButton(
    { ...buttonProps, elementType: 'div' },
    buttonRef
  )

  return (
    <OpenButtonSC
      ref={buttonRef}
      {...props}
      {...useButtonProps}
    >
      <DropdownArrowIcon />
    </OpenButtonSC>
  )
}

const honorableInputPropNames = [
  'onChange',
  'onFocus',
  'onBlur',
  'onKeyDown',
  'onKeyUp',
]

function ComboBoxInput({
  startIcon,
  children: _children,
  inputRef,
  inputProps,
  outerInputProps,
  buttonRef,
  buttonProps,
  showArrow = true,
  isOpen,
  onInputClick,
  loading,
  ...props
}: ComboBoxInputProps & InputProps) {
  outerInputProps = {
    ...outerInputProps,
    ...(pick(inputProps, honorableInputPropNames) as Pick<
      typeof inputProps,
      'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'
    >),
  }

  const theme = useTheme()
  // Need to filter out undefined properties so they won't override
  // outerInputProps for honorable <Input> component
  const innerInputProps = useMemo(
    () => omitBy(omit(inputProps, honorableInputPropNames), isUndefined),
    [inputProps]
  )

  return (
    <Input2
      startIcon={
        loading ? <Spinner color={theme.colors['icon-xlight']} /> : startIcon
      }
      dropdownButton={
        showArrow ? (
          <OpenButton
            isOpen={isOpen}
            buttonRef={buttonRef}
            buttonProps={buttonProps}
          />
        ) : undefined
      }
      inputProps={{
        ref: inputRef,
        onClick: onInputClick,
        ...innerInputProps,
      }}
      {...outerInputProps}
      {...props}
    />
  )
}

const ComboBoxInner = styled(SelectInner)((_p) => ({}))

function ComboBox({
  children,
  selectedKey,
  inputValue,
  onSelectionChange,
  onFocusChange,
  onOpenChange,
  onInputChange,
  isOpen,
  dropdownHeader,
  dropdownFooter,
  dropdownHeaderFixed,
  dropdownFooterFixed,
  onHeaderClick,
  onFooterClick,
  showArrow,
  startIcon,
  placement,
  width,
  maxHeight,
  inputProps: outerInputProps = {},
  loading,
  suffix,
  prefix,
  titleContent,
  showClearButton,
  tags,
  ...props
}: ComboBoxProps) {
  const nextFocusedKeyRef = useRef<Key>(null)
  const stateRef = useRef<ComboBoxState<object> | null>(null)
  const [isOpenUncontrolled, setIsOpenUncontrolled] = useState(false)
  const previousInputValue = useRef(inputValue)

  if (typeof isOpen !== 'boolean') {
    isOpen = isOpenUncontrolled
  }

  const wrappedOnOpenChange: typeof onOpenChange = useCallback(
    (nextIsOpen, menuTrigger) => {
      setIsOpenUncontrolled(nextIsOpen)
      if (nextIsOpen !== isOpen) {
        if (onOpenChange) onOpenChange(nextIsOpen, menuTrigger)
      }
    },
    [isOpen, onOpenChange]
  )

  const setIsOpen = useCallback(
    (isOpen: boolean) => {
      wrappedOnOpenChange(isOpen, 'manual')
    },
    [wrappedOnOpenChange]
  )

  const wrappedOnSelectionChange: typeof onSelectionChange = useCallback(
    (newKey, ...args) => {
      if (onSelectionChange) {
        onSelectionChange.apply(this, [
          typeof newKey === 'string' ? newKey : '',
          ...args,
        ])
        setIsOpen(false)
      }
    },
    [onSelectionChange, setIsOpen]
  )

  const wrappedOnFocusChange: typeof onFocusChange = useCallback(
    (isFocused, ...args) => {
      // Enforce open on focus
      if (isFocused && !isOpen) {
        setIsOpen(true)
      }
      if (onFocusChange) {
        onFocusChange(isFocused, ...args)
      }
    },
    [isOpen, onFocusChange, setIsOpen]
  )

  const wrappedOnInputChange: typeof onInputChange = useCallback(
    (input, ...args) => {
      if (input !== previousInputValue.current) {
        previousInputValue.current = input
        setIsOpen(true)
      }
      if (onInputChange) {
        onInputChange(input, ...args)
      }
    },
    [onInputChange, setIsOpen]
  )

  const comboStateBaseProps = useSelectComboStateProps<ComboBoxProps>({
    dropdownHeader,
    dropdownFooter,
    onFooterClick,
    onHeaderClick,
    onOpenChange: wrappedOnOpenChange,
    onSelectionChange: wrappedOnSelectionChange,
    children,
    setIsOpen,
    stateRef,
    nextFocusedKeyRef,
  })

  const comboStateProps: ComboBoxStateOptions<object> = {
    ...comboStateBaseProps,
    menuTrigger: 'manual',
    selectedKey: selectedKey || null,
    onFocusChange: wrappedOnFocusChange,
    onInputChange: wrappedOnInputChange,
    inputValue,
    ...props,
  }

  const state = useComboBoxState({
    ...comboStateProps,
  })

  setNextFocusedKey({ nextFocusedKeyRef, state, stateRef })

  useEffect(() => {
    if (isOpen !== state.isOpen) {
      if (isOpen) {
        state.open(null, 'manual')
      } else {
        state.close()
      }
    }
  }, [state, isOpen])

  const buttonRef = useRef(null)
  const inputRef = useRef(null)
  const listBoxRef = useRef(null)
  const popoverRef = useRef(null)

  const { buttonProps, inputProps, listBoxProps } = useComboBox(
    {
      ...comboStateProps,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  )

  if (startIcon === undefined) {
    startIcon = <SearchIcon />
  }

  const { floating, triggerRef } = useFloatingDropdown({
    triggerRef: inputRef,
    width,
    maxHeight,
    placement,
  })

  outerInputProps = useMemo(
    () => ({
      ...(tags ? { inputContent: tags } : {}),
      ...outerInputProps,
      ...(outerInputProps.ref
        ? { ref: mergeRefs([outerInputProps.ref, triggerRef]) }
        : { ref: triggerRef }),
    }),
    [outerInputProps, tags, triggerRef]
  )

  return (
    <ComboBoxInner>
      <ComboBoxInput
        inputProps={inputProps}
        buttonRef={buttonRef}
        buttonProps={buttonProps}
        showArrow={showArrow}
        isOpen={state.isOpen}
        suffix={suffix}
        prefix={prefix}
        titleContent={titleContent}
        showClearButton={showClearButton}
        setIsOpen={setIsOpen}
        startIcon={startIcon}
        outerInputProps={outerInputProps}
        loading={loading}
        onInputClick={() => {
          setIsOpen(true)
          // Need to also manually open with state to override
          // default close behavior
          state.open(null, 'manual')
        }}
      />
      <PopoverListBox
        isOpen={state.isOpen}
        onClose={state.close}
        listBoxState={state}
        listBoxProps={listBoxProps}
        popoverRef={popoverRef}
        listBoxRef={listBoxRef}
        dropdownHeaderFixed={dropdownHeaderFixed}
        dropdownFooterFixed={dropdownFooterFixed}
        width={width}
        floating={floating}
      />
    </ComboBoxInner>
  )
}

export type { ComboBoxProps }
export { ComboBox }
