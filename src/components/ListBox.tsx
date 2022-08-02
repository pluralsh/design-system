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

import styled, { CSSObject, useTheme } from 'styled-components'

import { Card } from '../index'

import { ListBoxItemBaseProps } from './ListBoxItem'

type ListBoxProps = {
  selectedKey: string
  onSelectionChange: (key: string) => unknown
  disallowEmptySelection?: boolean
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
  topContent?: ReactNode
  bottomContent?: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListBoxCard = styled(Card).attrs(() => ({ cornerSize: 'medium' }))(_p => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 1,
  overflowX: 'visible',
  overflowY: 'hidden',
}))

type ScrollContainerProps = {
  hue?: 'default' | 'lighter'
  extendStyle?: CSSObject
}
const ScrollContainer = styled.div<ScrollContainerProps>(({ theme, hue = 'default', extendStyle }) => {
  const trackColor
      = hue === 'lighter' ? theme.colors['fill-two'] : theme.colors['fill-two']
  const barColor
      = hue === 'lighter'
        ? theme.colors['text-xlight']
        : theme.colors['fill-three']
  const barWidth = 6
  const barRadius = barWidth / 2

  return {
    overflow: 'auto',
    flexShrink: 1,
    flexGrow: 1,
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar-track': {
      backgroundColor: trackColor,
    },
    '&::-webkit-scrollbar': {
      width: `${barWidth}px`,
      height: `${barWidth}px`,
      borderRadius: `${barRadius}px`,
      backgroundColor: trackColor,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: `${barRadius}px`,
      backgroundColor: barColor,
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    ...extendStyle,
  }
})

function ListBox({
  children,
  selectedKey,
  onSelectionChange,
  disallowEmptySelection = true,
  topContent,
  bottomContent,
  ...props
}: ListBoxProps) {
  const theme = useTheme()
  const selected = useMemo(() => new Set(selectedKey ? [selectedKey] : null),
    [selectedKey])
  const wrappedChildren = useMemo(() => {
    const wrappedChildren: JSX.Element[] = []

    Children.forEach(children, child => {
      wrappedChildren.push(<Item key={child.key}>{child}</Item>)
    })

    return wrappedChildren
  }, [children])

  const listStateProps: AriaListBoxProps<string> = {
    // filter: () => true,
    disallowEmptySelection,
    selectionMode: 'single',
    selectedKeys: selected,
    onSelectionChange: selection => {
      const [newKey] = selection

      onSelectionChange(typeof newKey === 'string' ? newKey : '')
    },
    children: wrappedChildren,
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

export { ListBox }
