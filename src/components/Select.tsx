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
import { useTransition } from 'react-spring'

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
} & Omit<
    AriaSelectProps<object>,
    'autoFocus' | 'onLoadMore' | 'isLoading' | 'validationState' | 'placeholder'
  >

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
    ...buttonProps,
    style: { appearance: 'unset' },
    tabIndex: 0,
  })
}

export const SelectButtonInner = styled.div<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  ...theme.partials.reset.button,
  ...theme.partials.text.body2,
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
  '&:focus-visible': {
    ...theme.partials.focus.default,
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

const SelectInner = styled.div<{ isOpen: boolean }>(({ theme }) => ({
  position: 'relative',
  '.popoverWrapper': {
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    height: 9999,
  },
  '.zStacker': {
    position: 'absolute',
    width: '100%',
    zIndex: theme.zIndexes.selectPopover,
  },
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

  const transitions = useTransition(state.isOpen, {
    from: { opacity: 0, translateY: '-150px', zIndex: 99999 },
    enter: { opacity: 1, translateY: '0', zIndex: 99999 },
    leave: { opacity: 0, translateY: '-150px', zIndex: 99999 },
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

  return (
    <SelectInner isOpen={state.isOpen}>
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
      <div className="popoverWrapper">
        <div className="zStacker">
          {transitions((styles, item) => item && (
            <SelectPopover
              isOpen={state.isOpen}
              onClose={state.close}
              animatedStyles={styles}
            >
              <ListBoxUnmanaged
                className="listBox"
                state={state}
                topContent={dropdownTopContent}
                bottomContent={dropdownBottomContent}
                {...menuProps}
              />
            </SelectPopover>
          ))}
        </div>
      </div>
    </SelectInner>
  )
}

export { Select, SelectButton }
