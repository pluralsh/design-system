import {
  ReactNode, RefObject, useRef,
} from 'react'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { FocusScope } from '@react-aria/focus'
import styled from 'styled-components'

type PopoverProps = {
  isOpen?: boolean,
  onClose?: () => unknown,
  popoverRef?: RefObject<any>,
  children: ReactNode,
}

function Popover(props:PopoverProps) {
  const ref = useRef()
  const {
    popoverRef = ref,
    isOpen,
    onClose,
    children,
  } = props

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = useOverlay({
    isOpen,
    onClose,
    shouldCloseOnBlur: true,
    isDismissable: true,
  }, popoverRef)

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <PopoverStyled
        {...overlayProps}
        ref={popoverRef}
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </PopoverStyled>
    </FocusScope>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PopoverStyled = styled.div(({ theme }) => ({
  zIndex: 999999,
  maxHeight: '230px',
  display: 'flex',
  // alignItems: 'stretch',
  // justifyContent: 'stretch',
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  marginTop: 4,
  boxShadow: theme.boxShadows.moderate,
  '> *': {
    flexGrow: 1,
  },
  '&:focus, &:focus-visible': {
    outline: '1px solid red',
  },
}))

export { Popover as SelectPopover }
