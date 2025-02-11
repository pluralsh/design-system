import styled, { DefaultTheme } from 'styled-components'

import { useFillLevel } from '../../index'
import { type MarkdocContextValue, useMarkdocContext } from '../MarkdocContext'

export function bodyText({
  theme,
  fillLevel,
  variant,
}: {
  theme: DefaultTheme
  fillLevel: ReturnType<typeof useFillLevel>
  variant: MarkdocContextValue['variant']
}) {
  return {
    ...(variant === 'docs'
      ? theme.partials.marketingText.body2
      : theme.partials.text.body2LooseLineHeight),
    color:
      fillLevel > 0
        ? theme.colors['text-light']
        : theme.colors['text-long-form'],
    'b, strong': {
      ...(variant === 'docs'
        ? theme.partials.marketingText.bodyBold
        : theme.partials.text.body2LooseLineHeightBold),
      color: theme.colors['text-light'],
    },
    'i, em': {
      fontStyle: 'italic',
    },
  }
}

const Paragraph = styled.p(({ theme }) => {
  const fillLevel = useFillLevel()
  const { variant } = useMarkdocContext()

  return {
    ...bodyText({ theme, fillLevel, variant }),
    marginBottom: theme.spacing.small,
  }
})

export default Paragraph
