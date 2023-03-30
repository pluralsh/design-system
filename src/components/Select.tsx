import {
  HTMLAttributes,
  Key,
  ReactElement,
  ReactNode,
  RefObject,
  cloneElement,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { HiddenSelect, useSelect } from '@react-aria/select'
import { useButton } from '@react-aria/button'
import styled, { useTheme } from 'styled-components'
import { AriaSelectProps } from '@react-types/select'

import { BimodalSelectProps, BimodalSelectState, useBimodalSelectState } from '../utils/useBimodalSelectState'

import { ListBoxItemBaseProps } from './ListBoxItem'
import DropdownArrowIcon from './icons/DropdownArrowIcon'
import { PopoverListBox } from './PopoverListBox'
import { setNextFocusedKey, useSelectComboStateProps } from './SelectComboShared'
import { useFloatingDropdown } from './useFloatingDropdown'

type Placement = 'left' | 'right'
type Size = 'small' | 'medium' | 'large'

type SelectButtonProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  children?: ReactNode
  showArrow?: boolean
  isOpen?: boolean
  size: Size
}

export type SelectProps = Exclude<SelectButtonProps, 'children'> & {
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
  dropdownHeaderFixed?: ReactNode
  dropdownFooterFixed?: ReactNode
  dropdownHeader?: ReactElement
  dropdownFooter?: ReactElement
  onHeaderClick?: () => unknown
  onFooterClick?: () => unknown
  triggerButton?: ReactElement
  placement?: Placement
  size?: Size
  width?: string | number
  maxHeight?: string | number
  onSelectionChange?: (arg: any) => any
} & Omit<
    BimodalSelectProps<object>,
    'autoFocus' | 'onLoadMore' | 'isLoading' | 'validationState' | 'placeholder'
  >

type TriggerProps = {
  buttonRef: RefObject<HTMLElement>
  buttonElt: any
  isOpen: boolean
} & HTMLAttributes<HTMLElement>

function Trigger({ buttonElt, isOpen, ...props }: TriggerProps) {
  const ref = props.buttonRef
  const { buttonProps } = useButton(props, ref)
  const theme = useTheme()

  return cloneElement(buttonElt, {
    ref,
    ...buttonProps,
    isOpen,
    style: {
      appearance: 'unset',
      ...(isOpen ? { zIndex: theme.zIndexes.tooltip + 1 } : {}),
    },
    tabIndex: 0,
  })
}

const SelectButtonInner = styled.div<{ $isOpen: boolean, $size: Size }>(({ theme, $isOpen: isOpen, $size: size }) => ({
  ...theme.partials.reset.button,
  ...theme.partials.text.body2,
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 1,
  alignItems: 'center',
  width: '100%',
  padding: `${size === 'medium' ? 9 : 5}px ${theme.spacing.medium}px`,
  color: theme.colors['text-light'],
  border: theme.borders.input,
  borderRadius: theme.borderRadiuses.medium,
  '.children': {
    flexGrow: 1,
  },
  '.leftContent, .rightContent': {
    display: 'flex',
    alignItems: 'center',
  },
  '.leftContent': {
    marginRight: theme.spacing.medium,
  },
  '.rightContent': {
    marginLeft: theme.spacing.medium,
  },
  '.arrow': {
    transition: 'transform 0.1s ease',
    display: 'flex',
    marginLeft: theme.spacing.medium,
    alignItems: 'center',
    ...theme.partials.dropdown.arrowTransition({ isOpen }),
  },
  '&:focus-visible': {
    ...theme.partials.focus.default,
  },
}))

const SelectButton = forwardRef<
  HTMLDivElement,
  SelectButtonProps & HTMLAttributes<HTMLDivElement>
