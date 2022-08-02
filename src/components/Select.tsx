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
import styled, { classNames, useTheme } from 'styled-components'

import { ListBoxItemBaseProps } from './ListBoxItem'
import { ListBoxUnmanaged, useItemWrappedChildren } from './ListBox'
import { SelectPopover } from './SelectPopover'
import DropdownArrowIcon from './icons/DropdownArrowIcon'

type SelectButtonProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  children?: ReactNode
  showArrow?: boolean
}

type SelectProps = Exclude<SelectButtonProps, 'children'> & {
  selectedKey: string
  onSelectionChange: (key: string) => unknown
  disallowEmptySelection?: boolean
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
  dropdownTopContent?: ReactNode
  dropdownBottomContent?: ReactNode
  label: string
  name: string
  formField?: any
  triggerButton?: ReactElement
}

function Trigger({
  buttonElt,
  ...props
}: {
  buttonRef: RefObject<HTMLElement>
  buttonElt: any
} & HTMLAttributes<HTMLElement>) {
  const ref = props.buttonRef
  const { buttonProps } = useButton(props, ref)

  console.log('ref.current', ref.current)

  return cloneElement(buttonElt, {
    ref,
    style: { '-webkit-appearance': 'unset' },
    tabindex: 0,
    ...buttonProps,
  })
}

const SelectButtonBase = forwardRef<
  HTMLDivElement,
  SelectButtonProps & HTMLAttributes<HTMLDivElement>
>(({
  leftContent, rightContent, children, showArrow = true, ...props
},
ref) => (
  <div
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
  </div>
))

export const SelectButton = styled(SelectButtonBase)(({ theme, isOpen }) => ({
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
  '.arrow': {
    transition: 'transform 0.1s ease',
    display: 'flex',
    // alignSelf: 'flex-end',
    alignItems: 'center',
    ...(isOpen ? {
      transform: 'scaleY(-100%)',
    } : {}),
  },

}))

function Select({
  children,
  selectedKey,
  onSelectionChange,
  dropdownTopContent: topContent,
  dropdownBottomContent: bottomContent,
  label,
  name,
  triggerButton,
  // formField,
  ...props
}: SelectProps) {
  const theme = useTheme()

  const selectStateProps: AriaSelectProps<object> = {
    // filter: () => true,
    // disallowEmptySelection,
    // selectionMode: 'single',
    onOpenChange: e => {
      console.log('open change', e)
    },
    defaultOpen: false,
    selectedKey,
    onSelectionChange,
    children: useItemWrappedChildren(children),
  }

  console.log('beforestate change', selectStateProps)
  const state = useSelectState(selectStateProps)

  console.log('state2 ', state)
  // Get props for the listbox element
  const ref = useRef()
  const {
    labelProps, triggerProps, valueProps, menuProps,
  } = useSelect(selectStateProps,
    state,
    ref)

  console.log('labelProps', labelProps)
  console.log('triggerProps', triggerProps)
  console.log('valueProps', valueProps)
  console.log('menuProps', menuProps)
  console.log('state', state)

  label = label || ' '
  triggerButton = triggerButton || (
    <SelectButton
      leftContent
      rightContent
      isOpen={state.isOpen}
    >
      {state.selectedItem?.props?.children?.props?.label || label}
    </SelectButton>
  )
  console.log('triggerButtn', triggerButton)

  console.log('klink render isOpen', state.isOpen)

  return (
    <div style={{ position: 'relative' }}>
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
      {true && state.isOpen && (
        <SelectPopover
          isOpen={state.isOpen}
          onClose={() => {
            console.log('onClose')
            state.close()
          }}
        >
          <ListBoxUnmanaged
            className="listBox"
            state={state}
            topContent={topContent}
            bottomContent={bottomContent}
            {...menuProps}
          />
        </SelectPopover>
      )}
    </div>
  )
}

export { Select }
