import { type ComponentPropsWithRef } from 'react'
import styled from 'styled-components'

import { type styledTheme } from '../theme'

import { type FillLevel, useFillLevel } from './contexts/FillLevelContext'
import { type TabBaseProps } from './TabList'

type SubTabSize = 'small' | 'medium'
type SubtabProps = TabBaseProps &
  ComponentPropsWithRef<'div'> & {
    size?: SubTabSize
  }

const parentFillLevelToActiveBG = {
  0: 'fill-zero-selected',
  1: 'fill-one-selected',
  2: 'fill-two-selected',
  3: 'fill-three-selected',
} as const satisfies Record<FillLevel, keyof typeof styledTheme.colors>

const parentFillLevelToHoverBG = {
  0: 'fill-zero-hover',
  1: 'fill-one-hover',
  2: 'fill-two-hover',
  3: 'fill-three-hover',
} as const satisfies Record<FillLevel, keyof typeof styledTheme.colors>

const SubTabBase = styled.div<{
  $size: SubTabSize
  $active: boolean
  $disabled: boolean
  $parentFillLevel: FillLevel
}>(
  ({
    theme,
    $active: active,
    $disabled: disabled,
    $size: size,
    $parentFillLevel: parentFillLevel,
  }) => ({
    ...(size === 'small'
      ? theme.partials.text.buttonSmall
      : theme.partials.text.buttonMedium),
    tabIndex: 0,
    userSelect: 'none',
    cursor: disabled ? 'default' : active ? 'default' : 'pointer',
    pointerEvents: disabled ? 'none' : 'all',
    color: disabled
      ? theme.colors['text-disabled']
      : active
      ? theme.colors.text
      : theme.colors['text-xlight'],
    backgroundColor: active
      ? theme.colors[parentFillLevelToActiveBG[parentFillLevel]]
      : 'transparent',
    borderRadius: theme.borderRadiuses.medium,
    outline: active ? theme.borders.default : undefined,
    outlineOffset: '-1px', // inset outline instead of border so layout isn't affected
    focusVisible: {
      zIndex: theme.zIndexes.base + 1,
      ...theme.partials.focus.default,
    },
    padding: `${
      size === 'small' ? theme.spacing.xxsmall : theme.spacing.xsmall
    }px ${theme.spacing.medium}px`,
    align: 'center',
    '&:hover': {
      backgroundColor:
        !active && !disabled
          ? theme.colors[parentFillLevelToHoverBG[parentFillLevel]]
          : undefined,
    },
    transition: 'background-color 150ms ease, color 150ms ease',
    '.codeTabInner': {},
  })
)

function SubTab({
  ref,
  active,
  disabled,
  children,
  textValue: _textValue,
  size = 'medium',
  ...props
}: SubtabProps) {
  const parentFillLevel = useFillLevel()

  return (
    <SubTabBase
      ref={ref}
      $parentFillLevel={parentFillLevel}
      $active={active}
      $disabled={disabled}
      $size={size}
      {...props}
    >
      {children}
    </SubTabBase>
  )
}

export default SubTab
