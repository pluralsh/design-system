import { HTMLAttributes, ReactNode, forwardRef } from 'react'
import { ItemProps } from '@react-types/shared'
import styled, { CSSObject } from 'styled-components'

import StatusOkIcon from './icons/StatusOkIcon'

type ListBoxItemBaseProps = {
  isFocusVisible?: boolean
  selected?: boolean
  disabled?: boolean
  label?: string
  heading?: ReactNode
  key?: string
} & HTMLAttributes<HTMLDivElement> &
  Omit<ItemProps<void>, 'children'>

type ListBoxItemProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  subHeading?: ReactNode
} & ListBoxItemBaseProps

const ListBoxItemInner = styled.div<Partial<ListBoxItemProps>>(({
  theme, isFocusVisible, disabled, selected,
}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  borderBottom: 'var(--border-fill-one)',

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
  ...(isFocusVisible
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
    : {}),
  '.left-content': {
    marginRight: theme.spacing.small,
  },
  '.right-content, .selected-indicator': {
    marginLeft: theme.spacing.xsmall,
    color: theme.colors['action-primary'],
  },
  '.center-content': {
    flexGrow: 1,
  },
  '.heading': {
    ...theme.partials.text.body2,
    color: disabled
      ? 'var(--color-text-primary-disabled)'
      : 'var(--color-text)',
  },
  '.sub-heading': {
    ...theme.partials.text.caption,
    color: theme.colors['text-xlight'],
  },
  '.selected-indicator': {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '2px',
      right: '2px',
      left: '2px',
      bottom: '2px',
      backgroundColor: theme.colors.text,
      borderRadius: '50%',
      zIndex: -1,
    },
  },
}))

const ListBoxItem = forwardRef<HTMLDivElement, ListBoxItemProps>(({
  isFocusVisible = false,
  selected,
  subHeading,
  leftContent,
  rightContent,
  heading,
  ...props
},
ref) => {
  console.log('')

  return (
    <ListBoxItemInner
      ref={ref}
      isFocusVisible={isFocusVisible}
      selected={selected}
      {...props}
    >
      {leftContent && <div className="left-content">{leftContent}</div>}
      <div className="center-content">
        {heading && <div className="heading">{heading}</div>}
        {subHeading && <div className="sub-heading">{subHeading}</div>}
      </div>
      {rightContent && <div className="right-content">{rightContent}</div>}
      {selected && (
        <StatusOkIcon
          className="selected-indicator"
          size={16}
        />
      )}
    </ListBoxItemInner>
  )
})

const ChipListInner = styled.div(({ theme }) => ({}))
const ChipList = forwardRef<HTMLDivElement, any>(() => {
  console.log('stuff')

  return <ChipListInner />
})

export { ListBoxItem, ListBoxItemBaseProps, ChipList as ListBoxItemChipList }
