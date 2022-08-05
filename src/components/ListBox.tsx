import {
  Children,
  ComponentPropsWithRef,
  ElementType,
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
  header?: ReactNode
  footer?: ReactNode
  headerFixed?: ReactNode
  footerFixed?: ReactNode
  extendStyle?: CSSObject
} & ComponentPropsWithRef<ElementType>

type ListBoxProps = Omit<ListBoxUnmanagedProps, 'state'> & {
  selectedKey: string
  onSelectionChange: (key: string) => unknown
  disallowEmptySelection?: boolean
  children:
    | ReactElement<ListBoxItemBaseProps>
    | ReactElement<ListBoxItemBaseProps>[]
}

const ListBoxCard = styled(Card).attrs(() => ({
  cornerSize: 'medium',
  hue: 'lighter',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}))(_p => ({
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
const ScrollContainer = styled.div<ScrollContainerProps>(({ theme, extendStyle }) => ({
  ...theme.partials.scrollBar({ hue: 'lighter' }),
  position: 'relative',
  overflow: 'auto',
  flexShrink: 1,
  flexGrow: 1,
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible::after': {
    ...theme.partials.focus.insetAbsolute,
  },
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
  header,
  footer,
  headerFixed,
  footerFixed,
  extendStyle,
  className,
  ...props
}: ListBoxUnmanagedProps) {
  const theme = useTheme()

  // Get props for the listbox element
  const ref = useRef()
  const { listBoxProps } = useListBox(props, state, ref)

  return (
    <ListBoxCard
      className={`listBox ${className || ''}`}
      {...extendStyle}
      {...props}
    >
      {headerFixed && <div className="headerFixed">{headerFixed}</div>}
      <ScrollContainer
        ref={ref}
        hue="lighter"
        extendStyle={{
          paddingTop: headerFixed ? 0 : theme.spacing.xxxsmall,
          paddingBottom: footerFixed ? 0 : theme.spacing.xxxsmall,
        }}
        {...listBoxProps}
      >
        {header && <div className="header">{header}</div>}
        {[...state.collection].map(item => (
          <Option
            key={item.key}
            item={item}
            state={state}
          />
        ))}
        {footer && <div className="footer">{footer}</div>}
      </ScrollContainer>
      {footerFixed && <div className="footerFixed">{footerFixed}</div>}
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
