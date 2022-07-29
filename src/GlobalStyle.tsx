import { createGlobalStyle, css } from 'styled-components'
import mapValues from 'lodash/mapValues'

import { ColorValue } from 'honorable'

import {
  borderRadiuses, boxShadows, fontFamilies, spacing, textMixins,
} from './theme'

const colorsToCSSVars: (colors: unknown, prefix?: string) => (string | null)[] = (colors, prefix = '') => Object.entries(colors)
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

const GlobalStyle = createGlobalStyle`
:root {
  ${({ theme }) => (theme as any).colors && colorsToCSSVars((theme as any)?.colors)}
  ${fontsToCSSVars}
  ${shadowsToCSSVars}
  ${spacingToCSSVars}
  ${radiiToCSSVars}
}
`

const mixins = {
  text: mapValues(textMixins, style => css(style)),
}

console.log('mixins', mixins)

export default GlobalStyle
export { mixins }
