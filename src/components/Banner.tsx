import {
  ReactNode,
  Ref,
  forwardRef,
  useMemo,
} from 'react'
import {
  Div,
  Flex,
  FlexProps,
  Span,
  SpanProps,
} from 'honorable'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ColorKey, Severity } from '../types'

import { FillLevelProvider } from './contexts/FillLevelContext'
import ErrorIcon from './icons/ErrorIcon'
import CloseIcon from './icons/CloseIcon'
import InfoIcon from './icons/InfoIcon'
import WarningIcon from './icons/WarningIcon'
import CheckRoundedIcon from './icons/CheckRoundedIcon'
import createIcon from './icons/createIcon'
import IconFrame from './IconFrame'

const SEVERITIES = ['info', 'error', 'warning', 'success', 'danger'] as const

type BannerSeverity = Extract<Severity, typeof SEVERITIES[number]>
const DEFAULT_SEVERITY: BannerSeverity = 'success'

type BannerProps = FlexProps & {
  severity?: Severity
  heading?: ReactNode
  action?: ReactNode
  actionProps?: SpanProps
  fullWidth?: boolean
  onClose?: () => void
}

const severityToIconColorKey: Readonly<Record<BannerSeverity, ColorKey>> = {
  info: 'icon-info',
  error: 'icon-danger',
  danger: 'icon-danger',
  warning: 'icon-warning',
  success: 'icon-success',
}

const severityToBorderColorKey: Record<BannerSeverity, ColorKey> = {
  info: 'border-info',
  error: 'border-danger',
  danger: 'border-danger',
  warning: 'border-warning',
  success: 'border-success',
}

const severityToIcon: Record<BannerSeverity, ReturnType<typeof createIcon>> = {
  info: InfoIcon,
  error: ErrorIcon,
  danger: ErrorIcon,
  warning: WarningIcon,
  success: CheckRoundedIcon,
}

const BannerOuter = styled.div<{
  $borderColorKey: ColorKey
  $fullWidth?: boolean
}>(({ $borderColorKey, $fullWidth, theme }) => ({
  display: 'inline-flex',
  align: 'flex-start',
  padding: theme.spacing.medium,
  backgroundColor: theme.colors['fill-three'],
  borderRadius: theme.borderRadiuses.medium,
  borderLeft: `4px solid ${theme.colors[$borderColorKey]}`,
  maxWidth: $fullWidth ? undefined : 480,
  width: $fullWidth ? '100%' : undefined,
}))

const BannerInner = styled.div(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing.xxsmall,
  paddingBottom: theme.spacing.xxsmall,
  alignItems: 'flex-start',
}))

const IconWrap = styled.div(_ => ({
  display: 'flex',
  paddingTop: 2,
  paddingBottom: 2,
}))

const Heading = styled.div<{ $bold: boolean }>(({ $bold, theme }) => ({
  ...theme.partials.text.body1,
  ...($bold ? theme.partials.text.bodyBold : {}),
  color: theme.colors.text,
}))

const BannerAction = styled(Span)(({ theme }) => ({
  marginLeft: theme.spacing.small,
  '&, & a, & a:any-link': {
    ...theme.partials.text.inlineLink,
    ...theme.partials.text.bodyBold,
  },
}))

const Content = styled.p<{ $hasHeading: boolean }>(({ $hasHeading: $heading, theme }) => ({
  ...theme.partials.text.body2LooseLineHeight,
  marginTop: $heading ? theme.spacing.xxsmall : theme.spacing.xxxsmall,
  marginBottom: 0,
  color: theme.colors['text-light'],
  '& a, & a:any-link': {
    ...theme.partials.text.inlineLink,
  },
}))

const CloseButton = styled(IconFrame).attrs({
  size: 'medium',
  clickable: true,
  icon: <CloseIcon />,
})(({ theme }) => ({
  marginLeft: theme.spacing.medium,
}))

function BannerRef({
  heading,
  action,
  actionProps,
  children,
  severity = 'success',
  fullWidth = false,
  onClose,
  ...props
}: BannerProps,
ref: Ref<any>) {
  severity = useMemo(() => {
    if (!severityToIcon[severity]) {
      console.warn(`Banner: Incorrect severity (${severity}) specified. Valid values are ${SEVERITIES.map(s => `"${s}"`).join(', ')}. Defaulting to "${DEFAULT_SEVERITY}".`)

      return DEFAULT_SEVERITY
    }

    return severity
  }, [severity])

  const BannerIcon = severityToIcon[severity]
  const iconColorKey = severityToIconColorKey[severity]
  const borderColorKey = severityToBorderColorKey[severity]

  const content = (
    <BannerOuter
      ref={ref}
      $borderColorKey={borderColorKey}
      $fullWidth={fullWidth}
      as={Flex}
      {...props}
    >
      <BannerInner>
        <IconWrap>
          <BannerIcon
            size={20}
            color={iconColorKey}
            marginRight="medium"
          />
        </IconWrap>
        <div>
          {heading && (
            <Heading $bold={!!children}>
              {heading}
              {action && (
                <BannerAction {...actionProps}>{action}</BannerAction>
              )}
            </Heading>
          )}
          {children && <Content $hasHeading={!!heading}>{children}</Content>}
        </div>
      </BannerInner>
      <Div flexGrow={1} />
      {typeof onClose === 'function' && (
        <CloseButton onClick={onClose} />
      )}
    </BannerOuter>
  )

  return <FillLevelProvider value={3}>{content}</FillLevelProvider>
}

const Banner = forwardRef(BannerRef)

Banner.propTypes = {
  severity: PropTypes.oneOf(SEVERITIES),
  onClose: PropTypes.func,
}

export default Banner
