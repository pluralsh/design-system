import {
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react'
import { type ItemProps } from '@react-types/shared'
import styled from 'styled-components'

import theme from 'honorable-theme-default'

import StatusOkIcon from './icons/StatusOkIcon'
import PlusIcon from './icons/PlusIcon'
import ChipList from './ListBoxItemChipList'

type ListBoxItemBaseProps = {
  focused?: boolean
  selected?: boolean
  disabled?: boolean
  label?: ReactNode
  description?: ReactNode
  key?: string
  labelProps?: ComponentPropsWithoutRef<ElementType>
  descriptionProps?: ComponentPropsWithoutRef<ElementType>
} & ComponentPropsWithRef<'div'> &
  Omit<ItemProps<void>, 'children'>

type ListBoxItemProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  reserveSelectedIndicatorSpace?: boolean
  destructive?: boolean
} & ListBoxItemBaseProps

const ListBoxItemInner = styled.div<Partial<ListBoxItemProps>>(
  ({ theme, disabled, selected, focused, destructive }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: 'auto',
    borderBottom:
      theme.mode === 'light'
        ? theme.borders.default
        : theme.borders['fill-two'],
    padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
    backgroundColor: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: !disabled
        ? theme.mode === 'light'
          ? theme.colors['fill-one-hover']
          : theme.colors['fill-two-hover']
        : 'none',
    },
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:focus-visible::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      ...theme.partials.focus.outline,
    },
    ...(focused ? { '&': { ...theme.partials.focus.outline } } : {}),
    '.left-content': {
      marginRight: theme.spacing.small,
    },
    '.right-content, .selected-indicator': {
      marginLeft: theme.spacing.xsmall,
      color: theme.colors['action-primary'],
    },
    '.center-content': {
      flexGrow: 1,
      width: 'max-content',
    },
    '.label': {
      ...theme.partials.text.body2,
      color: disabled
        ? theme.colors['text-primary-disabled']
        : destructive
        ? theme.colors['text-danger-light']
        : theme.colors.text,
    },
    '.description': {
      ...theme.partials.text.caption,
      color: theme.colors['text-xlight'],
    },
    '.selected-indicator': {
      opacity: selected ? 1 : 0,
      position: 'relative',
      '& svg': {
        zIndex: 0,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '2px',
        right: '2px',
        left: '2px',
        bottom: '2px',
        backgroundColor: theme.colors['text-always-white'],
        borderRadius: '50%',
      },
    },
  })
)

function ListBoxItem({
  ref,
  selected,
  label,
  labelProps = {},
  description,
  descriptionProps = {},
  leftContent,
  rightContent,
  reserveSelectedIndicatorSpace,
  ...props
}: ListBoxItemProps) {
  return (
    <ListBoxItemInner
      ref={ref}
      selected={selected}
      {...props}
    >
      {leftContent && <div className="left-content">{leftContent}</div>}
      <div className="center-content">
        {label && (
          <div
            className="label"
            {...labelProps}
          >
            {label}
          </div>
        )}
        {description && (
          <div
            className="description"
            {...descriptionProps}
          >
            {description}
          </div>
        )}
      </div>
      {rightContent && <div className="right-content">{rightContent}</div>}
      {(selected || reserveSelectedIndicatorSpace) && (
        <StatusOkIcon
          className="selected-indicator"
          size={16}
        />
      )}
    </ListBoxItemInner>
  )
}

type ListBoxFooterProps = ComponentPropsWithRef<typeof ListBoxFooterInner> & {
  children: ReactNode
  leftContent?: ReactNode
  rightContent?: ReactNode
}
const ListBoxFooterInner = styled.button<{ $focused?: boolean }>(
  ({ theme, $focused: focused = false }) => ({
    ...theme.partials.reset.button,
    display: 'flex',
    position: 'relative',
    width: '100%',
    padding: `${theme.spacing.small}px ${theme.spacing.medium}px`,
    '&:hover': {
      backgroundColor:
        theme.mode === 'light'
          ? theme.colors['fill-one-hover']
          : theme.colors['fill-two-hover'],
    },
    '.children': {
      flexGrow: 1,
    },
    '.leftContent': {
      marginRight: theme.spacing.small,
    },
    '.rightContent': {
      marginLeft: theme.spacing.small,
    },
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible::after': {
      ...theme.partials.focus.insetAbsolute,
    },
    ...(focused
      ? {
          '&::after': { ...theme.partials.focus.insetAbsolute },
        }
      : {}),
  })
)

function ListBoxFooter({
  ref,
  leftContent,
  rightContent,
  children,
  ...props
}: ListBoxFooterProps) {
  return (
    <ListBoxFooterInner
      tabIndex={0}
      ref={ref}
      {...props}
    >
      {leftContent && <div className="leftContent">{leftContent}</div>}
      <div className="children">{children}</div>
      {rightContent && <div className="rightContent">{rightContent}</div>}
    </ListBoxFooterInner>
  )
}

const ListBoxFooterPlusInner = styled(ListBoxFooter)(({ theme }) => ({
  color: theme.colors['text-primary-accent'],
}))

function ListBoxFooterPlus({
  ref,
  leftContent,
  children,
  ...props
}: ListBoxFooterProps) {
  return (
    <ListBoxFooterPlusInner
      ref={ref}
      leftContent={
        leftContent || (
          <PlusIcon
            size={16}
            color={theme.colors['text-primary-accent'] as string}
          >
            {children || 'Add'}
          </PlusIcon>
        )
      }
      {...props}
    >
      {children}
    </ListBoxFooterPlusInner>
  )
}

export type {
  ListBoxItemBaseProps,
  ListBoxItemProps,
  ListBoxFooterProps,
  ListBoxFooterProps as ListBoxFooterPlusProps,
}
export {
  ListBoxItem,
  ChipList as ListBoxItemChipList,
  ListBoxFooter,
  ListBoxFooterPlus,
}
