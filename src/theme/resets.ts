import { type CSSObject } from '../types'

export const resetPartials = {
  button: {
    textAlign: 'inherit',
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'unset',
    alignItems: 'unset',
    appearance: 'none',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  li: {
    margin: 0,
    padding: 0,
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'none',
  },
} as const satisfies Record<string, CSSObject>
