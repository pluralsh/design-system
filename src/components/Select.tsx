import {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  RefObject,
  cloneElement,
  forwardRef,
  useRef,
} from 'react'
import { HiddenSelect, useSelect } from '@react-aria/select'
import { useSelectState } from '@react-stately/select'
import { AriaSelectProps } from '@react-types/select'
import { useButton } from '@react-aria/button'
import styled from 'styled-components'

import { ListBoxItemBaseProps } from './ListBoxItem'
import { ListBoxUnmanaged, useItemWrappedChildren } from './ListBox'
import { SelectPopover } from './SelectPopover'
import DropdownArrowIcon from './icons/DropdownArrowIcon'

type SelectButtonProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  children?: ReactNode
  showArrow?: boolean
  isOpen?: boolean
}

type SelectProps = Exclude<SelectButtonProps, 'children'> & {
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
  dropdownTopContent?: ReactNode
  dropdownBottomContent?: ReactNode
  triggerButton?: ReactElement
} & Exclude<AriaSelectProps<object>, 'autoFocus' | 'onLoadMore'>

function Trigger({
  buttonElt,
  ...props
}: {
  buttonRef: RefObject<HTMLElement>
  buttonElt: any
} & HTMLAttributes<HTMLElement>) {
  const ref = props.buttonRef
  const { buttonProps } = useButton(props, ref)

  return cloneElement(buttonElt, {
    ref,
    style: { appearance: 'unset' },
    tabIndex: 0,
    ...buttonProps,
  })
}

export const SelectButtonInner = styled.div<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  ...theme.partials.reset.button,
  ...theme.partials.text.body2,
  ...theme.partials.focus.default,
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 1,
  alignItems: 'center',
  width: '100%',
  padding: `9px ${theme.spacing.medium}px`,
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
    ...(isOpen
      ? {
        transform: 'scaleY(-100%)',
      }
      : {}),
  },
}))

const SelectButton = forwardRef<
  HTMLDivElement,
  SelectButtonProps & HTMLAttributes<HTMLDivElement>
>(({
  leftContent, rightContent, children, showArrow = true, isOpen, ...props
},
ref) => (
  <SelectButtonInner
    isOpen={isOpen}
    ref={ref}
    {...props}
  >
    <div className="leftContent">{leftContent}</div>
    <div className="children">{children}</div>
    <div className="rightContent">{rightContent}</div>
    {showArrow && (
      <div className="arrow">
        <DropdownArrowIcon size={16} />
      </div>
    )}
  </SelectButtonInner>
))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectInner = styled.div(_p => ({
  position: 'relative',
}))

function Select({
  children,
  selectedKey,
  onSelectionChange,
  onOpenChange,
  leftContent,
  rightContent,
  dropdownTopContent,
  dropdownBottomContent,
  label,
  name,
  triggerButton,
  ...props
}: SelectProps) {
  const selectStateProps: AriaSelectProps<object> = {
    onOpenChange,
    defaultOpen: false,
    selectedKey,
    onSelectionChange,
    label,
    children: useItemWrappedChildren(children),
    ...props,
  }

  const state = useSelectState(selectStateProps)

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
    >
      {state.selectedItem?.props?.children?.props?.label || label}
    </SelectButton>
  )

  return (
    <SelectInner>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={label}
        name={name}
      />
      <Trigger
        buttonRef={ref}
        buttonElt={triggerButton}
        {...triggerProps}
      />
      {state.isOpen && (
        <SelectPopover
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ListBoxUnmanaged
            className="listBox"
            state={state}
            topContent={dropdownTopContent}
            bottomContent={dropdownBottomContent}
            {...menuProps}
          />
        </SelectPopover>
      )}
    </SelectInner>
  )
}

export { Select }
