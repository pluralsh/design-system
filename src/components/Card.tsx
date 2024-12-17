import chroma from 'chroma-js'
import { Div, type DivProps } from 'honorable'
import { memoize } from 'lodash-es'
import { type ComponentProps, type ReactNode, forwardRef } from 'react'
import styled, { type DefaultTheme } from 'styled-components'

import { type Severity, type SeverityExt, sanitizeSeverity } from '../types'

import {
  type FillLevel,
  FillLevelProvider,
  toFillLevel,
  useFillLevel,
} from './contexts/FillLevelContext'

const CARD_SEVERITIES = [
  'info',
  'success',
  'warning',
  'danger',
  'critical',
  'neutral',
] as const satisfies Readonly<SeverityExt[]>

type CornerSize = 'medium' | 'large'
type CardFillLevel = Exclude<FillLevel, 0>
type CardSeverity = Extract<SeverityExt, (typeof CARD_SEVERITIES)[number]>

type BaseCardProps = {
  /** Used to override a fill level set by `FillLevelContext`  */
  fillLevel?: FillLevel
  cornerSize?: CornerSize
  clickable?: boolean
  disabled?: boolean
  selected?: boolean
  severity?: SeverityExt
  header?: {
    size?: 'medium' | 'large'
    content?: ReactNode
    headerProps?: ComponentProps<'div'>
  }
}

type CardProps = DivProps & BaseCardProps

const fillToNeutralBgC = {
  0: 'fill-one',
  1: 'fill-one',
  2: 'fill-two',
  3: 'fill-three',
} as const satisfies Record<FillLevel, keyof DefaultTheme['colors']>

const fillToNeutralBorderC = {
  0: 'border',
  1: 'border',
  2: 'border-fill-two',
  3: 'border-fill-three',
} as const satisfies Record<FillLevel, keyof DefaultTheme['colors']>

const fillToNeutralHoverBgC = {
  0: 'fill-one-hover',
  1: 'fill-one-hover',
  2: 'fill-two-hover',
  3: 'fill-three-hover',
} as const satisfies Record<FillLevel, keyof DefaultTheme['colors']>

const fillToNeutralSelectedBgC = {
  0: 'fill-one-selected',
  1: 'fill-one-selected',
  2: 'fill-two-selected',
  3: 'fill-three-selected',
} as const satisfies Record<FillLevel, keyof DefaultTheme['colors']>

export function useDecideFillLevel({ fillLevel }: { fillLevel?: number }) {
  const parentFillLevel = useFillLevel()

  return (
    typeof fillLevel === 'number'
      ? toFillLevel(Math.max(1, fillLevel))
      : toFillLevel(parentFillLevel + 1)
  ) as CardFillLevel
}

export const getFillToLightBgC = memoize(
  (
    theme: DefaultTheme
  ): Record<CardSeverity, Record<CardFillLevel, string>> => ({
    neutral: {
      1: theme.colors[fillToNeutralBgC[1]],
      2: theme.colors[fillToNeutralBgC[2]],
      3: theme.colors[fillToNeutralBgC[3]],
    },
    info: {
      1: `${chroma(theme.colors.semanticBlue).alpha(0.1)}`,
      2: `${chroma(theme.colors.semanticBlue).alpha(0.05)}`,
      3: `${chroma(theme.colors.semanticBlue).alpha(0.2)}`,
    },
    success: {
      1: `${chroma(theme.colors.semanticGreen).alpha(0.1)}`,
      2: `${chroma(theme.colors.semanticGreen).alpha(0.05)}`,
      3: `${chroma(theme.colors.semanticGreen).alpha(0.2)}`,
    },
    warning: {
      1: `${chroma(theme.colors.semanticYellow).alpha(0.1)}`,
      2: `${chroma(theme.colors.semanticYellow).alpha(0.05)}`,
      3: `${chroma(theme.colors.semanticYellow).alpha(0.2)}`,
    },
    danger: {
      1: `${chroma(theme.colors.semanticRedLight).alpha(0.1)}`,
      2: `${chroma(theme.colors.semanticRedLight).alpha(0.05)}`,
      3: `${chroma(theme.colors.semanticRedLight).alpha(0.2)}`,
    },
    critical: {
      1: `${chroma(theme.colors.semanticRedDark).alpha(0.1)}`,
      2: `${chroma(theme.colors.semanticRedDark).alpha(0.05)}`,
      3: `${chroma(theme.colors.semanticRedDark).alpha(0.2)}`,
    },
  })
)

