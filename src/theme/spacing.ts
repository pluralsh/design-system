export const spacing = {
  'minus-xxxxxlarge': -128,
  'minus-xxxxlarge': -96,
  'minus-xxxlarge': -64,
  'minus-xxlarge': -48,
  'minus-xlarge': -32,
  'minus-large': -24,
  'minus-medium': -16,
  'minus-small': -12,
  'minus-xsmall': -8,
  'minus-xxsmall': -4,
  'minus-xxxsmall': -2,
  none: 0,
  xxxsmall: 2,
  xxsmall: 4,
  xsmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
  xxxlarge: 64,
  xxxxlarge: 96,
  xxxxxlarge: 128,
} as const satisfies Record<string, number>
