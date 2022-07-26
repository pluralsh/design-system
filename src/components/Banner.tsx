import { ReactNode, Ref, forwardRef } from 'react'
import {
  Div, Flex, FlexProps, H1, P, Span, SpanProps,
} from 'honorable'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'

import StatusOkIcon from './icons/StatusOkIcon'
import ErrorIcon from './icons/ErrorIcon'
import CloseIcon from './icons/CloseIcon'

const BannerAction = styled(Span)`
  margin-left: 12px;
  &,
  & a,
  & a:any-link {
    font-weight: 500;
    color: #8fb4ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

type BannerProps = FlexProps & {
  severity?: 'success' | 'error' | 'info' | string
  heading?: ReactNode
  action?: ReactNode
  actionProps: SpanProps
  onClose?: () => void
}

const propTypes = {
  severity: PropTypes.oneOf(['success', 'error', 'info']),
  onClose: PropTypes.func,
}

const severityToColor = {
  success: 'icon-success',
  error: 'icon-error',
  info: 'text-primary-accent',
}

const severityToIcon = {
  success: StatusOkIcon,
  error: ErrorIcon,
  info: ErrorIcon,
}

function BannerRef({
  heading,
  action,
  actionProps,
  children,
  severity = 'success',
  onClose,
  ...props
}: BannerProps,
ref: Ref<any>) {
  const BannerIcon = severityToIcon[severity] || severityToIcon.success
  const color = severityToColor[severity] || severityToColor.success

  function handleClose() {
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  return (
    <Flex
      ref={ref}
      display="inline-flex"
      align="flex-start"
      padding="medium"
      backgroundColor="fill-two"
      borderRadius="medium"
      borderTop={`4px solid ${color}`}
      maxWidth={480}
      {...props}
    >
      <Flex
        paddingTop="xxsmall"
        alignItems="flex-start"
      >
        <Flex paddingVertical={2}>
          <BannerIcon
            size={20}
            color={color}
            marginRight="medium"
          />
        </Flex>
        <Div>
          {heading && (
            <H1 body1>
              {[
                heading,
                action && (
                  <BannerAction {...actionProps}>{action}</BannerAction>
                ),
              ]}
            </H1>
          )}
          {children && (
            <P
              marginTop={heading ? 'xxsmall' : 'xxxsmall'}
              body2
              color="text-light"
            >
              {children}
            </P>
          )}
        </Div>
      </Flex>
      <Flex
        align="center"
        justify="center"
        flexShrink={0}
        width={32}
        height={32}
        marginLeft="medium"
        borderRadius="50%"
        cursor="pointer"
        _hover={{ backgroundColor: 'fill-two-hover' }}
        onClick={handleClose}
      >
        <CloseIcon size={12} />
      </Flex>
    </Flex>
  )
}

const Banner = forwardRef(BannerRef)

Banner.propTypes = propTypes

export default Banner