const getBgColor = ({
  theme,
  fillLevel,
  severity = 'neutral',
}: {
  theme: DefaultTheme
  fillLevel: CardFillLevel
  severity?: CardSeverity
}) => {
  const fillToLightBgC = getFillToLightBgC(theme)

  if (theme.mode === 'dark') {
    return theme.colors[fillToNeutralBgC[fillLevel]]
  }

  return fillToLightBgC[severity][fillLevel]
}

const HeaderSC = styled.div<{
  fillLevel: CardFillLevel
  selected: boolean
  size: 'medium' | 'large'
}>(({ theme, fillLevel, selected, size }) => ({
  ...theme.partials.text.overline,
  color: theme.colors['text-xlight'],
  borderBottom: `1px solid ${theme.colors[fillToNeutralBorderC[fillLevel]]}`,
  backgroundColor: selected
    ? theme.colors[fillToNeutralSelectedBgC[fillLevel]]
    : getBgColor({ theme, fillLevel }),
  height: size === 'large' ? 48 : 40,
  padding: `0 ${theme.spacing.medium}px`,
  overflow: 'hidden',
}))

const CardSC = styled(Div)<{
  $fillLevel: CardFillLevel
  $cornerSize: CornerSize
  $severity: Severity
  $selected: boolean
  $clickable: boolean
  $disabled: boolean
}>(
  ({
    theme,
    $fillLevel: fillLevel,
    $cornerSize: cornerSize,
    $severity: severity,
    $selected: selected,
    $clickable: clickable,
    $disabled: disabled,
  }) => ({
    ...theme.partials.reset.button,
    border: `1px solid ${theme.colors[fillToNeutralBorderC[fillLevel]]}`,
    borderRadius: theme.borderRadiuses[cornerSize],
    backgroundColor: selected
      ? theme.colors[fillToNeutralSelectedBgC[fillLevel]]
      : getBgColor({ theme, fillLevel }),
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible': {
      borderColor: theme.colors['border-outline-focused'],
    },
    ...(clickable &&
      !disabled && {
        cursor: 'pointer',
      }),
    ...(clickable &&
      !disabled &&
      !selected &&
      severity === 'neutral' && {
        '&:hover': {
          backgroundColor: theme.colors[fillToNeutralHoverBgC[fillLevel]],
        },
      }),
    ...theme.partials.scrollBar({ fillLevel }),
  })
)

const Card = forwardRef(
  (
    {
      header,
      cornerSize = 'large',
      severity = 'neutral',
      fillLevel,
      selected = false,
      clickable = false,
      disabled = false,
      children,
      ...props
    }: CardProps,
    ref
  ) => {
    const { size, content: headerContent, headerProps } = header ?? {}

    const mainFillLevel = useDecideFillLevel({ fillLevel })
    const headerFillLevel = useDecideFillLevel({ fillLevel: mainFillLevel + 1 })

    const cardSeverity = sanitizeSeverity(severity, {
      allowList: CARD_SEVERITIES,
      default: 'neutral',
    })

    return (
      <FillLevelProvider value={mainFillLevel}>
        <CardSC
          ref={ref}
          $cornerSize={cornerSize}
          $fillLevel={mainFillLevel}
          $severity={cardSeverity}
          $selected={selected}
          $clickable={clickable}
          {...(clickable && {
            forwardedAs: 'button',
            type: 'button',
            'data-clickable': 'true',
          })}
          $disabled={clickable && disabled}
          {...props}
        >
          {header && (
            <HeaderSC
              fillLevel={headerFillLevel}
              selected={selected}
              size={size}
              {...headerProps}
            >
              {headerContent}
            </HeaderSC>
          )}
          {children}
        </CardSC>
      </FillLevelProvider>
    )
  }
)

export default Card
export type { BaseCardProps, CardFillLevel, CardProps, CornerSize }
