import { type CSSProperties } from 'react'

import { semanticColorVars } from './colors'

export const borderWidths = {
  default: 1,
  focus: 1,
} as const satisfies Record<string, number>

export const borderStyles = {
  default: 'solid',
} as const satisfies Record<string, CSSProperties['borderStyle']>

export const borders = {
  default: `${borderWidths.default}px ${borderStyles.default} ${semanticColorVars.border}`,
  'fill-one': `${borderWidths.default}px ${borderStyles.default} ${semanticColorVars.border}`,
  'fill-two': `${borderWidths.default}px ${borderStyles.default} ${semanticColorVars['border-fill-two']}`,
  'fill-three': `${borderWidths.default}px ${borderStyles.default} ${semanticColorVars['border-input']}`,
  input: `${borderWidths.default}px ${borderStyles.default} ${semanticColorVars['border-input']}`,
  'outline-focused': `${borderWidths.default}px ${borderStyles.default} ${semanticColorVars['border-outline-focused']}`,
} as const satisfies Record<string, CSSProperties['border']>

export const borderRadiuses = {
  medium: 3,
  large: 6,
  normal: 3, // deprecated in favor of medium
} as const satisfies Record<string, number>
