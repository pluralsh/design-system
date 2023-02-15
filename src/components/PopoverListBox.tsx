import { ListState } from '@react-stately/list'
import { AriaListBoxOptions } from '@react-aria/listbox'
import { useTheme } from 'styled-components'
import { animated, useTransition } from 'react-spring'
import { mergeRefs } from 'react-merge-refs'

import { FloatingPortal, UseFloatingReturn } from '@floating-ui/react-dom-interactions'

import { RefObject, useMemo } from 'react'

import { ListBoxUnmanaged, ListBoxUnmanagedProps } from './ListBox'
import { Popover, PopoverProps } from './ReactAriaPopover'
import { PopoverWrapper, SelectProps } from './Select'
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

  // Preserve the consumer's ref
  const finalPopoverRef = useMemo(() => mergeRefs([floating.refs.floating, popoverRef]),
    [floating.refs.floating, popoverRef])

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
        style={{
          position: floating.strategy,
          left: floating.x ?? 0,
          top: floating.y ?? 0,
          width: '500px',
          height: '100px',
        }}
      >
        <animated.div style={{ ...styles }}>
          <Popover
            popoverRef={finalPopoverRef as unknown as RefObject<HTMLElement>}
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
        </animated.div>
      </PopoverWrapper>
    </WrapWithIf>
  ))
}

export type { PopoverListBoxProps }
export { PopoverListBox }
