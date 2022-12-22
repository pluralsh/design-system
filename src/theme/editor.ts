import { semanticColors } from './colors'

export const editorTheme = {
  inherit: true,
  base: 'vs-dark',
  rules: [
    {
      foreground: semanticColors['text-xlight'],
      token: 'comment',
    },
    {
      foreground: '#3CECAF',
      token: 'variable',
    },
    {
      foreground: '#99F5D5',
      token: 'keyword.js',
    },
  ],
  colors: {
    'editor.foreground': semanticColors['text-light'],
    'editor.errorForeground': semanticColors['text-danger-light'],
    'editor.descriptionForeground': semanticColors['text-xlight'],
    'editor.background': semanticColors['fill-one'],
    'editor.lineHighlightBackground': semanticColors['fill-one-hover'],
    'editor.selectionBackground': semanticColors['fill-one-selected'],
    'editor.inactiveSelectionBackground': semanticColors['fill-one-hover'],
    'editorCursor.foreground': semanticColors.text,
    'editorLineNumber.foreground': semanticColors['text-light'],
    'scrollbarSlider.background': semanticColors['fill-three'],
    'scrollbarSlider.hoverBackground': semanticColors['fill-three'],
  },
}
