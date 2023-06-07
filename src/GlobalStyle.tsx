import { createGlobalStyle } from 'styled-components'

import { styledTheme as theme } from './theme'

const {
  borderRadiuses,
  borders,
  borderStyles,
  borderWidths,
  boxShadows,
  fontFamilies,
  spacing,
} = theme

const colorsToCSSVars: (colors: unknown) => any = (colors) => {
  function inner(colors: unknown, prefix = '') {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        ;(cssVars as any)[`--color-${prefix}${key}`] = value
      } else if (typeof value === 'object') {
        inner(value, `${prefix}${key}-`)
      }
    })
  }

  const cssVars = {}

  inner(colors)

  return cssVars
}

const fontsToCSSVars = Object.fromEntries(
  Object.entries(fontFamilies).map(([name, value]) => [`--font-${name}`, value])
)
const shadowsToCSSVars = Object.fromEntries(
  Object.entries(boxShadows).map(([name, value]) => [
    `--box-shadow-${name}`,
    value,
  ])
)
const spacingToCSSVars = Object.fromEntries(
  Object.entries(spacing).map(([name, value]) => [
    `--space-${name}`,
    `${value}px`,
  ])
)
const radiiToCSSVars = Object.fromEntries(
  Object.entries(borderRadiuses).map(([name, value]) => [
    `--radius-${name}`,
    `${value}px`,
  ])
)
const borderStylesCSSVars = Object.fromEntries(
  Object.entries(borderStyles).map(([name, value]) => [
    `--border-style-${name}`,
    value,
  ])
)
const borderWidthsToToCSSVars = Object.fromEntries(
  Object.entries(borderWidths).map(([name, value]) => [
    `--border-width-${name}`,
    `${value}px`,
  ])
)
const bordersToCSSVars = Object.fromEntries(
  Object.entries(borders).map(([name, value]) => [`--border-${name}`, value])
)

const GlobalStyle = createGlobalStyle(({ theme }) => ({
  ':root': {
    ...(theme.colors ? colorsToCSSVars(theme.colors) : {}),
    ...fontsToCSSVars,
    ...shadowsToCSSVars,
    ...spacingToCSSVars,
    ...radiiToCSSVars,
    ...borderStylesCSSVars,
    ...borderWidthsToToCSSVars,
    ...bordersToCSSVars,
  },
  '*': theme.partials.scrollBar({ fillLevel: 0 }),
}))

export default GlobalStyle
