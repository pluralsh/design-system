import { type CSSObject } from 'styled-components'

import { boxShadows } from './boxShadows'

import { borderWidths } from './borders'
import { semanticColors } from './colors'

export const focusPartials = {
  default: {
    outline: 'none',
    boxShadow: boxShadows.focused,
  },
  outline: {
    outline: `${borderWidths.focus}px solid ${semanticColors['border-outline-focused']}`,
  },
  button: {
    outline: `1px solid ${semanticColors['border-outline-focused']}`,
    outlineOffset: '-1px',
  },
  insetAbsolute: {
    outline: 'none',
    position: 'absolute',
    content: "''",
    pointerEvents: 'none',
    top: `${borderWidths.focus}px`,
    right: `${borderWidths.focus}px`,
    left: `${borderWidths.focus}px`,
    bottom: `${borderWidths.focus}px`,
    boxShadow: boxShadows.focused,
  },
} as const satisfies Record<string, CSSObject>
