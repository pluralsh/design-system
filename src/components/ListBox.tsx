import {
  Children,
  type ComponentPropsWithRef,
  type JSX,
  type ReactElement,
  type ReactNode,
  type RefObject,
  cloneElement,
  useMemo,
  useRef,
} from 'react'
import { type AriaListBoxOptions, useListBox, useOption } from 'react-aria'
import { type ListState, useListState } from 'react-stately'
import { mergeProps } from 'react-aria'
import { type AriaListBoxProps } from '@react-types/listbox'
import { mergeRefs } from 'react-merge-refs'
import styled, { type DefaultTheme, useTheme } from 'styled-components'

import { Item } from 'react-stately'

import { type Key } from '@react-types/shared'

import { type CSSObject } from '../types'

import Card from './Card'

export const HEADER_KEY = '$$header$$'
export const FOOTER_KEY = '$$footer$$'

type ListBoxUnmanagedProps = AriaListBoxOptions<object> &
  ComponentPropsWithRef<'div'> & {
    state: ListState<object>
    headerFixed?: ReactNode
    footerFixed?: ReactNode
    extendStyle?: CSSObject
    listBoxRef?: RefObject<any>
  }

type ListBoxProps = Omit<
  ListBoxUnmanagedProps,
  'state' | 'nextFocusedKeyRef' | 'onSelectionChange'
> & {
  selectedKey: Key
  onSelectionChange: (key: Key) => unknown
  onHeaderClick?: () => unknown
  onFooterClick?: () => unknown
  disallowEmptySelection?: boolean
  children: ReactElement<any> | ReactElement<any>[]
  header?: ReactElement<any>
  footer?: ReactElement<any>
}

function getCardFillLevel(theme: DefaultTheme) {
  return theme.mode === 'light' ? 1 : 2
}

const ListBoxCard = styled(Card).attrs(({ theme }) => ({
  cornerSize: 'medium',
  fillLevel: getCardFillLevel(theme),
}))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 1,
  overflowX: 'visible',
  overflowY: 'hidden',
  '.footerFixed': {
    borderTop:
      theme.mode === 'light'
        ? theme.borders['fill-one']
        : theme.borders['fill-two'],
  },
}))

type ScrollContainerProps = {
  extendStyle?: CSSObject
}
const ScrollContainer = styled.div<ScrollContainerProps>(
  ({ theme, extendStyle }) => ({
    ...theme.partials.scrollBar({ fillLevel: getCardFillLevel(theme) }),
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
  })
)

function propsToTextValue(props: Record<string, unknown> | null | undefined) {
  if (!props) {
    return ''
  }
  const { textValue, children, label } = props

  return typeof textValue === 'string' && textValue
    ? textValue
    : typeof label === 'string' && label
    ? label
    : typeof children === 'string' && children
    ? children
    : ''
}

function useItemWrappedChildren(
  children: ReactElement<any> | ReactElement<any>[],
  header?: ReactElement<any>,
  footer?: ReactElement<any>
) {
  return useMemo(() => {
    // Children.map() prefixes the key props in an undocumented and possibly
    // unstable way, so using Children.forEach() to maintain original key values
    const wrapped: JSX.Element[] = []

    if (header) {
      const { textValue: _, ...headerProps } = header.props

      wrapped.push(
        <Item
          textValue={propsToTextValue(header.props)}
          key={HEADER_KEY}
        >
          {cloneElement(header, headerProps)}
        </Item>
      )
    }
    Children.forEach(children, (child) => {
      if (!child) {
        return
      }

      const { textValue: _, ...passThruProps } = child.props || {}

      const item = (
        <Item
          key={child.key}
          textValue={propsToTextValue(child.props)}
        >
          {cloneElement(child, passThruProps)}
        </Item>
      )

      wrapped.push(item)
    })

    if (footer) {
      const { textValue: _, ...footerProps } = footer.props

      wrapped.push(
        <Item
          textValue={propsToTextValue(footer.props)}
          key={FOOTER_KEY}
        >
          {cloneElement(footer, footerProps)}
        </Item>
      )
    }

    return wrapped
  }, [children, header, footer])
}

function ListBox({
  disallowEmptySelection,
  selectedKey,
  children,
  header,
  footer,
  onSelectionChange,
  onHeaderClick,
  onFooterClick,
  ...props
}: ListBoxProps) {
  const nextFocusedKeyRef = useRef<Key>(null)
  const stateRef = useRef<ListState<object> | null>(null)
  const selected = useMemo(
    () => new Set(selectedKey ? [selectedKey] : null),
    [selectedKey]
  )
  const listStateProps: AriaListBoxProps<string> = {
    disallowEmptySelection,
    selectionMode: 'single',
    selectedKeys: selected,
    onSelectionChange: (selection) => {
      const [newKey] = selection

      if (newKey === HEADER_KEY && onHeaderClick) {
        onHeaderClick()
      } else if (newKey === FOOTER_KEY && onFooterClick) {
        onFooterClick()
        if (stateRef.current) {
          nextFocusedKeyRef.current =
            stateRef?.current?.collection?.getKeyBefore(FOOTER_KEY)
        }
      } else if (onSelectionChange) {
        onSelectionChange(newKey)
      }
    },
    children: useItemWrappedChildren(children, header, footer),
  }

  const state = useListState(listStateProps as any)

  stateRef.current = state

  if (nextFocusedKeyRef.current) {
    const focusedKey =
      state.collection.getKeyAfter(nextFocusedKeyRef.current) ||
      nextFocusedKeyRef.current

    state.selectionManager.setFocusedKey(focusedKey)
    nextFocusedKeyRef.current = null
  }

  return (
    <ListBoxUnmanaged
      state={state}
      {...props}
    />
  )
}

function ListBoxUnmanaged({
  state,
  headerFixed,
  footerFixed,
  extendStyle,
  className,
  listBoxRef,
  ...props
}: ListBoxUnmanagedProps) {
  const theme = useTheme()

  // Get props for the listbox element
  let ref = useRef(undefined)

  if (listBoxRef) {
    ref = listBoxRef
  }
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
        extendStyle={{
          paddingTop: headerFixed ? 0 : theme.spacing.xxxsmall,
          paddingBottom: footerFixed ? 0 : theme.spacing.xxxsmall,
        }}
        {...listBoxProps}
      >
        {[...state.collection].map((item) => (
          <Option
            key={item.key}
            item={item}
            state={state}
          />
        ))}
      </ScrollContainer>
      {footerFixed && <div className="footerFixed">{footerFixed}</div>}
    </ListBoxCard>
  )
}

function Option({ item, state }: any) {
  // Get props for the option element
  const ref = useRef(undefined)
  const {
    optionProps,
    isSelected,
    isDisabled,
    labelProps,
    descriptionProps,
    isFocused,
  } = useOption({ key: item.key }, state, ref)

  const mergedProps = mergeProps(optionProps, {
    selected: isSelected || item?.rendered?.props?.selected,
    disabled: isDisabled || item?.rendered?.props?.disabled,
    focused: isFocused,
    labelProps,
    descriptionProps,
    ref: mergeRefs([ref, item?.rendered?.props?.ref]),
  })

  return cloneElement(item.rendered, mergedProps)
}

export type { ListBoxProps, ListBoxUnmanagedProps }
export { ListBox, ListBoxUnmanaged, useItemWrappedChildren }
