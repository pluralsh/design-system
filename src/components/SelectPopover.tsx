import {
  ReactNode, RefObject, StyleHTMLAttributes, useRef,
} from 'react'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { FocusScope } from '@react-aria/focus'
import styled from 'styled-components'
import { animated } from 'react-spring'

type PopoverProps = {
  isOpen?: boolean
  onClose?: () => unknown
  popoverRef?: RefObject<any>
  children: ReactNode
  animatedStyles: any
}

function Popover({ animatedStyles, ...props }: PopoverProps) {
  const ref = useRef()
  const {
    popoverRef = ref, isOpen, onClose, children,
  } = props

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = useOverlay({
    isOpen,
    onClose,
    shouldCloseOnBlur: true,
    isDismissable: true,
  },
  popoverRef)

  // Need to remove ref, overlayProps, hidden DismissButton, and
  // FocusScop wrapper when closed to react-aria immediately moves
  // focus to the trigger button while transition animations are happening
  let content = (
    <PopoverStyled
      className="popover"
      {...(isOpen && {
        ...overlayProps,
        ref: popoverRef,
      })}
    >
      {children}
      {/* Add a hidden <DismissButton> component at the end of the popover
          to allow screen reader users to dismiss the popup easily. */}
      {isOpen && <DismissButton onDismiss={onClose} />}
    </PopoverStyled>
  )

  if (isOpen) {
    content = <FocusScope restoreFocus>{content}</FocusScope>
  }

  // Wrapping for spring animation
  return <animated.div style={animatedStyles}>{content}</animated.div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PopoverStyled = styled.div(({ theme }) => ({
  maxHeight: '230px',
  display: 'flex',
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  marginTop: 4,
  boxShadow: theme.boxShadows.moderate,
  '> *': {
    flexGrow: 1,
  },
}))

export { Popover as SelectPopover }
