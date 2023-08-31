import { Flex, type FlexProps } from 'honorable'
import PropTypes from 'prop-types'
import {
  type ComponentProps,
  type ReactElement,
  type Ref,
  forwardRef,
  useMemo,
} from 'react'
import styled, { type DefaultTheme, useTheme } from 'styled-components'

import chroma from 'chroma-js'

import { Spinner } from './Spinner'
import Card, { type BaseCardProps } from './Card'
import { type FillLevel, useFillLevel } from './contexts/FillLevelContext'
import CloseIcon from './icons/CloseIcon'

const HUES = ['default', 'lighter', 'lightest'] as const
const SIZES = ['small', 'medium', 'large'] as const
const SEVERITIES = [
  'neutral',
  'info',
  'success',
  'warning',
  'error',
  'critical',
] as const

type ChipHue = (typeof HUES)[number]
type ChipSize = (typeof SIZES)[number]
type ChipSeverity = (typeof SEVERITIES)[number]

export type ChipProps = Omit<FlexProps, 'size'> &
  BaseCardProps & {
    size?: ChipSize
    severity?: ChipSeverity
    icon?: ReactElement
    loading?: boolean
    closeButton?: boolean
    clickable?: boolean
    [x: string]: unknown
  }

const propTypes = {
  size: PropTypes.oneOf(SIZES),
  severity: PropTypes.oneOf(SEVERITIES),
  hue: PropTypes.oneOf(HUES),
  icon: PropTypes.element,
  loading: PropTypes.bool,
} as const

const parentFillLevelToHue = {
  0: 'default',
  1: 'lighter',
  2: 'lightest',
  3: 'lightest',
} as const satisfies Record<FillLevel, ChipHue>

const hueToFillLevel: Record<ChipHue, FillLevel> = {
  default: 1,
  lighter: 2,
  lightest: 3,
}

const useBgColor = ({
  hue,
  severity,
}: {
  hue: ChipHue
  severity: ChipSeverity
}) => {
  const theme = useTheme()
  const mapper: Record<ChipSeverity, Record<ChipHue, string>> = useMemo(
    () => ({
      neutral: {
        default: theme.colors['fill-one'],
        lighter: theme.colors['fill-two'],
        lightest: theme.colors['fill-three'],
      },
      info: {
        default: `${chroma(theme.colors.semanticBlue).alpha(0.05)}`,
        lighter: `${chroma(theme.colors.semanticBlue).alpha(0.1)}`,
        lightest: `${chroma(theme.colors.semanticBlue).alpha(0.2)}`,
      },
      success: {
        default: `${chroma(theme.colors.semanticGreen).alpha(0.05)}`,
        lighter: `${chroma(theme.colors.semanticGreen).alpha(0.1)}`,
        lightest: `${chroma(theme.colors.semanticGreen).alpha(0.2)}`,
      },
      warning: {
        default: `${chroma(theme.colors.semanticYellow).alpha(0.05)}`,
        lighter: `${chroma(theme.colors.semanticYellow).alpha(0.1)}`,
        lightest: `${chroma(theme.colors.semanticYellow).alpha(0.2)}`,
      },
      error: {
        default: `${chroma(theme.colors.semanticRedLight).alpha(0.05)}`,
        lighter: `${chroma(theme.colors.semanticRedLight).alpha(0.1)}`,
        lightest: `${chroma(theme.colors.semanticRedLight).alpha(0.2)}`,
      },
      critical: {
        default: `${chroma(theme.colors.semanticRedDark).alpha(0.05)}`,
        lighter: `${chroma(theme.colors.semanticRedDark).alpha(0.1)}`,
        lightest: `${chroma(theme.colors.semanticRedDark).alpha(0.2)}`,
      },
    }),
    [theme]
  )

  if (theme.mode === 'dark') {
    return null
  }

  return mapper[severity][hue]
}

const severityToColor = {
  neutral: 'text',
  info: 'text-primary-accent',
  success: 'text-success-light',
  warning: 'text-warning-light',
  error: 'text-danger-light',
  critical: 'text-danger',
} as const satisfies Record<ChipSeverity, string>

const severityToIconColor = {
  neutral: 'icon-default',
  info: 'icon-info',
  success: 'icon-success',
  warning: 'icon-warning',
  error: 'icon-danger',
  critical: 'icon-danger-critical',
} as const satisfies Record<ChipSeverity, keyof DefaultTheme['colors']>

const sizeToCloseHeight = {
  small: 8,
  medium: 10,
  large: 12,
} as const satisfies Record<ChipSize, number>

const ChipCardSC = styled(Card)<{ $bgColor: string }>(
  ({ $bgColor, theme }) => ({
    ...($bgColor ? { '&&': { backgroundColor: $bgColor } } : {}),
    '.closeIcon': {
      color: theme.colors['text-light'],
    },
    '&:hover': {
      '.closeIcon': {
        color: theme.colors.text,
      },
    },
  })
)

function ChipRef(
  {
    children,
    size = 'medium',
    severity = 'neutral',
    hue,
    loading = false,
    icon,
    closeButton,
    clickable,
    as,
    ...props
  }: ChipProps & { as?: ComponentProps<typeof ChipCardSC>['forwardedAs'] },
  ref: Ref<any>
) {
  const parentFillLevel = useFillLevel()
  const theme = useTheme()

  hue = hue || parentFillLevelToHue[parentFillLevel]
  const col = severityToColor[severity] || 'text'
  const iconCol = severityToIconColor[severity] || 'icon-default'

  const bgColor = useBgColor({ hue, severity })

  console.log('bgColor', bgColor)

  return (
    <ChipCardSC
      $bgColor={bgColor}
      ref={ref}
      cornerSize="medium"
      fillLevel={hueToFillLevel[hue]}
      clickable={clickable}
      paddingVertical={size === 'large' ? '6px' : 'xxxsmall'}
      paddingHorizontal={size === 'small' ? 'xsmall' : 'small'}
      alignItems="center"
      display="inline-flex"
      textDecoration="none"
      {...(as ? { forwardedAs: as } : {})}
      {...props}
    >
      {loading && (
        <Spinner
          color={theme.colors[iconCol]}
          size={size === 'large' ? 15 : 13}
          marginRight="xsmall"
        />
      )}
      {icon && (
        <icon.type
          size={size === 'large' ? 15 : 13}
          marginRight="xsmall"
          color={theme.colors[iconCol]}
        />
      )}
      <Flex
        body2
        color={col}
        fontSize={size === 'small' ? 12 : 14}
        fontWeight={size === 'small' ? 400 : 600}
        lineHeight={size === 'small' ? '16px' : '20px'}
        gap={4}
      >
        {children}
      </Flex>
      {closeButton && (
        <CloseIcon
          className="closeIcon"
          paddingLeft="xsmall"
          size={sizeToCloseHeight[size]}
          _hover={{ color: 'blue' }}
        />
      )}
    </ChipCardSC>
  )
}

const Chip = forwardRef(ChipRef)

Chip.propTypes = propTypes

export default Chip
