import {
  Children,
  ReactElement,
  ReactNode,
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

import styled, { CSSProperties } from 'styled-components'

import { Card } from '../index'

import { ListBoxItemBaseProps } from './ListBoxItem'

type ListBoxProps = {
  selectedKey: string
  onSelectionChange: (key: string) => unknown
  disallowEmptySelection: boolean
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
  topContent?: ReactNode
  bottomContent?: ReactNode
}

const ListBoxCard = styled(Card)`
  ${({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    overflowX: 'visible',
    overflowY: 'hidden',
  })}
`

const ScrollContainer = styled.div<{ hue?: 'default' | 'lighter' }>(({ theme, hue = 'default' }) => ({
  overflowX: 'hidden',
  overflowY: 'auto',
  flexShrink: 1,
  flexGrow: 1,
  paddingTop: theme.spacing.xxxsmall,
  paddingBottom: theme.spacing.xxxsmall,

    // ...props,
}))

function ListBox({
  children,
  selectedKey,
  onSelectionChange,
  disallowEmptySelection = true,
  topContent,
  bottomContent,
  ...props
}: ListBoxProps) {
  // Create state based on the incoming props
  const selected = useMemo(() => new Set(selectedKey ? [`.$${selectedKey}`] : null),
    [selectedKey])

  const listStateProps: AriaListBoxProps<string> = {
    // filter: () => true,
    // items:
    disallowEmptySelection,
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
    <ListBoxCard {...props}>
      {topContent && <div className="top-content">{topContent}</div>}
      <ScrollContainer
        ref={ref}
        {...listBoxProps}
      >
        {[...state.collection].map(item => (
          <Option
            key={item.key}
            item={item}
            state={state}
          />
        ))}
      </ScrollContainer>
      {bottomContent && <div>{bottomContent}</div>}
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

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps } = useFocusRing()
  const mergedProps = mergeProps(optionProps, focusProps, {
    selected: isSelected,
    disabled: isDisabled,
    isFocusVisible,
    ref: mergeRefs([ref, item.rendered.ref]),
  })

  return cloneElement(item.rendered, mergedProps)
}

export { ListBox }
