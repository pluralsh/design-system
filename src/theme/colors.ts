import chroma from 'chroma-js'

export const grey = {
  950: '#0E1015',
  900: '#171A21',
  875: '#1B1F27',
  850: '#21242C',
  825: '#252932',
  800: '#2A2E37',
  775: '#303540',
  750: '#383D47',
  725: '#3D424D',
  700: '#454954',
  675: '#494E5A',
  600: '#5D626F',
  500: '#747B8B',
  400: '#9095A2',
  300: '#A9AFBC',
  200: '#D6D9E0',
  100: '#DFE2E7',
  50: '#EBEFF0',
}

export const purple = {
  950: '#020318',
  900: '#030530',
  850: '#050848',
  800: '#070A5F',
  700: '#0A0F8F',
  600: '#0D14BF',
  500: '#111AEE',
  400: '#4A51F2',
  350: '#5D63F4',
  300: '#747AF6',
  200: '#9FA3F9',
  100: '#CFD1FC',
  50: '#F1F1FE',
}

export const blue = {
  950: '#001019',
  900: '#002033',
  850: '#00304D',
  800: '#004166',
  700: '#006199',
  600: '#0081CC',
  500: '#06A0F9',
  400: '#33B4FF',
  350: '#4DBEFF',
  300: '#66C7FF',
  200: '#99DAFF',
  100: '#C2E9FF',
  50: '#F0F9FF',
}

export const green = {
  950: '#032117',
  900: '#053827',
  850: '#074F37',
  800: '#0A6B4A',
  700: '#0F996A',
  600: '#13C386',
  500: '#17E86E',
  400: '#3CECAF',
  300: '#6AF1C2',
  200: '#99F5D5',
  100: '#C7FAE8',
  50: '#F1FEF9',
}

export const yellow = {
  950: '#242000',
  900: '#3D2F00',
  850: '#573B00',
  800: '#755200',
  700: '#A87E00',
  600: '#D6AF00',
  500: '#FFC800',
  400: '#FFD129',
  300: '#FFF170',
  200: '#FFF59E',
  100: '#FFF9C2',
  50: '#FFFEF0',
}

export const red = {
  950: '#130205',
  900: '#200308',
  850: '#38060E',
  800: '#660A19',
  700: '#8B0E23',
  600: '#BA1239',
  500: '#E81748',
  400: '#ED456A',
  300: '#F2788D',
  200: '#F599A8',
  100: '#FAC7D0',
  50: '#FFF0F2',
}

export const semanticColors = {
  // Fill
  'fill-zero': grey[900],
  'fill-zero-hover': grey[850],
  'fill-zero-selected': grey[825],
  'fill-one': grey[850],
  'fill-one-hover': grey[825],
  'fill-one-selected': grey[775],
  'fill-two': grey[800],
  'fill-two-hover': grey[775],
  'fill-two-selected': grey[725],
  'fill-three': grey[750],
  'fill-three-hover': grey[725],
  'fill-three-selected': grey[675],
  // Action
  'action-primary': purple[400],
  'action-primary-hover': purple[350],
  'action-primary-disabled': grey[825],
  'action-link-inactive': grey[200],
  'action-link-active': grey[50],
  'action-link-inline': blue[200],
  'action-link-inline-hover': blue[350],
  'action-link-inline-visited': purple[300],
  'action-input-hover': `${chroma('#E9ECF0').alpha(0.04)}`,
  // Border
  border: grey[800],
  'border-input': grey[700],
  'border-fill-two': grey[750],
  'border-fill-three': grey[700],
  'border-disabled': grey[700],
  'border-outline-focused': blue[300],
  'border-primary': purple[300],
  'border-success': green[500],
  'border-warning': yellow[400],
  'border-error': red[400],
  // Content
  text: grey[50],
  'text-light': grey[200],
  'text-xlight': grey[400],
  'text-disabled': grey[700],
  'text-primary-accent': blue[200],
  'text-primary-disabled': grey[500],
  'text-success': green[500],
  'text-success-light': green[200],
  'text-warning': yellow[400],
  'text-warning-light': yellow[200],
  'text-error': red[400],
  'text-error-light': red[200],
  // Icon
  'icon-success': green[500],
  'icon-warning': yellow[400],
  'icon-error': red[400],
}