>(({
  leftContent, rightContent, children, showArrow = true, isOpen, size = 'medium', ...props
},
ref) => (
  <SelectButtonInner
    ref={ref}
    $isOpen={isOpen}
    $size={size}
    {...props}
  >
    {leftContent && <div className="leftContent">{leftContent}</div>}
    <div className="children">{children}</div>
    {rightContent && <div className="rightContent">{rightContent}</div>}
    {showArrow && (
      <div className="arrow">
        <DropdownArrowIcon size={16} />
      </div>
    )}
  </SelectButtonInner>
))

const SelectInner = styled.div(_ => ({
  position: 'relative',
}))

function Select(
  props: Omit<
    SelectProps,
    'selectionMode' | 'selectedKeys' | 'onSelectionChange'
  > & {
    selectionMode?: 'single'
  } & Pick<AriaSelectProps<object>, 'onSelectionChange'>
): ReactElement
function Select(
  props: Omit<
    SelectProps,
    'selectionMode' | 'selectedKey' | 'onSelectionChange'
  > & {
    selectionMode: 'multiple'
  } & { onSelectionChange: (keys: Set<Key>) => any }
): ReactElement
function Select({
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
  onHeaderClick,
  onFooterClick,
  label,
  name,
  triggerButton,
  placement,
  size = 'medium',
  width,
  maxHeight,
  ...props
}: SelectProps) {
  const stateRef = useRef<BimodalSelectState<object> | null>(null)
  const [isOpenUncontrolled, setIsOpen] = useState(false)
  const nextFocusedKeyRef = useRef<Key>(null)

  if (typeof isOpen !== 'boolean') {
    isOpen = isOpenUncontrolled
  }
  if (props.selectionMode === 'multiple' && selectedKey) {
    throw new Error('When using selectionMode="multiple", you must use "selectedKeys" instead of "selectedKey"')
  }

  const selectStateBaseProps = useSelectComboStateProps<SelectProps>({
    dropdownHeader,
    dropdownFooter,
    onFooterClick,
    onHeaderClick,
    onOpenChange,
    onSelectionChange,
    children,
    setIsOpen,
    stateRef,
    nextFocusedKeyRef,
  })

  const selectStateProps: BimodalSelectProps<object> = {
    ...selectStateBaseProps,
    isOpen,
    defaultOpen: false,
    selectedKey,
    label,
    ...props,
  }

  const state = useBimodalSelectState(selectStateProps)

  setNextFocusedKey({ nextFocusedKeyRef, state, stateRef })

  // Get props for the listbox element
  const ref = useRef()
  const { triggerProps, menuProps } = useSelect(selectStateProps, state, ref)

  label = label || ' '
  triggerButton = triggerButton || (
    <SelectButton
      className="triggerButton"
      leftContent={leftContent}
      rightContent={rightContent}
      isOpen={state.isOpen}
      size={size}
    >
      {(props.selectionMode === 'multiple'
        && state.selectedItems.length > 0
        && state.selectedItems
          .map(item => item?.props?.children?.props?.label)
          .filter(label => !!label)
          .join(', '))
        || state.selectedItem?.props?.children?.props?.label
        || label}
    </SelectButton>
  )

  const { floating, triggerRef } = useFloatingDropdown({ triggerRef: ref, width, maxHeight })

  return (
    <SelectInner className="selectInner">
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={label}
        name={name}
      />
      <Trigger
        buttonRef={triggerRef as unknown as RefObject<HTMLElement>}
        buttonElt={triggerButton}
        isOpen={state.isOpen}
        {...triggerProps}
      />
      <PopoverListBox
        isOpen={state.isOpen}
        onClose={state.close}
        listBoxState={state}
        listBoxProps={menuProps}
        dropdownHeaderFixed={dropdownHeaderFixed}
        dropdownFooterFixed={dropdownFooterFixed}
        width={width}
        placement={placement}
        floating={floating}
      />
    </SelectInner>
  )
}

export {
  Select,
  SelectButton,
  SelectButtonInner,
  SelectInner,
  setNextFocusedKey,
}
