import { type RefCallback, type RefObject, useMemo } from 'react'
import { useTheme } from 'styled-components'
import {
  type UseFloatingReturn,
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from '@floating-ui/react-dom-interactions'
import { mergeRefs } from 'react-merge-refs'

import { type SelectProps } from '../components/Select'

export function useFloatingCornerScale({
  placement,
  triggerRef,
}: Pick<SelectProps, 'placement' | 'width' | 'maxHeight'> & {
  triggerRef: RefObject<any>
}): {
  floating: UseFloatingReturn
  triggerRef: RefCallback<any>
} {
  const theme = useTheme()
  const sizePadding = theme.spacing.xxsmall

  // flip() padding must be smaller than size() padding to prevent flickering
  // back and forth. This makes padding off by one at some window sizes, but
  // it's a decent trade off for not flickering.
  const flipPadding = sizePadding - 1

  const floating = useFloating({
    placement,
    strategy: 'fixed',
    middleware: [
      offset(theme.spacing.xxsmall),
      size({
        padding: sizePadding,
      }),
      flip({
        padding: flipPadding,
        fallbackStrategy: 'bestFit',
      }),
    ],
    whileElementsMounted: autoUpdate,
  })
  const mergedRef = useMemo(
    () => mergeRefs([floating.reference, triggerRef]),
    [floating.reference, triggerRef]
  )

  return { floating, triggerRef: mergedRef }
}
