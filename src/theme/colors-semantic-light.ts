import chroma from 'chroma-js'
import { type CSSProperties } from 'styled-components'

import { blue, green, grey, purple, red, yellow } from './colors-base'
import { colorsCloudShellLight } from './colors-cloudshell-light'
import { colorsCodeBlockLight } from './colors-codeblock-light'
import { semanticColorsDark } from './colors-semantic-dark'

export const semanticColorsLight = {
  // Fill
  //
  // fill-zero
  'fill-zero': '#F3F5F7',
  'fill-zero-hover': '#F5F5F5',
  'fill-zero-selected': '#E5E6E7',
  // fill-one
  'fill-one': '#F9FAFB',
  'fill-one-hover': '#F3F5F7',
  'fill-one-selected': '#EEF0F2',
  // fill-two
  'fill-two': '#F5F5F5',
  'fill-two-hover': '#EBEDEE',
  'fill-two-selected': '#E6E8E9',
  // fill-three
  'fill-three': '#ECEDF2',
  'fill-three-hover': '#D6D6D8',
  'fill-three-selected': '#D3D3D3',
  // primary
  'fill-primary': purple[400],
  'fill-primary-hover': purple[350],

  // Action
  //
  // primary
  'action-primary': purple[400],
  'action-primary-hover': purple[350],
  'action-primary-disabled': grey[100],
  // link
  'action-link-inactive': '#A9AFBC',
  'action-link-active': '#CDD1D2',
  // link-inline
  'action-link-inline': '#539AC3',
  'action-link-inline-hover': blue[600],
  'action-link-inline-visited': purple[300],
  'action-link-inline-visited-hover': purple[200],
  // input
  'action-input-hover': `${chroma('#C3C3C4').alpha(0.04)}`, // text color w/ alpha
  // always white
  'action-always-white': semanticColorsDark['action-always-white'],

  // Border
  //
  border: grey[100],
  'border-input': grey[300],
  'border-fill-two': grey[200],
  'border-fill-three': grey[400],
  'border-disabled': grey[200],
  'border-outline-focused': blue[400],
  'border-primary': purple[400],
  'border-secondary': blue[400],
  'border-success': green[500],
  'border-warning': '#FFF175',
  'border-danger': '#ED4578',
  'border-selected': grey[100],
  'border-info': blue[300],

  // Text
  //
  text: grey[950],
  'text-light': grey[600],
  'text-xlight': '#8B8F97',
  'text-long-form': grey[300],
  'text-disabled': grey[200],
  'text-input-disabled': grey[200],
  'text-primary-accent': '#38B6FF',
  'text-primary-disabled': grey[400],
  'text-success': green[700],
  'text-success-light': green[600],
  'text-warning': '#FADA5E',
  'text-warning-light': '#DCBC40',
  'text-danger': '#ED4578',
  'text-danger-light': red[300],
  'text-always-white': semanticColorsDark['text-always-white'],

  // Icon
  //
  'icon-default': grey[600],
  'icon-light': grey[500],
  'icon-xlight': grey[400],
  'icon-disabled': grey[100],
  'icon-primary': purple[300],
  'icon-secondary': blue[400],
  'icon-info': blue[200],
  'icon-success': green[700],
  'icon-warning': '#FF9900',
  'icon-danger': red[300],
  'icon-danger-critical': '#ED4578',

  // Marketing
  //
  'marketing-white': '#000000',
  'marketing-black': '#FFFFFF',

  // Shadows
  //
  'shadow-default': grey[950],

  // Code-blocks
  //
  ...colorsCodeBlockLight,

  // Cloud shell
  //
  ...colorsCloudShellLight,

  // Deprecated (Remove after all 'error' colors converted to 'danger' in app)
  //
  'border-error': red[300],
  'text-error': 'blue',
  'text-error-light': 'blue',
  'icon-error': 'blue',
} as const satisfies Record<
  keyof typeof semanticColorsDark,
  CSSProperties['color']
>
