import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useMemo,
} from 'react'
import { ItemProps } from '@react-types/shared'
import styled from 'styled-components'

import theme from 'honorable-theme-default'

import Tooltip from './Tooltip'
import StatusOkIcon from './icons/StatusOkIcon'
import Chip from './Chip'
import PlusIcon from './icons/PlusIcon'

type ListBoxItemBaseProps = {
  isFocusVisible?: boolean
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
} & ListBoxItemBaseProps

const ListBoxItemInner = styled.div<Partial<ListBoxItemProps>>(({
  theme, isFocusVisible, disabled, selected,
}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  width: 'auto',
  borderBottom: theme.borders['fill-two'],

  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  backgroundColor: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: !disabled ? theme.colors['fill-two-hover'] : 'none',
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
        ...theme.partials.focus.insetAbsolute,
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
      ? theme.colors['text-primary-disabled']
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
  reserveSelectedIndicatorSpace,
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
    {(selected || reserveSelectedIndicatorSpace) && (
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
  const chipHue = 'lightest'

  if (!Array.isArray(chips)) {
    chips = []
  }

  const firstChips = useMemo(() => chips
    .slice(0, 3)
    .filter(chip => !!chip)
    .map((chip, i) => cloneElement(chip, { hue: chipHue, key: i })),
  [chips])
  const restChips = useMemo(() => chips.slice(3), [chips])

  const extra = useMemo(() => restChips.length > 0 && (
    <Tooltip
      placement="top"
      label={(
        <>
          {restChips.map((n, i) => (
            <div
              key={i}
              className="tooltip"
            >
              {n?.props?.children}
              <br />
            </div>
          ))}
        </>
      )}
    >
      <Chip
        size="small"
        hue={chipHue}
      >
        {`+${restChips.length}`}
      </Chip>
    </Tooltip>
  ),
  [restChips])

  return <ChipListInner>{[...firstChips, extra]}</ChipListInner>
})

type ListBoxFooterProps = ComponentPropsWithRef<'button'> & {
  children: ReactNode
  leftContent?: ReactNode
  rightContent?: ReactNode
}
const ListBoxFooterInner = styled.button(({ theme }) => ({
  ...theme.partials.reset.button,
  display: 'flex',
  position: 'relative',
  width: '100%',
  padding: `${theme.spacing.small}px ${theme.spacing.medium}px`,
  '.children': {
    flexGrow: 1,
  },
  '.leftContent': {
    marginRight: theme.spacing.small,
  },
  '.rightContent': {
    marginLeft: theme.spacing.small,
  },
  '&:focus-visible::after': {
    ...theme.partials.focus.insetAbsolute,
  },
}))
const ListBoxFooter = forwardRef<HTMLButtonElement, ListBoxFooterProps>(({
  leftContent, rightContent, children, ...props
}, ref) => (
  <ListBoxFooterInner
    tabIndex={0}
    ref={ref}
    {...props}
  >
    {leftContent && <div className="leftContent">{leftContent}</div>}
    <div className="children">{children}</div>
    {rightContent && <div className="rightContent">{rightContent}</div>}
  </ListBoxFooterInner>
))

const ListBoxFooterAddInner = styled(ListBoxFooter)(({ theme }) => ({
  color: theme.colors['text-primary-accent'],
}))
const ListBoxFooterAdd = forwardRef<HTMLButtonElement, ListBoxFooterProps>(({ leftContent, children, ...props }) => (
  <ListBoxFooterAddInner
    leftContent={
      leftContent || (
        <PlusIcon
          size={16}
          color={theme.colors['text-primary-accent']}
        >
          {children || 'Add'}
        </PlusIcon>
      )
    }
    {...props}
  >
    {children}
  </ListBoxFooterAddInner>
))

export {
  ListBoxItem,
  ListBoxItemBaseProps,
  ChipList as ListBoxItemChipList,
  ListBoxFooter,
  ListBoxFooterProps,
  ListBoxFooterAdd,
  ListBoxFooterProps as ListBoxFooterAddProps,
}
