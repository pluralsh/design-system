import type { FillLevel } from '../contexts/FillLevelContext'

export const tableFillLevelToBorder = {
  0: 'default',
  1: 'fill-one',
  2: 'fill-two',
  3: 'fill-three',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToBorderColor = {
  0: 'border-fill-two',
  1: 'border-fill-three',
  2: 'border-fill-three',
  3: 'border-fill-three',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToBg = {
  0: 'fill-zero',
  1: 'fill-one',
  2: 'fill-two',
  3: 'fill-three',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToHeaderBg = {
  0: 'fill-one',
  1: 'fill-two',
  2: 'fill-three',
  3: 'fill-three',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToCellBg = {
  0: 'fill-zero',
  1: 'fill-one',
  2: 'fill-two',
  3: 'fill-three',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToRaisedCellBg = {
  0: 'fill-zero-selected',
  1: 'fill-one-selected',
  2: 'fill-two-selected',
  3: 'fill-three-selected',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToSelectedCellBg = {
  0: 'fill-zero-hover',
  1: 'fill-one-hover',
  2: 'fill-two-hover',
  3: 'fill-three-hover',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToHoverCellBg = {
  0: 'fill-zero-hover',
  1: 'fill-one-hover',
  2: 'fill-two-hover',
  3: 'fill-three-hover',
} as const satisfies Record<FillLevel, string>

export const tableFillLevelToHighlightedCellBg = {
  0: 'fill-two',
  1: 'fill-three',
  2: 'fill-three',
  3: 'fill-three',
} as const satisfies Record<FillLevel, string>

// TODO: Color getters.
// TODO: Ask Nick for verification.
