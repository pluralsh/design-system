import mapValues from 'lodash/mapValues'

import { semanticColorsDark } from './colors-semantic-dark'

export function colorKeyToCssVar(key: string): string {
  return `--color-${key}`
}

export const semanticColorVars = mapValues(
  semanticColorsDark,
  (_value, key) => `var(${colorKeyToCssVar(key)})`
)
