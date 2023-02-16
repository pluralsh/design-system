import { ListState } from '@react-stately/list'
import { AriaListBoxOptions } from '@react-aria/listbox'
import styled, { useTheme } from 'styled-components'
import { animated, useTransition } from 'react-spring'

import { FloatingPortal, Placement, UseFloatingReturn } from '@floating-ui/react-dom-interactions'

import { ListBoxUnmanaged, ListBoxUnmanagedProps } from './ListBox'
import { Popover, PopoverProps } from './ReactAriaPopover'
import { SelectProps } from './Select'
import WrapWithIf from './WrapWithIf'

type PopoverListBoxProps = {
  isOpen: boolean
  onClose: () => void
  listBoxState: ListState<object>
  listBoxProps: AriaListBoxOptions<object>
  floating: UseFloatingReturn<any>
} & Pick<PopoverProps, 'popoverRef'> &
  Pick<ListBoxUnmanagedProps, 'listBoxRef'> &
  Pick<
    SelectProps,
    'width' | 'placement' | 'dropdownHeaderFixed' | 'dropdownFooterFixed'
  >

export const PopoverWrapper = styled.div<{
  $isOpen: boolean
  $placement: Placement
}>(({ theme, $placement: placement }) => ({
  position: 'absolute',
  display: 'flex',
  width: '100%',
  ...(placement === 'right' && { right: 0, left: 'auto' }),
  pointerEvents: 'none',
  zIndex: theme.zIndexes.selectPopover,
  clipPath: `polygon(-100px ${-theme.spacing.xxsmall}px, -100px 99999px, 99999px 99999px, 99999px ${-theme.spacing.xxsmall}px)`,
  '&.enter-done': {
    clipPath: 'none',
  },
}))

const Animated = styled(animated.div)(({ theme }) => ({
  width: '100%',
  maxHeight: '100%',
}))

function PopoverListBox({
  isOpen,
  onClose,
  listBoxState,
  listBoxProps,
  listBoxRef,
  popoverRef,
  dropdownHeaderFixed,
  dropdownFooterFixed,
  placement,
  floating,
}: PopoverListBoxProps) {
  const theme = useTheme()
  const transitions = useTransition(isOpen ? [true] : [], {
    from: { opacity: 0, translateY: '-150px' },
    enter: { opacity: 1, translateY: '0' },
    leave: { opacity: 0, translateY: '-150px' },
    config: isOpen
      ? {
        mass: 0.6,
        tension: 280,
        velocity: 0.02,
      }
      : {
        mass: 0.6,
        tension: 400,
        velocity: 0.02,
        restVelocity: 0.1,
      },
  })

  const portalProps = {}

  return transitions(styles => (
    <WrapWithIf
      condition
      wrapper={(
        <FloatingPortal
          id={theme.portals.default.id}
          {...portalProps}
        />
      )}
    >
      <PopoverWrapper
        $isOpen={isOpen}
        $placement={placement}
        className="popoverWrapper"
        ref={floating.floating}
        style={{
          position: floating.strategy,
          left: floating.x ?? 0,
          top: floating.y ?? 0,
        }}
      >
        <Animated
          data-padded-box
          style={{ ...styles }}
        >
          <Popover
            popoverRef={popoverRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ListBoxUnmanaged
              className="listBox"
              state={listBoxState}
              headerFixed={dropdownHeaderFixed}
              footerFixed={dropdownFooterFixed}
              extendStyle={{
                boxShadow: theme.boxShadows.moderate,
              }}
              listBoxRef={listBoxRef}
              {...listBoxProps}
            />
          </Popover>
        </Animated>
      </PopoverWrapper>
    </WrapWithIf>
  ))
}

export type { PopoverListBoxProps }
export { PopoverListBox }
