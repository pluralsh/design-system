import {
  HTMLAttributes, PropsWithChildren, ReactNode, forwardRef,
} from 'react'
import { ItemProps } from '@react-types/shared'
import styled, { CSSObject } from 'styled-components'

type ListBoxItemBaseProps = PropsWithChildren<
  {
    isFocusVisible?: boolean
    selected?: boolean
    disabled?: boolean
    label?: string
    heading?: ReactNode

  } & HTMLAttributes<HTMLDivElement> &
    ItemProps<void>
>

type ListBoxItemProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
} & ListBoxItemBaseProps

const ListBoxItemInner = styled.div<Partial<ListBoxItemBaseProps>>(({
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

const ListBoxItem = forwardRef<HTMLDivElement, ListBoxItemProps>(({ isFocusVisible = false, children, ...props }, ref) => (
  <ListBoxItemInner
    ref={ref}
    isFocusVisible={isFocusVisible}
    {...props}
  >
    {children}
  </ListBoxItemInner>
))

export { ListBoxItem }
