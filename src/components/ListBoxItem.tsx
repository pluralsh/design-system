import {
  HTMLAttributes, ReactElement, ReactNode, forwardRef,
} from 'react'
import { ItemProps } from '@react-types/shared'
import styled from 'styled-components'

import Tooltip from './Tooltip'
import StatusOkIcon from './icons/StatusOkIcon'
import Chip from './Chip'

type ListBoxItemBaseProps = {
  isFocusVisible?: boolean
  selected?: boolean
  disabled?: boolean
  label?: ReactNode
  description?: ReactNode
  key?: string
  labelProps?: HTMLAttributes<HTMLElement>
  descriptionProps?: HTMLAttributes<HTMLElement>
} & HTMLAttributes<HTMLDivElement> &
  Omit<ItemProps<void>, 'children'>

type ListBoxItemProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
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
  '&:hover': {
    backgroundColor: !disabled ? 'var(--color-fill-two-hover)' : 'none',
  },
  '&:focus, &:focus-visible': {
    outline: 'none',
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
  '.label': {
    ...theme.partials.text.body2,
    color: disabled
      ? 'var(--color-text-primary-disabled)'
      : 'var(--color-text)',
  },
  '.description': {
    ...theme.partials.text.caption,
    color: theme.colors['text-xlight'],
  },
  '.selected-indicator': {
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
      backgroundColor: theme.colors.text,
      borderRadius: '50%',
    },
  },
}))

const ListBoxItem = forwardRef<HTMLDivElement, ListBoxItemProps>(({
  isFocusVisible = false,
  selected,
  label,
  labelProps = {},
  description,
  descriptionProps = {},
  leftContent,
  rightContent,
  ...props
},
ref) => (
  <ListBoxItemInner
    ref={ref}
    isFocusVisible={isFocusVisible}
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
    {selected && (
      <StatusOkIcon
        className="selected-indicator"
        size={16}
      />
    )}
  </ListBoxItemInner>
))

const ChipListInner = styled.div(({ theme }) => ({
  display: 'flex',
  flexDiretion: 'row',
  gap: theme.spacing.xxsmall,
  '.tooltip': {
    ...theme.partials.text.caption,
  },
}))
const ChipList = forwardRef<HTMLDivElement, { chips: ReactElement[] }>(({ chips }) => {
  console.log('stuff')
  const firstChips = chips.slice(0, 3)
  const restChips = chips.slice(3)

  console.log('restChips', restChips)
  const extra = restChips.length > 0 && (
    <Tooltip
      placement="top"
      label={<>{restChips.map(n => <div className="tooltip">{n?.props?.children}<br /></div>)}</>}
    >
      <Chip
        size="small"
        hue="lighter"
      >{`+${restChips.length}`}
      </Chip>
    </Tooltip>
  )

  return <ChipListInner>{[...firstChips, extra]}</ChipListInner>
})

export { ListBoxItem, ListBoxItemBaseProps, ChipList as ListBoxItemChipList }
