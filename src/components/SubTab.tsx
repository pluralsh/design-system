import { ComponentProps, Ref, forwardRef } from 'react'
import styled from 'styled-components'

import { FillLevel, useFillLevel } from './contexts/FillLevelContext'
import { TabBaseProps } from './TabList'

type SubTabSize = 'small' | 'medium'
type SubtabProps = TabBaseProps &
  ComponentProps<'div'> & {
    flexGrow?: number
    size?: SubTabSize
  }

const parentFillLevelToActiveBG: Record<FillLevel, string> = {
  0: 'fill-zero-selected',
  1: 'fill-one-selected',
  2: 'fill-two-selected',
  3: 'fill-three-selected',
}

const SubTabBase = styled.div<{
  size: SubTabSize
  active: boolean
  parentFillLevel: FillLevel
}>(({
  theme, active, size, parentFillLevel,
}) => ({
  ...(size === 'small'
    ? theme.partials.text.buttonSmall
    : theme.partials.text.buttonMedium),
  tabIndex: 0,
  userSelect: 'none',
  cursor: 'pointer',
  color: active ? theme.colors.text : theme.colors['text-xlight'],
  backgroundColor: active
    ? theme.colors[parentFillLevelToActiveBG[parentFillLevel]]
    : 'transparent',
  borderRadius: theme.borderRadiuses.medium,
  focusVisible: {
    zIndex: theme.zIndexes.base + 1,
    ...theme.partials.focus.default,
  },
  padding: `${size === 'small' ? theme.spacing.xxsmall : theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  align: 'center',
  hover: {
    backgroundColor:
      parentFillLevel >= 2
        ? theme.colors['fill-two-hover']
        : theme.colors['fill-one-hover'],
  },
  transition:
    'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
  '.codeTabInner': {},
}))

function SubTabRef({
  active,
  children,
  textValue: _textValue,
  flexGrow,
  size = 'medium',
  ...props
}: SubtabProps,
ref: Ref<any>) {
  const parentFillLevel = useFillLevel()

  return (
    <SubTabBase
      parentFillLevel={parentFillLevel}
      active={active}
      ref={ref}
      size={size}
      flexGrow={flexGrow}
      {...props}
    >
      {children}
    </SubTabBase>
  )
}

export const SubTab = forwardRef(SubTabRef)
export default SubTab
