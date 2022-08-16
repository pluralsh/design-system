import {
  Key,
  ReactElement,
  ReactNode,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { useComboBox } from '@react-aria/combobox'
import { ComboBoxStateOptions, useComboBoxState } from '@react-stately/combobox'
import { AriaComboBoxProps } from '@react-types/combobox'
import { ListState } from '@react-stately/list'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import styled from 'styled-components'

import { ListBoxItemBaseProps } from './ListBoxItem'
import DropdownArrowIcon from './icons/DropdownArrowIcon'
import Input, { InputProps } from './Input'
import { SelectInner } from './Select'
import {
  setNextFocusedKey,
  useSelectComboStateProps,
} from './SelectComboShared'
import { PopoverListBox } from './PopoverListBox'
import SearchIcon from './icons/SearchIcon'

type ComboBoxInputProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  showArrow?: boolean
  isOpen?: boolean
}

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
  inputComponent?: ReactElement
  placement?: Placement
  width?: string | number
  maxHeight?: string | number
  filter?: ComboBoxStateOptions<object>['defaultFilter']
} & Omit<
    AriaComboBoxProps<object>,
    'onLoadMore' | 'isLoading' | 'validationState' | 'placeholder'
  >

// type InputCloneProps = {
//   inputRef: RefObject<HTMLElement>
//   inputElt: any
//   isOpen: boolean
//   inputProps: any
// } & HTMLAttributes<HTMLElement>

// function InputClone({
//   inputElt: buttonElt,
//   isOpen,
//   inputProps,
//   inputRef,
// //   ...props
// }: InputCloneProps) {
//   const theme = useTheme()

//   console.log('ref', inputRef.current)

//   return cloneElement(buttonElt, {
//     // ref,
//     inputProps: { ...inputProps, ref: inputRef, 'data-stuff': 'chickens' },
//     isOpen,
//     style: {
//     //   appearance: 'unset',
//       ...(isOpen ? { zIndex: theme.zIndexes.tooltip + 1 } : {}),
//     },
//     // tabIndex: 0,
//   })
// }

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

const ComboBoxInput = forwardRef<
  HTMLDivElement,
  ComboBoxInputProps & InputProps
>(({
  leftContent,
  rightContent,
  children: _children,
  inputProps,
  showArrow = true,
  isOpen,
  ...props
},
ref) => (
  <ComboBoxInputInner isOpen={isOpen}>
    <Input
      ref={ref}
      isOpen={isOpen}
      leftIcon={leftContent}
      rightIcon={
        showArrow ? (
          <div className="arrow">
            <DropdownArrowIcon size={16} />
          </div>
        ) : (
          rightContent
        )
      }
      inputProps={inputProps}
      {...props}
    />
  </ComboBoxInputInner>
))

const ComboBoxInner = styled(SelectInner)(_p => ({}))

function ComboBox({
  children,
  selectedKey,
  onSelectionChange,
  isOpen,
  onOpenChange,
  dropdownHeader,
  dropdownFooter,
  dropdownHeaderFixed,
  dropdownFooterFixed,
  onHeaderClick,
  onFooterClick,
  label,
  inputComponent,
  placement,
  width,
  maxHeight,
  ...props
}: ComboBoxProps) {
  const nextFocusedKeyRef = useRef<Key>(null)
  const stateRef = useRef<ListState<object> | null>(null)
  const [isOpenUncontrolled, setIsOpen] = useState(false)
  const [selectedKeyUncontrolled, setSelectedKey] = useState<Key>(null)

  if (typeof isOpen !== 'boolean') {
    isOpen = isOpenUncontrolled
  }
  if (typeof selectedKey !== undefined) {
    selectedKey = selectedKeyUncontrolled
  }

  const wrappedOnSelectionChange: typeof onSelectionChange = (newKey,
    ...args) => {
    setSelectedKey(newKey)
    if (onSelectionChange) {
      onSelectionChange.apply(this, [
        typeof newKey === 'string' ? newKey : '',
        ...args,
      ])
    }
  }

  const comboStateBaseProps = useSelectComboStateProps<ComboBoxProps>({
    dropdownHeader,
    dropdownFooter,
    onFooterClick,
    onHeaderClick,
    onOpenChange,
    onSelectionChange: wrappedOnSelectionChange,
    children,
    setIsOpen,
    stateRef,
    nextFocusedKeyRef,
  })

  const comboStateProps: AriaComboBoxProps<object> = {
    ...comboStateBaseProps,
    menuTrigger: 'focus',
    selectedKey,
    label,
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

  const {
    buttonProps: _buttonProps,
    inputProps,
    listBoxProps,
    labelProps: _labelProps,
  } = useComboBox({
    ...comboStateProps,
    inputRef,
    buttonRef,
    listBoxRef,
    popoverRef,
  },
  state)

  label = label || ' '

  if (!inputComponent) {
    const honorableInputPropNames = [
      'onChange',
      'onFocus',
      'onBlur',
      'onKeyDown',
      'onKeyUp',
    ]
    const outerInputProps: InputProps = pick(inputProps,
      honorableInputPropNames) as Pick<
      typeof inputProps,
      'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'
    >
    const innerInputProps = omit(inputProps, honorableInputPropNames)

    inputComponent = inputComponent || (
      <Input
        startIcon={<SearchIcon />}
        endIcon={<DropdownArrowIcon />}
        {...outerInputProps}
        inputProps={{
          ...innerInputProps,
          ref: inputRef,
        }}
      />
    )
  }

  return (
    <ComboBoxInner
      isOpen={state.isOpen}
      maxHeight={maxHeight}
      placement={placement}
    >
      {inputComponent}
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

export { ComboBox, ComboBoxInput, ComboBoxProps }
