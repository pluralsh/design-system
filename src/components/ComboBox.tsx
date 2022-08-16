import {
  HTMLAttributes,
  Key,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useComboBox } from '@react-aria/combobox'
import {
  ComboBoxState,
  ComboBoxStateOptions,
  useComboBoxState,
} from '@react-stately/combobox'
import { AriaComboBoxProps } from '@react-types/combobox'
import { AriaButtonProps, useButton } from '@react-aria/button'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import isUndefined from 'lodash/isUndefined'
import styled from 'styled-components'
import { ExtendTheme, mergeTheme } from 'honorable'

import { omitBy } from 'lodash'

import { ListBoxItemBaseProps } from './ListBoxItem'
import DropdownArrowIcon from './icons/DropdownArrowIcon'
import Input, { InputProps } from './Input'
import {
  setNextFocusedKey,
  useSelectComboStateProps,
} from './SelectComboShared'
import { PopoverListBox } from './PopoverListBox'
import SearchIcon from './icons/SearchIcon'
import { SelectInner } from './Select'

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
} & Omit<
    AriaComboBoxProps<object>,
    'onLoadMore' | 'isLoading' | 'validationState' | 'placeholder'
  >

export const ComboBoxInputInner = styled.div<{ isOpen: boolean }>(({ theme, isOpen }) => ({
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
}))

type ComboBoxInputProps = {
  showArrow?: boolean
  isOpen?: boolean
  outerInputProps?: InputProps
}

const OpenButton = styled(({
  isOpen: _isOpen,
  buttonRef,
  buttonProps,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
    isOpen?: boolean
    buttonRef: RefObject<any>
    buttonProps: AriaButtonProps
  }) => {
  const { buttonProps: useButtonProps } = useButton({ ...buttonProps, elementType: 'div' },
    buttonRef)

  return (
    <div
      ref={buttonRef}
      {...props}
      {...useButtonProps}
    >
      <DropdownArrowIcon />
    </div>
  )
})(({ theme, isOpen }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing.medium,
  paddingRight: theme.spacing.medium,
  ...theme.partials.dropdown.arrowTransition({ isOpen }),
}))

const StartIconButton = styled.div(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing.medium,
  paddingRight: theme.spacing.medium,
}))

const comboBoxLeftRightStyles = {
  alignSelf: 'stretch',
  paddingHorizontal: 0,
  marginLeft: 0,
  marginRight: 0,
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
  manualOpen,
}: ComboBoxInputProps & InputProps) {
  outerInputProps = {
    ...outerInputProps,
    ...(pick(inputProps, honorableInputPropNames) as Pick<
      typeof inputProps,
      'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'
    >),
  }
  // Need to filter out undefined properties so they won't override
  // outerInputProps for honorable <Input> component
  const innerInputProps = useMemo(() => omitBy(omit(inputProps, honorableInputPropNames), isUndefined),
    [inputProps])

  let themeExtension: any = {}

  if (startIcon) {
    themeExtension = mergeTheme(themeExtension, {
      Input: {
        Root: [{ paddingLeft: 0 }],
        StartIcon: [
          {
            ...comboBoxLeftRightStyles,
          },
        ],
      },
    })
  }

  if (showArrow) {
    themeExtension = mergeTheme(themeExtension, {
      Input: {
        Root: [{ paddingRight: 0 }],
        EndIcon: [
          {
            ...comboBoxLeftRightStyles,
          },
        ],
      },
    })
  }

  return (
    <ExtendTheme theme={themeExtension}>
      <Input
        startIcon={startIcon && <StartIconButton>{startIcon}</StartIconButton>}
        endIcon={
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
          ...innerInputProps,
        }}
        onClick={() => {
          if (manualOpen) manualOpen()
          inputRef?.current?.focus()
        }}
        {...outerInputProps}
      />
    </ExtendTheme>
  )
}

const ComboBoxInner = styled(SelectInner)(_p => ({}))

function ComboBox({
  children,
  selectedKey,
  inputValue,
  onSelectionChange,
  onFocusChange,
  isOpen,
  onOpenChange,
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
  inputProps: outerInputProps,
  ...props
}: ComboBoxProps) {
  const nextFocusedKeyRef = useRef<Key>(null)
  const stateRef = useRef<ComboBoxState<object> | null>(null)
  const [isOpenUncontrolled, setIsOpen] = useState(false)

  if (typeof isOpen !== 'boolean') {
    isOpen = isOpenUncontrolled
  }

  const wrappedOnSelectionChange: typeof onSelectionChange = useCallback((newKey, ...args) => {
    if (onSelectionChange) {
      onSelectionChange.apply(this, [
        typeof newKey === 'string' ? newKey : '',
        ...args,
      ])
      if (stateRef?.current?.isOpen) {
        stateRef.current.close()
      }
    }
  },
  [onSelectionChange])

  const wrappedOnOpenChange: typeof onOpenChange = useCallback((isOpen, menuTrigger) => {
    // Don't reopen after inputValue is reset by making a selection
    if (isOpen && menuTrigger === 'input' && !inputValue) {
      stateRef?.current?.close()
    }
    else if (onOpenChange) onOpenChange(isOpen, menuTrigger)
  },
  [onOpenChange, inputValue])

  const wrappedOnFocusChange: typeof onFocusChange = useCallback((isFocused, ...args) => {
    // Enforce open on focus
    if (isFocused && stateRef.current && !stateRef.current.isOpen) {
      stateRef.current.open(null, 'focus')
    }
    if (onFocusChange) {
      onFocusChange(isFocused, ...args)
    }
  },
  [onFocusChange])

  const manualOpen: (...args: any[]) => void = useCallback(() => {
    if (stateRef.current && !stateRef.current.isOpen) {
      stateRef.current.open(null, 'manual')
    }
  }, [])

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

  const comboStateProps: AriaComboBoxProps<object> = {
    ...comboStateBaseProps,
    menuTrigger: 'focus',
    selectedKey: selectedKey || null,
    onFocusChange: wrappedOnFocusChange,
    inputValue,
    ...props,
  }

  const state = useComboBoxState({
    ...comboStateProps,
  })

  setNextFocusedKey({ nextFocusedKeyRef, state, stateRef })

  const buttonRef = useRef(null)
  const inputRef = useRef(null)
  const listBoxRef = useRef(null)
  const popoverRef = useRef(null)

  const { buttonProps, inputProps, listBoxProps } = useComboBox({
    ...comboStateProps,
    inputRef,
    buttonRef,
    listBoxRef,
    popoverRef,
  },
  state)

  if (startIcon === undefined) {
    startIcon = <SearchIcon />
  }

  return (
    <ComboBoxInner
      isOpen={state.isOpen}
      maxHeight={maxHeight}
      placement={placement}
    >
      <ComboBoxInput
        inputRef={inputRef}
        inputProps={inputProps}
        buttonRef={buttonRef}
        buttonProps={buttonProps}
        showArrow={showArrow}
        isOpen={state.isOpen}
        manualOpen={manualOpen}
        startIcon={startIcon}
        outerInputProps={outerInputProps}
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
        placement={placement}
      />
    </ComboBoxInner>
  )
}

export { ComboBox, ComboBoxProps }
