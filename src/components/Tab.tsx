import { ReactNode, Ref, forwardRef } from 'react'
import {
  Div,
  DivProps,
  Flex,
  Icon,
} from 'honorable'
import { useTheme } from 'styled-components'

import { TabBaseProps } from './TabList'

type TabProps = DivProps &
  TabBaseProps & {
    startIcon?: ReactNode
    innerProps?: DivProps
}

export const TAB_INDICATOR_THICKNESS = 3

function TabRef({
  startIcon,
  active,
  activeSecondary,
  children,
  vertical,
  textValue: _textValue,
  innerProps,
  ...props
}: TabProps,
ref: Ref<any>) {
  const theme = useTheme()

  const borderRadiuses = {
    borderTopLeftRadius: theme.borderRadiuses.medium,
    borderTopRightRadius: vertical ? 0 : theme.borderRadiuses.medium,
    borderBottomLeftRadius: vertical ? theme.borderRadiuses.medium : 0,
  }

  return (
    <Div
      ref={ref}
      body2
      tabIndex={0}
      userSelect="none"
      cursor="pointer"
      borderBottom={
        vertical ? null : `1px solid ${active ? 'border-primary' : 'border'}`
      }
      borderRight={
        vertical ? `1px solid ${active ? 'border-primary' : 'border'}` : null
      }
      {...borderRadiuses}
      _focusVisible={{
        zIndex: theme.zIndexes.base + 1,
        ...theme.partials.focus.default,
      }}
      {...props}
    >
      <Flex
        paddingHorizontal="medium"
        paddingTop="xsmall"
        paddingBottom="xsmall"
        align="center"
        borderBottom={
          vertical
            ? null
            : `${TAB_INDICATOR_THICKNESS}px solid ${active ? 'border-primary' : 'transparent'}`
        }
        borderRight={
          vertical
            ? `${TAB_INDICATOR_THICKNESS}px solid ${active ? 'border-primary' : 'transparent'}`
            : null
        }
        {...borderRadiuses}
        color={active ? 'text' : 'text-xlight'}
        backgroundColor={
          activeSecondary ? theme.colors['fill-two'] : 'transparent'
        }
        _hover={{
          color: 'text',
          backgroundColor: 'action-input-hover',
        }}
        transition="background-color 150ms ease, border-color 150ms ease, color 150ms ease"
        {...innerProps}
      >
        {!!startIcon && <Icon marginRight="small">{startIcon}</Icon>}
        {children}
      </Flex>
    </Div>
  )
}

const Tab = forwardRef(TabRef)

export default Tab
export type { TabProps }
