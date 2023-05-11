import { Grommet } from 'grommet'
import { type ComponentType, useEffect, useState } from 'react'
import {
  CssBaseline,
  Div,
  ThemeProvider as HonorableThemeProvider,
} from 'honorable'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { useMutationObserver } from '@react-hooks-library/core'

import {
  honorableThemeDark,
  honorableThemeLight,
  setTheme,
  styledThemeDark,
  styledThemeLight,
} from './theme'
import StyledCss from './GlobalStyle'

const useGetTheme = () => {
  const docElt = document.documentElement
  const [thisTheme, setThisTheme] = useState(docElt.dataset.theme || 'light')

  console.log('mutation observer docElt', docElt)
  useMutationObserver(
    docElt,
    (mutations) => {
      // mutations.forEach((mutation) => {
      //   console.log('mutation observed', mutation)
      // })'
      console.log('mutations', mutations)
      setThisTheme(document.documentElement.dataset.theme)
    },
    { attributes: true, subtree: true }
  )

  return thisTheme
}

function ThemeDecorator(Story: ComponentType, context: any) {
  const theme = useGetTheme()
  const [thisTheme, setThisTheme] = useState(theme)

  useEffect(() => {
    console.log('context.globals.theme changed to', context.globals.theme)
    setTheme(context.globals.theme)
    setThisTheme(context.globals.theme)
  }, [context.globals.theme, setThisTheme])

  const honorableTheme =
    thisTheme === 'light' ? honorableThemeLight : honorableThemeDark
  const styledTheme = thisTheme === 'light' ? styledThemeLight : styledThemeDark

  return (
    <Grommet plain>
      <HonorableThemeProvider theme={honorableTheme}>
        {/* @ts-expect-error */}
        <StyledThemeProvider theme={styledTheme}>
          <CssBaseline />
          <StyledCss />
          <Div padding="xlarge">
            <Story />
          </Div>
        </StyledThemeProvider>
      </HonorableThemeProvider>
    </Grommet>
  )
}

export default ThemeDecorator
