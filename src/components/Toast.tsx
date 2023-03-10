import { Layer, LayerPositionType } from 'grommet'
import { FlexProps } from 'honorable'
import {
  Dispatch,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'


const getTransitionProps = (isOpen: boolean, direction: 'up' | 'down' | 'right' | 'left') => {
  translate = {
    [`translate${direction === 'up' || direction==='down' ? Y : X}`]
  }
  return ({
  from: { opacity: 0, translateX: `${CARD_WIDTH + 24}px` },
  enter: { opacity: 1, translateX: '0px' },
  leave: { opacity: 0, translateX: `${CARD_WIDTH + 24}px` },
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
})}

type LayerPositionType = "bottom" | "bottom-left" | "bottom-right" | "center" | "hidden" | "left" | "right" | "top" | "top-left" | "top-right"
function Layer = function() {

}


import Banner from './Banner'

export type Severity = 'info' | 'success' | 'error'

type ToastProps = {
  position?: LayerPositionType,
  closeTimeout?: number,
  onClose?: Dispatch<void>,
  severity?: Severity,
} & FlexProps

const defaults = {
  closeTimeout: 10000, // 10 seconds
  position: 'bottom-right' as LayerPositionType,
  onClose: () => {},
  severity: 'info' as Severity,
}

const Toast = forwardRef(({
  position = defaults.position, closeTimeout = defaults.closeTimeout, onClose = defaults.onClose,
  severity = defaults.severity, children, ...props
}: ToastProps, ref:Ref<any>): JSX.Element => {
  const [open, setOpen] = useState(true)
  const close = useCallback(() => {
    setOpen(false)
    onClose()
  }, [setOpen, onClose])

  useEffect(() => {
    const timer = open ? setTimeout(() => close(), closeTimeout) : null

    return () => clearTimeout(timer)
  })

  if (!open) {
    return null
  }

  return (
    <Layer
      position={position}
      plain
      modal={false}
      ref={ref}
    >
      <Banner
        onClose={close}
        severity={severity}
        {...props}
      >
        {children}
      </Banner>
    </Layer>
  )
})

type GraphQLToastProps = {
  error: {graphQLErrors: Array<{message: string}>},
  header: string
} & ToastProps

function GraphQLToast({
  error, header, ...props
}: GraphQLToastProps): JSX.Element {
  return (
    <Toast
      severity="error"
      {...props}
    >{header}: {error?.graphQLErrors[0]?.message}
    </Toast>
  )
}

export { Toast, GraphQLToast }
