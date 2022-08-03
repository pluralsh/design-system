import {
  Children,
  cloneElement,
  useRef,
  useState,
} from 'react'
import { useListBox, useOption } from '@react-aria/listbox'
import { useListState } from '@react-stately/list'
import { Item } from '@react-stately/collections'
import { useFocusRing } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'
import { AriaListBoxProps } from '@react-types/listbox'
import { mergeRefs } from 'react-merge-refs'

import styled from 'styled-components'

import { Card } from '../index'

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

export { ListBox }
