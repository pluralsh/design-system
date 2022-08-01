import {
  Children,
  ReactElement,
  cloneElement,
  useMemo,
  useRef,
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

import { ListBoxItemBaseProps } from './ListBoxItem'

type ListBoxProps = {
  onSelectionChange: (key: string) => unknown
  selectedKey: string
  children: ReactElement<ListBoxItemBaseProps> | ReactElement<ListBoxItemBaseProps>[]
}

const ListBoxCard = styled(Card)`
  padding-top: var(--space-xxxsmall);
  padding-bottom: var(--space-xxxsmall);
  overflow-y: auto;
  overflow-x: visible;
`

function ListBox({
  children,
  selectedKey,
  onSelectionChange,
  ...props
}: ListBoxProps) {
  // Create state based on the incoming props
  const selected = useMemo(() => new Set(selectedKey ? [`.$${selectedKey}`] : null),
    [selectedKey])

  console.log('selected keyz', selectedKey, selected)

  console.log('selected', selected)
  const listStateProps: AriaListBoxProps<string> = {
    // filter: () => true,
    // items:
    selectionMode: 'single',
    selectedKeys: selected,
    onSelectionChange: selection => {
      const [newKey] = selection

      onSelectionChange(typeof newKey === 'string' ? newKey.substring(2) : '')
    },
    children: Children.map(children, (child, index) => (
      <Item
        key={child.key || index}
        textValue={child?.props?.label}
      >
        {child}
      </Item>
    )),
  }

  const state = useListState(listStateProps as any)
  // Get props for the listbox element
  const ref = useRef()
  const { listBoxProps } = useListBox(props, state, ref)

  return (
    <ListBoxCard
      ref={ref}
      {...listBoxProps}
      {...props}
    >
      {[...state.collection].map(item => {
        console.log('item.keyz', item.key)

        return (
          <Option
            key={item.key}
            item={item}
            state={state}
          />
        )
      })}
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

  console.log('isSelected', isSelected, item.key)
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
