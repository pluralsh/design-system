import {
  Children,
  HTMLAttributes,
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

import styled, { CSSObject, useTheme } from 'styled-components'

import { Card } from '../index'

import { ListBoxItemBaseProps } from './ListBoxItem'

type ListBoxUnmanagedProps = {
  state: any
  topContent?: ReactNode
  bottomContent?: ReactNode
} & HTMLAttributes<HTMLElement>

type ListBoxProps = Omit<ListBoxUnmanagedProps, 'state'> & {
  selectedKey: string
  onSelectionChange: (key: string) => unknown
  disallowEmptySelection?: boolean
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListBoxCard = styled(Card).attrs(() => ({ cornerSize: 'medium' }))(_p => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 1,
  overflowX: 'visible',
  overflowY: 'hidden',
  '&:focus, &:focus-visible': {
    outline: '1px solid red',
  },
}))

type ScrollContainerProps = {
  hue?: 'default' | 'lighter',
  extendStyle?: CSSObject,
}
const ScrollContainer = styled.div<ScrollContainerProps>(({ theme, extendStyle }) => ({
  ...theme.partials.scrollBar({ hue: 'lighter' }),
  overflow: 'auto',
  flexShrink: 1,
  flexGrow: 1,
  ...extendStyle,
}))

function useItemWrappedChildren(children: React.ReactElement<unknown> | React.ReactElement<unknown>[]) {
  return useMemo(() => {
    // Children.map() prefixes the key props in an undocumented and possibly
    // unstable way, so using Children.forEach() to maintain original key values
    const wrapped: JSX.Element[] = []

    Children.forEach(children, child => {
      wrapped.push(<Item key={child.key}>{child}</Item>)
    })

    return wrapped
  }, [children])
}

function ListBox({
  disallowEmptySelection,
  selectedKey,
  children,
  onSelectionChange,
  ...props
}: ListBoxProps) {
  const selected = useMemo(() => new Set(selectedKey ? [selectedKey] : null),
    [selectedKey])
  const listStateProps: AriaListBoxProps<string> = {
    // filter: () => true,
    disallowEmptySelection,
    selectionMode: 'single',
    selectedKeys: selected,
    onSelectionChange: selection => {
      const [newKey] = selection

      onSelectionChange(typeof newKey === 'string' ? newKey : '')
    },
    children: useItemWrappedChildren(children),
  }

  const state = useListState(listStateProps as any)

  return (
    <ListBoxUnmanaged
      state={state}
      {...props}
    />
  )
}

function ListBoxUnmanaged({
  state,
  topContent,
  bottomContent,
  ...props
}: ListBoxUnmanagedProps) {
  const theme = useTheme()

  // Get props for the listbox element
  const ref = useRef()

  console.log('ListBoxUnmanaged props', props)
  const { listBoxProps } = useListBox(props, state, ref)

  return (
    <ListBoxCard {...props}>
      {topContent && <div className="top-content">{topContent}</div>}
      <ScrollContainer
        ref={ref}
        hue="lighter"
        extendStyle={{
          paddingTop: topContent ? 0 : theme.spacing.xxxsmall,
          paddingBottom: bottomContent ? 0 : theme.spacing.xxxsmall,
        }}
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
    labelProps,
    descriptionProps,
    isFocusVisible,
    ref: mergeRefs([ref, item.rendered.ref]),
  })

  return cloneElement(item.rendered, mergedProps)
}

export {
  ListBox,
  ListBoxProps,
  ListBoxUnmanaged,
  ListBoxUnmanagedProps,
  useItemWrappedChildren,
}
