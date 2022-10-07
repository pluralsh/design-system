import { ComponentPropsWithRef, forwardRef } from 'react'
import styled from 'styled-components'

import { INLINE_CODE_PIXEL_SIZE } from '../theme/text'

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

const InlineCode = forwardRef<HTMLElement, ComponentPropsWithRef<'code'>>(({ ...props }, ref) => (
  <>
    <Spacer />
    <code
      ref={ref}
      {...props}
    />
    <Spacer />
  </>
))

export default styled(InlineCode)(({ theme }) => ({
  ...theme.partials.text.inlineCode,
  border: theme.borders.default,
  borderRadius: theme.borderRadiuses.large,
  paddingRight: theme.spacing.xxsmall,
  paddingLeft: theme.spacing.xxsmall,
  paddingTop: 0,
  paddingBottom: 2,
  color: theme.colors['text-light'],
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