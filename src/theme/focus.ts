import { type CSSObject } from '../types'

import { type ColorMode } from '../theme'

import { borderWidths } from './borders'
import { semanticColorCssVars } from './colors'

export const getFocusPartials = ({ mode }: { mode: ColorMode }) => {
  const outline = {
    '--outline-c': semanticColorCssVars['border-outline-focused'],
    outline: `${borderWidths.focus}px solid var(--outline-c)`,
    outlineOffset: -1,
  }

  return {
    default: outline,
    outline,
    button: outline,
    insetAbsolute: {
      outline: 'none',
      position: 'absolute',
      content: "''",
      pointerEvents: 'none',
      top: `${borderWidths.focus}px`,
      right: `${borderWidths.focus}px`,
      left: `${borderWidths.focus}px`,
      bottom: `${borderWidths.focus}px`,
      ...outline,
    },
  } as const satisfies Record<string, CSSObject>
}
