import {
  Key,
  ReactElement,
  ReactNode,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { useComboBox } from '@react-aria/combobox'
import { useFilter } from '@react-aria/i18n'
import { useComboBoxState } from '@react-stately/combobox'
import { AriaComboBoxProps } from '@react-types/combobox'
import { ListState } from '@react-stately/list'
import pick from 'lodash/pick'
import omit from 'lodash/omit'

import styled, { useTheme } from 'styled-components'
import { useTransition } from 'react-spring'

import { CSSTransition } from 'react-transition-group'

import { ListBoxItemBaseProps } from './ListBoxItem'
import {
  FOOTER_KEY,
  HEADER_KEY,
  ListBoxUnmanaged,
  useItemWrappedChildren,
} from './ListBox'
import { SelectPopover } from './SelectPopover'
import DropdownArrowIcon from './icons/DropdownArrowIcon'
import Input, { InputProps } from './Input'
import { SelectInner } from './Select'

type ComboBoxInputProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  //   children?: ReactNode
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
} & Omit<
    AriaComboBoxProps<object>,
    'autoFocus' | 'onLoadMore' | 'isLoading' | 'validationState' | 'placeholder'
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
  rightContent: _rightContent,
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
        showArrow && (
          <div className="arrow">
            <DropdownArrowIcon size={16} />
          </div>
        )
      }
      inputProps={inputProps}
      {...props}
    >
      {/* <div className="children">{children}</div> */}
    </Input>
  </ComboBoxInputInner>
))

const ComboBoxInner = styled(SelectInner)(_p => ({}))

function ComboBox({
  children,
  selectedKey,
  onSelectionChange,
  isOpen,
  onOpenChange,
  leftContent,
  rightContent,
  dropdownHeader,
  dropdownFooter,
  dropdownHeaderFixed,
  dropdownFooterFixed,
  filter,
  onHeaderClick,
  onFooterClick,
  label,
  //   name,
  //   inputComponent: inputElt,
  placement,
  width,
  maxHeight,
  ...props
}: ComboBoxProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const nextFocusedKeyRef = useRef<Key>(null)
  const stateRef = useRef<ListState<object> | null>(null)
  const [isOpenUncontrolled, setIsOpen] = useState(false)
  const temporarilyPreventClose = useRef(false)
  const theme = useTheme()

  if (typeof isOpen !== 'boolean') {
    isOpen = isOpenUncontrolled
  }

  const selectStateProps: AriaComboBoxProps<object> = {
    menuTrigger: 'focus',
    onOpenChange: open => {
      if (!open && temporarilyPreventClose.current) {
        temporarilyPreventClose.current = false

        return
      }
      setIsOpen(open)
      if (onOpenChange) {
        onOpenChange(open)
      }
    },
    selectedKey,
    onSelectionChange: newKey => {
      if (newKey === HEADER_KEY && onHeaderClick) {
        temporarilyPreventClose.current = true
        onHeaderClick()
      }
      else if (newKey === FOOTER_KEY && onFooterClick) {
        temporarilyPreventClose.current = true
        onFooterClick()
        if (stateRef.current) {
          nextFocusedKeyRef.current
            = stateRef?.current?.collection?.getKeyBefore(FOOTER_KEY)
        }
      }
      else if (onSelectionChange) {
        onSelectionChange(typeof newKey === 'string' ? newKey : '')
      }
    },
    label,
    children: useItemWrappedChildren(children, dropdownHeader, dropdownFooter),
    ...props,
  }

  const state = useComboBoxState({
    ...selectStateProps,
    defaultFilter: filter || contains,
  })

  stateRef.current = state

  if (nextFocusedKeyRef.current) {
    const focusedKey
      = state.collection.getKeyAfter(nextFocusedKeyRef.current)
      || nextFocusedKeyRef.current

    state.selectionManager.setFocusedKey(focusedKey)
    nextFocusedKeyRef.current = null
  }

  // Get props for the listbox element
  // Setup refs and get props for child elements.
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
    ...selectStateProps,
    inputRef,
    buttonRef,
    listBoxRef,
    popoverRef,
  },
  state)

  label = label || ' '
  //   inputElt = inputElt || (
  //     <Input
  //       className="inputElt"
  //       leftIcon={leftContent}
  //       rightIcon={rightContent}
  //       isOpen={state.isOpen}
  //     >
  //       {state.selectedItem?.props?.children?.props?.label || label}
  //     </Input>
  //   )

  const transitions = useTransition(state.isOpen, {
    from: { opacity: 0, translateY: '-150px' },
    enter: { opacity: 1, translateY: '0' },
    leave: { opacity: 0, translateY: '-150px' },
    config: state.isOpen
      ? {
        mass: 0.6,
        tension: 280,
        velocity: 0.02,
      }
      : {
        mass: 0.6,
        tension: 400,
        velocity: 0.02,
        restVelocity: 0.1,
      },
  })

  console.log('inputref', inputRef.current)

  console.log('inputProps', inputProps)

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

  return (
    <CSSTransition
      in={isOpen}
      appear
      timeout={250}
    >
      <ComboBoxInner
        isOpen={state.isOpen}
        width={width}
        maxHeight={maxHeight}
        placement={placement}
      >
        <Input
          {...outerInputProps}
          inputProps={{
            ...innerInputProps,
            ref: inputRef,
          }}
        />
        {/* <InputClone
        inputRef={inputRef}
        inputElt={inputElt}
        isOpen={state.isOpen}
        inputProps={inputProps}
      /> */}
        <div className="popoverWrapper">
          {transitions((styles, item) => item && (
            <SelectPopover
              isOpen={state.isOpen}
              onClose={state.close}
              animatedStyles={styles}
              popoverRef={popoverRef}
            >
              <ListBoxUnmanaged
                className="listBox"
                state={state}
                headerFixed={dropdownHeaderFixed}
                footerFixed={dropdownFooterFixed}
                extendStyle={{
                  boxShadow: theme.boxShadows.moderate,
                }}
                listBoxRef={listBoxRef}
                {...listBoxProps}
              />
            </SelectPopover>
          ))}
        </div>
      </ComboBoxInner>
    </CSSTransition>
  )
}

export { ComboBox, ComboBoxInput }
