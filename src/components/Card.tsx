import { Div, type DivProps } from 'honorable'
import { forwardRef, useMemo } from 'react'
import { useTheme } from 'styled-components'
import { type Merge } from 'type-fest'

import {
  type FillLevel,
  FillLevelProvider,
  isFillLevel,
  toFillLevel,
  useFillLevel,
} from './contexts/FillLevelContext'

type CornerSize = 'medium' | 'large'
type CardHue = 'default' | 'lighter' | 'lightest'

type BaseCardProps = {
  hue?: CardHue // Deprecated, prefer fillLevel
  fillLevel?: FillLevel
  cornerSize?: CornerSize
  clickable?: boolean
  selected?: boolean
}

type CardProps = Merge<DivProps, BaseCardProps>

const fillLevelToBGColor: Record<FillLevel, string> = {
  0: 'fill-one',
  1: 'fill-one',
  2: 'fill-two',
  3: 'fill-three',
}

const fillLevelToBorderColor: Record<FillLevel, string> = {
  0: 'border',
  1: 'border',
  2: 'border-fill-two',
  3: 'border-fill-three',
}

const fillLevelToHoverBGColor: Record<FillLevel, string> = {
  0: 'fill-one-hover',
  1: 'fill-one-hover',
  2: 'fill-two-hover',
  3: 'fill-three-hover',
}

const hueToFillLevel: Record<CardHue, FillLevel> = {
  default: 1,
  lighter: 2,
  lightest: 3,
}

const fillLevelToSelectedBGColor: Record<FillLevel, string> = {
  0: 'fill-one-selected',
  1: 'fill-one-selected',
  2: 'fill-two-selected',
  3: 'fill-three-selected',
}

const cornerSizeToBorderRadius: Record<CornerSize, string> = {
  medium: 'medium',
  large: 'large',
}

function useDecideFillLevel({
  hue,
  fillLevel,
}: {
  hue?: CardHue
  fillLevel?: number
}) {
  const parentFillLevel = useFillLevel()

  if (isFillLevel(fillLevel)) {
    fillLevel = toFillLevel(Math.max(1, fillLevel))
  } else {
    fillLevel = hueToFillLevel[hue]
  }

  const ret = useMemo(
    () =>
      isFillLevel(fillLevel) ? fillLevel : toFillLevel(parentFillLevel + 1),
    [fillLevel, parentFillLevel]
  )

  return ret
}

const Card = forwardRef(
  (
    {
      cornerSize: size = 'large',
      hue, // Deprecated, prefer fillLevel
      fillLevel,
      selected = false,
      clickable = false,
      ...props
    }: CardProps,
    ref
  ) => {
    fillLevel = useDecideFillLevel({ hue, fillLevel })
    const theme = useTheme()

    console.log('crd clickable', clickable)
    console.log('crd props', props)

    return (
      <FillLevelProvider value={fillLevel}>
        <Div
          ref={ref}
          {...theme.partials.reset.button}
          cursor="unset"
          border={`1px solid ${fillLevelToBorderColor[fillLevel]}`}
          borderRadius={cornerSizeToBorderRadius[size]}
          backgroundColor={
            selected
              ? fillLevelToSelectedBGColor[fillLevel]
              : fillLevelToBGColor[fillLevel]
          }
          {...{
            '&:focus, &:focus-visible': {
              outline: 'none',
            },
            '&:focus-visible': {
              borderColor: theme.colors['border-outline-focused'],
            },
          }}
          {...(clickable && {
            cursor: 'pointer',
            as: 'button',
          })}
          {...(clickable &&
            !selected && {
              _hover: { backgroundColor: fillLevelToHoverBGColor[fillLevel] },
            })}
          {...theme.partials.scrollBar({ fillLevel })}
          {...props}
        />
      </FillLevelProvider>
    )
  }
)

export default Card
export type { BaseCardProps, CardProps, CornerSize as CardSize, CardHue }
