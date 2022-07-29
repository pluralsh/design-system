import {
  Children,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { useListBox, useOption } from '@react-aria/listbox'
import { useListState } from '@react-stately/list'
import { Item } from '@react-stately/collections'
import { useFocusRing } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'
import { ItemProps, Node } from '@react-types/shared'
import { AriaListBoxProps } from '@react-types/listbox'
import { mergeRefs } from 'react-merge-refs'

import styled, { CSSObject, css } from 'styled-components'

import { Card, mixins } from '../index'

type ListItemProps = PropsWithChildren<
  {
    isFocusVisible?: boolean
    selected?: boolean
    disabled?: boolean
    label?: string
  } & HTMLAttributes<HTMLDivElement> &
    ItemProps<void>
>

type ListItemBasicProps = {
  leftItem?: ReactNode
  rightItem?: ReactNode
} & ListItemProps

const ListItemBasicInner = styled.div<Partial<ListItemProps>>(({
  theme, isFocusVisible, disabled, selected,
}) => {
  const focusStyle: CSSObject = isFocusVisible
    ? {
      '&:focus::after, &:focus-visible::after': {
        content: '""',
        position: 'absolute',
        top: `${theme.borderWidths.focus}px`,
        left: `${theme.borderWidths.focus}px`,
        right: `${theme.borderWidths.focus}px`,
        bottom: `${theme.borderWidths.focus}px`,
        boxShadow: theme.boxShadows.focused,
      },
    }
    : {}

  return {
    ...theme.partials.text.body2,
    position: 'relative',
    width: '100%',
    borderBottom: 'var(--border-fill-one)',
    color: disabled
      ? 'var(--color-text-primary-disabled)'
      : 'var(--color-text)',
    padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
    backgroundColor: selected ? 'var(--color-fill-two-selected)' : 'none',
    cursor: 'pointer',
    zIndex: 0,
    '&:hover': {
      backgroundColor: !disabled ? 'var(--color-fill-two-hover)' : 'none',
    },
    '&:focus, &:focus-visible': {
      outline: 'none',
      zIndex: 100,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
    ...focusStyle,
  }
})

const ListItemBasic = forwardRef<HTMLDivElement, ListItemBasicProps>(({ isFocusVisible = false, children, ...props }, ref) => (
  <ListItemBasicInner
    ref={ref}
    isFocusVisible={isFocusVisible}
    {...props}
  >
    {children}
  </ListItemBasicInner>
))

type ListBoxProps = {
  onSelectionChange: (selection: unknown) => unknown
}

const ListBoxCard = styled(Card)`
  padding-top: var(--space-xxxsmall);
  padding-bottom: var(--space-xxxsmall);
  overflow-y: auto;
  overflow-x: visible;
`

function ListBox({ children, onSelectionChange, ...props }: any) {
  // Create state based on the incoming props
  const [selected, setSelected] = useState(new Set(['Pizza']))

  console.log('selected', selected)
  const listStateProps: AriaListBoxProps<string> = {
    // filter: () => true,
    // items:
    selectionMode: 'single',
    selectedKeys: selected,
    onSelectionChange: setSelected as any,
    children: Children.map(children, (child, index) => {
      console.log('child', child)

      return (
        <Item
          key={child.key || index}
          textValue={child.props.label}
        >
          {child}
        </Item>
      )
    }),
  }

  const state = useListState(listStateProps as any)
  // Get props for the listbox element
  const ref = useRef()
  const { listBoxProps, labelProps } = useListBox(props, state, ref)

  return (
    <ListBoxCard
      ref={ref}
      {...listBoxProps}
      {...props}
    >
      {[...state.collection].map(item => (
        <Option
          key={item.key}
          item={item}
          state={state}
        />
      ))}
    </ListBoxCard>
  )
}

function Option({ item, state }: any) {
  // Get props for the option element
  const ref = useRef()
  const {
    optionProps, isSelected, isDisabled, labelProps, descriptionProps,
  }
    = useOption({ key: item.key }, state, ref)

  console.log('isSelected', isSelected)
  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps } = useFocusRing()
  const mergedProps = mergeProps(optionProps, focusProps, {
    selected: isSelected,
    disabled: isDisabled,
    isFocusVisible,
    onClick: () => console.log('clicked'),
    ref: mergeRefs([ref, item.rendered.ref]),
  })

  console.log('mergedProps', mergedProps)

  return cloneElement(item.rendered, mergedProps)
}

export { ListItemBasic, ListBox }
