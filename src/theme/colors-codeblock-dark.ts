import { type CSSProperties } from 'styled-components'

export const colorsCodeBlockDark = {
  [`code-block-light-green`]: '#99F5D5',
  [`code-block-dark-grey`]: '#747B8B',
  [`code-block-purple`]: '#969AF8',
  [`code-block-mid-blue`]: '#8FD6FF',
  [`code-block-yellow`]: '#FFF48F',
  [`code-block-mid-grey`]: '#C5C9D3',
  [`code-block-dark-green`]: '#3CECAF',
  [`code-block-dark-purple`]: '#7075F5',
  [`code-block-light-grey`]: '#EBEFF0',
  [`code-block-light-blue`]: '#C2E9FF',
} as const satisfies Record<string, CSSProperties['color']>
