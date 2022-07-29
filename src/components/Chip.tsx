import { Flex, FlexProps, Spinner } from 'honorable'
import PropTypes from 'prop-types'
import {
  Dispatch, ReactElement, Ref, forwardRef,
} from 'react'

import Card, { CardProps } from './Card'
import CloseIcon from './icons/CloseIcon'

type ChipProps = FlexProps & {
  size?: 'small' | 'medium' | 'large' | string
  severity?: 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'critical' | string
  icon?: ReactElement,
  loading?: boolean,
  removable?: boolean,
  onClick?: Dispatch<void>,
} & CardProps

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  severity: PropTypes.oneOf(['neutral', 'info', 'success', 'warning', 'error', 'critical']),
  hue: PropTypes.oneOf(['default', 'lighter', 'lightest']),
  icon: PropTypes.element,
  loading: PropTypes.bool,
  removable: PropTypes.bool,
  onClick: PropTypes.func,
}

const severityToColor = {
  neutral: 'text-light',
  info: 'text-primary-accent',
  success: 'text-success-light',
  warning: 'text-warning-light',
  error: 'text-error-light',
  critical: 'text-error',
}

const sizeToHeight: { [key in 'small' | 'medium' | 'large']: number } = {
  small: 20,
  medium: 24,
  large: 32,
}

function ChipRef({
  children,
  size = 'medium',
  severity = 'neutral',
  hue = 'default',
  loading = false,
  removable = false,
  onClick = null,
  icon,
  ...props
}: ChipProps, ref: Ref<any>) {
  const col = severityToColor[severity] || 'text-light'

  return (
    <Card
      ref={ref}
      cornerSize="medium"
      hue={hue}
      paddingVertical={size === 'large' ? '6px' : 'xxxsmall'}
      paddingHorizontal={size === 'small' ? 'xsmall' : 'small'}
      alignItems="center"
      display="inline-flex"
      maxHeight={sizeToHeight[size]}
      onClick={removable ? null : onClick}
      {...props}
    >
      {loading && (
        <Spinner
          color={col}
          size={size === 'large' ? 15 : 13}
          marginRight="xsmall"
        />
      )}
      {icon && (
        <icon.type
          size={size === 'large' ? 15 : 13}
          marginRight="xsmall"
          color={col}
        />
      )}
      <Flex
        body2
        color={col}
        fontSize={size === 'small' ? 12 : 14}
        fontWeight={size === 'small' ? 400 : 600}
        lineHeight={size === 'small' ? '16px' : '20px'}
        height={size === 'small' ? '16px' : '20px'}
        gap={4}
      >
        {children}
        {removable && onClick && (
          <CloseIcon
            alignSelf="center"
            onClick={onClick}
            width={16}
            height={16}
            size={size === 'small' ? 8 : 10}
            cursor="pointer"
          />
        )}
      </Flex>
    </Card>
  )
}

const Chip = forwardRef(ChipRef)

Chip.propTypes = propTypes

export default Chip
