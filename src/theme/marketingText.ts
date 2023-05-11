import { type CSSObject } from '../types'

import { fontFamilies } from './fonts'
import { semanticColorVars } from './colors'

const body1 = {
  fontFamily: fontFamilies.sans,
  fontSize: 18,
  lineHeight: '140%',
  fontWeight: 300,
  letterSpacing: '0.25px',
  color: semanticColorVars['text-xlight'],
} as const satisfies CSSObject

const body2 = {
  fontFamily: fontFamilies.sans,
  fontSize: 16,
  lineHeight: '160%',
  fontWeight: 300,
  letterSpacing: '0.5px',
  color: semanticColorVars['text-xlight'],
} as const satisfies CSSObject

const bodyBold = {
  fontWeight: 700,
  color: semanticColorVars['text-light'],
} as const satisfies CSSObject

const marketingTextPartials = {
  bigHeader: {
    fontFamily: fontFamilies.sansHero,
    fontSize: 62,
    lineHeight: '120%',
    fontWeight: 500,
    letterSpacing: 0,
    color: semanticColorVars.text,
  },
  hero1: {
    fontFamily: fontFamilies.sansHero,
    fontSize: 48,
    lineHeight: '120%',
    fontWeight: 700,
    letterSpacing: 0,
    color: semanticColorVars.text,
  },
  hero2: {
    fontFamily: fontFamilies.sansHero,
    fontSize: 38,
    lineHeight: '125%',
    fontWeight: 500,
    letterSpacing: 0,
    color: semanticColorVars.text,
  },
  title1: {
    fontFamily: fontFamilies.sansHero,
    fontSize: 30,
    lineHeight: '140%',
    fontWeight: 500,
    letterSpacing: '0.25px',
    color: semanticColorVars.text,
  },
  title2: {
    fontFamily: fontFamilies.sansHero,
    fontSize: 24,
    lineHeight: '140%',
    fontWeight: 500,
    letterSpacing: '0.25px',
    color: semanticColorVars.text,
  },
  subtitle1: {
    fontFamily: fontFamilies.sans,
    fontSize: 22,
    lineHeight: '140%',
    fontWeight: 600,
    letterSpacing: '0.25px',
    color: semanticColorVars.text,
  },
  subtitle2: {
    fontFamily: fontFamilies.sans,
    fontSize: 18,
    lineHeight: '150%',
    fontWeight: 600,
    letterSpacing: '0.25px',
    color: semanticColorVars.text,
  },
  body1,
  body2,
  bodyBold,
  body1Bold: {
    ...body1,
    ...bodyBold,
  },
  body2Bold: {
    ...body2,
    ...bodyBold,
  },
  inlineLink: {
    color: semanticColorVars['action-link-inline'],
    textDecoration: 'underline',
    '&:hover': {
      color: semanticColorVars['action-link-inline-hover'],
    },
    '&:visited, &:active': {
      color: semanticColorVars['action-link-inline-visited'],
    },
  },
  navLink: {
    fontFamily: fontFamilies.sans,
    fontSize: 16,
    lineHeight: '150%',
    fontWeight: '300',
    letterSpacing: '0.5px',
    color: semanticColorVars['text-light'],
    '&:hover': {
      color: semanticColorVars.text,
      textDecoration: 'underline',
    },
  },
  standaloneLink: {
    fontFamily: fontFamilies.sansHero,
    fontSize: 16,
    lineHeight: '150%',
    fontWeight: 500,
    letterSpacing: '0.5px',
    color: semanticColorVars.text,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  componentText: {
    fontFamily: fontFamilies.sans,
    fontSize: 14,
    lineHeight: '150%',
    fontWeight: 300,
    letterSpacing: '0.5px',
    color: semanticColorVars['text-xlight'],
  },
  componentLink: {
    fontFamily: fontFamilies.sans,
    fontSize: 14,
    lineHeight: '150%',
    fontWeight: 600,
    letterSpacing: '0.25px',
    color: semanticColorVars['text-light'],
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  componentLinkSmall: {
    fontFamily: fontFamilies.sans,
    fontSize: 12,
    lineHeight: '150%',
    fontWeight: 400,
    letterSpacing: '0.25px',
    color: semanticColorVars['text-light'],
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: 12,
    lineHeight: '150%',
    fontWeight: 300,
    letterSpacing: '1px',
    color: semanticColorVars['text-xlight'],
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, CSSObject>

export { marketingTextPartials }
