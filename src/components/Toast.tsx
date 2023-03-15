import { FlexProps } from 'honorable'
import {
  Dispatch,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'

import Banner from './Banner'
import Layer, { LayerPositionType } from './Layer'

export type Severity = 'info' | 'success' | 'error'

type ToastProps = {
  position?: LayerPositionType
  closeTimeout?: number
  onClose?: Dispatch<void>
  severity?: Severity
} & FlexProps

const defaults = {
  closeTimeout: 99999999, // 10000, // 10 seconds
  position: 'bottom-right' as LayerPositionType,
  onClose: () => {},
  severity: 'info' as Severity,
}

const Toast = forwardRef(({
  position = defaults.position,
  closeTimeout = defaults.closeTimeout,
  onClose = defaults.onClose,
  severity = defaults.severity,
  children,
  ...props
}: ToastProps,
ref: Ref<any>): JSX.Element => {
  const [open, setOpen] = useState(true)
  const close = useCallback(() => {
    setOpen(false)
    onClose()
  }, [setOpen, onClose])

  useEffect(() => {
    const timer = open ? setTimeout(() => close(), closeTimeout) : null

    return () => clearTimeout(timer)
  })

  return (
    <Layer
      show={open}
      position={position}
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
  error: { graphQLErrors: Array<{ message: string }> }
  header: string
} & ToastProps

function GraphQLToast({
  error,
  header,
  ...props
}: GraphQLToastProps): JSX.Element {
  return (
    <Toast
      severity="error"
      {...props}
    >
      {header}: {error?.graphQLErrors[0]?.message}
    </Toast>
  )
}

export { Toast, GraphQLToast }
