import { DefaultTheme } from 'styled-components'
import { type PrefixKeys } from '../utils/ts-utils'

export type SemanticSpacingKey = keyof typeof spacing

export const baseSpacing = {
  xxxsmall: 2, //      1/8 * 16
  xxsmall: 4, //       1/4 * 16
  xsmall: 8, //        1/2 * 16
  small: 12, //        3/4 * 16
  medium: 16, //       1   * 16
  large: 24, //        1.5 * 16
  xlarge: 32, //       2   * 16
  xxlarge: 48, //      3   * 16
  xxxlarge: 64, //     4   * 16
  xxxxlarge: 96, //    6   * 16
  xxxxxlarge: 128, //  8   * 16
  xxxxxxlarge: 192, // 12  * 16
} as const satisfies Record<string, number>

const negativePrefix = 'minus-' as const
const negativeSpacing = Object.fromEntries(
  Object.entries(baseSpacing).map((key, val) => [
    `${negativePrefix}${key}`,
    -val,
  ])
) as PrefixKeys<typeof baseSpacing, typeof negativePrefix, number>

export const spacing = {
  none: 0,
  ...baseSpacing,
  ...negativeSpacing,
} as const satisfies Record<string, number>

const SPACER_KEYS = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
] as const
const spacerKeys = new Set<string>(SPACER_KEYS)

type SpacerKey = (typeof SPACER_KEYS)[number]
export type SpacerProps<T = SemanticSpacingKey> = {
  [key in SpacerKey]?: T
}

// separates out semantic spacing props, resolves them, and adds them to the css style object
export function resolveSpacersAndSanitizeCss(
  props: Record<string, any>,
  { spacing }: DefaultTheme
) {
  const spacerCssProps: Record<string, number> = {}
  const rest: Record<string, any> = {}
  Object.entries(props).forEach(([propKey, propValue]) => {
    if (spacerKeys.has(propKey) && typeof propValue === 'string')
      spacerCssProps[propKey] = spacing[propValue as SemanticSpacingKey] || 0
    else rest[propKey] = propValue
  })

  return { rest, css: { ...spacerCssProps, ...props.css } }
}
