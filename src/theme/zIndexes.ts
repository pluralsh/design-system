import { type CSSObject } from '../types'

export const zIndexes = {
  base: 0,
  modal: 1000,
  selectPopover: 1500,
  tooltip: 2000,
} as const satisfies CSSObject
