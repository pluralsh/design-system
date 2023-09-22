import {
  Children,
  type ComponentProps,
  type Ref,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'
import styled from 'styled-components'

type SidebarLayout = 'vertical' | 'horizontal'

type SidebarProps = { layout?: SidebarLayout } & ComponentProps<
  typeof SidebarSC
>

const SIDEBAR_WIDTH = 64
const SIDEBAR_HEIGHT = 56

const SidebarSC = styled.div<{ $isHorizontal: boolean }>(
  ({ theme, $isHorizontal }) => ({
    display: 'flex',
    flexDirection: $isHorizontal ? 'row' : 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    height: $isHorizontal ? SIDEBAR_HEIGHT : '100%',
    width: $isHorizontal ? '100%' : SIDEBAR_WIDTH,
    maxWidth: $isHorizontal ? '100%' : SIDEBAR_WIDTH,
    minWidth: $isHorizontal ? '100%' : SIDEBAR_WIDTH,
    backgroundColor: 'fill-zero',
    borderRight: $isHorizontal ? 'none' : theme.borders.default,
    borderBottom: $isHorizontal ? theme.borders.default : 'none',
    overflowY: 'hidden',
  })
)

function SidebarRef(
  { layout = 'vertical', children, ...props }: SidebarProps,
  ref: Ref<any>
) {
  const childrenWithProps = Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, { layout, ...(child as any).props })
      : child
  )

  return (
    <SidebarSC
      $isHorizontal={layout === 'horizontal'}
      ref={ref}
      {...props}
    >
      {childrenWithProps}
    </SidebarSC>
  )
}

const Sidebar = forwardRef(SidebarRef)

export default Sidebar
export type { SidebarLayout }
