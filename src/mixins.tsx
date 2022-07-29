import { css } from 'styled-components'
import mapValues from 'lodash/mapValues'

import { textMixins } from './theme'

export const mixins = {
  text: mapValues(textMixins, style => css(style)),
}

export default mixins
