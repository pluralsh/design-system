import { createGlobalStyle } from 'styled-components'

import {
  borderRadiuses,
  borderStyles,
  borderWidths,
  borders,
  boxShadows,
  fontFamilies,
  spacing,
} from './theme'

const colorsToCSSVars: (colors: unknown, prefix?: string) => (string | null)[]
  = (colors, prefix = '') => Object.entries(colors)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `--color-${prefix}${key}: ${value};`
      }
      if (typeof value === 'object') {
        return colorsToCSSVars(value, `${prefix}${key}-`)
      }

      return ''
    })
    .flat()

const fontsToCSSVars = Object.entries(fontFamilies).map(([name, value]) => `--font-${name}: ${value};`)
const shadowsToCSSVars = Object.entries(boxShadows).map(([name, value]) => `--box-shadow-${name}: ${value};`)
const spacingToCSSVars = Object.entries(spacing).map(([name, value]) => `--space-${name}: ${value}px;`)
const radiiToCSSVars = Object.entries(borderRadiuses).map(([name, value]) => `--radius-${name}: ${value}px;`)
const borderStylesCSSVars = Object.entries(borderStyles).map(([name, value]) => `--border-style-${name}: ${value};`)
const borderWidthsToToCSSVars = Object.entries(borderWidths).map(([name, value]) => `--border-width-${name}: ${value}px;`)
const bordersToCSSVars = Object.entries(borders).map(([name, value]) => `--border-${name}: ${value};`)

const GlobalStyle = createGlobalStyle`
:root {
  ${({ theme }) => (theme as any).colors && colorsToCSSVars((theme as any)?.colors)}
  ${fontsToCSSVars}
  ${shadowsToCSSVars}
  ${spacingToCSSVars}
  ${radiiToCSSVars}
  ${borderStylesCSSVars}
  ${borderWidthsToToCSSVars}
  ${bordersToCSSVars}
}
`

export default GlobalStyle
