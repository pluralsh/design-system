import { type ComponentProps, type Ref, forwardRef } from 'react'
import styled from 'styled-components'

import Tooltip from '../components/Tooltip'

import { type SidebarLayout } from './Sidebar'

type SidebarItemProps = ComponentProps<typeof ItemSC> & {
  clickable?: boolean
  tooltip?: string
  layout?: SidebarLayout
  active?: boolean
}

function SidebarItemRef(
  { children, clickable = false, tooltip = '', ...props }: SidebarItemProps,
  ref: Ref<any>
) {
  return (
    <WithTooltip tooltip={tooltip}>
      <Item
        clickable={clickable}
        ref={ref}
        {...props}
      >
        {children}
      </Item>
    </WithTooltip>
  )
}

function withTooltipRef(
  {
    layout = 'vertical',
    children,
    clickable,
    tooltip = '',
    ...props
  }: SidebarItemProps,
  ref: Ref<any>
) {
  if (!tooltip) return <> {children}</>

  return (
    <Tooltip
      arrow
      placement="right"
      label={tooltip}
      whiteSpace="nowrap"
    >
      <Item
        layout={layout}
        clickable={clickable}
        ref={ref}
        {...props}
      >
        {children}
      </Item>
    </Tooltip>
  )
}

const ItemSC = styled.div<{
  $clickable: boolean
  $active: boolean
  $isHorizontal: boolean
}>(({ theme, $clickable, $active, $isHorizontal }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: $isHorizontal ? undefined : 32,
  height: 32,
  flexGrow: 0,
  borderRadius: '3px',
  overflow: 'hidden',
  backgroundColor: $active
    ? theme.mode === 'light'
      ? theme.colors['fill-one-selected']
      : theme.colors['fill-zero-selected']
    : 'transparent',
  ...($clickable
    ? {
        cursor: 'pointer',
        ...(!$active
          ? {
              ':hover': {
                backgroundColor: theme.colors['fill-zero-hover'],
              },
            }
          : {}),
      }
    : {}),
}))

function ItemRef(
  {
    layout = 'vertical',
    children,
    clickable = false,
    active = false,
    ...props
  }: SidebarItemProps,
  ref: Ref<any>
) {
  const isHorizontal = layout === 'horizontal'

  return (
    <ItemSC
      $clickable={clickable}
      $active={active}
      $isHorizontal={isHorizontal}
      ref={ref}
      {...props}
    >
      {children}
    </ItemSC>
  )
}

const Item = forwardRef(ItemRef)
const WithTooltip = forwardRef(withTooltipRef)
const SidebarItem = forwardRef(SidebarItemRef)

export default SidebarItem
