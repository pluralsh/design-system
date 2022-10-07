import { ComponentPropsWithRef, forwardRef } from 'react'
import styled from 'styled-components'

import { FillLevel, useFillLevel } from './contexts/FillLevelContext'

// This nonsense is to reduce the chance of there being
// a left margin when a <code> block is the first item in a line of text.
// Put em space character in pseudo element so it won't ever get copied
const Spacer = styled.span(_ => ({
  fontSize: 1.5,
  display: 'inline',
  lineHeight: 0,
  '&:after': {
    fontSize: 1.5,
    lineHeight: 0,
    content: '"\u2001"', // em-space
    display: 'inline',
    opacity: 0, // hides link underlines that can extend outside rectangle
  },
}))

const fillLevelToBorderColor: {
  [key in FillLevel]: string
} = {
  0: 'border',
  1: 'border-fill-two',
  2: 'border-fill-three',
  3: 'border-fill-three',
}

const Code = styled.code<{fillLevel: FillLevel}>(({ theme, fillLevel }) => ({
  ...theme.partials.text.inlineCode,
  border: theme.borders.default,
  borderRadius: theme.borderRadiuses.large,
  paddingRight: theme.spacing.xxsmall,
  paddingLeft: theme.spacing.xxsmall,
  // Magic number to make the total height equal 20px when within 14px type
  // Proportional to that for larger text sizes
  paddingTop: '0.139em',
  paddingBottom: '0.139em',
  color: theme.colors['text-light'],
  borderColor: theme.colors[fillLevelToBorderColor[fillLevel]],
  backgroundColor: theme.colors['fill-one'],
  'a:any-link &': {
    color: theme.colors['action-link-inline'],
  },
  'a:hover &': {
    color: theme.colors['action-link-inline-hover'],
  },
  'a:visited &, a:active &': {
    color: theme.colors['action-link-inline-visited'],
  },
}))

const InlineCode = forwardRef<HTMLElement, ComponentPropsWithRef<'code'>>(({ ...props }, ref) => {
  const fillLevel = useFillLevel()

  return (
    <>
      <Spacer />
      <Code
        ref={ref}
        fillLevel={fillLevel}
        {...props}
      />
      <Spacer />
    </>
  )
})

export default InlineCode
