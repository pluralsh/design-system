import { create } from 'storybook/theming'

export default create({
  base: 'dark',

  brandTitle: 'Plural',
  brandUrl: 'https://plural.sh',
  brandImage: '/plural-logo-white-48.png',
  brandTarget: '_self',

  colorPrimary: '#293EFF',
  colorSecondary: '#293EFF',

  // UI
  appBg: '#1E2229',
  appContentBg: '#2A2E37',
  appBorderColor: '#2A2E37',
  appBorderRadius: 3,

  // Typography
  fontBase: 'Inter, "Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'white',
  textInverseColor: 'white',
  textMutedColor: 'grey',

  // Toolbar default and active colors
  barTextColor: '#73828C',
  barSelectedColor: '#73828C',
  barBg: '#1E2229',

  // Form colors
  inputBg: '#1E2229',
  inputBorder: '#2A2E37',
  inputTextColor: 'white',
  inputBorderRadius: 3,
})
