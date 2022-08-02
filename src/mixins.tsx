import { css } from 'styled-components'
import mapValues from 'lodash/mapValues'

import { boxShadows, textPartials } from './theme'

const focuses = {
  default: css`
  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: ${boxShadows.focused};
  }
`,
}

export const mixins = {
  text: mapValues(textPartials, style => css(style)),
  focus: focuses,
}

export default mixins
