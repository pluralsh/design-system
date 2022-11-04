import classNames from 'classnames'
import { Radio as HonorableRadio, RadioProps as HonorableRadioProps } from 'honorable'
import {
  MutableRefObject, forwardRef, memo, useState,
} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const HonorableRadioStyled = styled(HonorableRadio)<{
  $small: boolean
}>(({ $small, theme }) => ({
  padding: theme.spacing.xsmall,
  color: theme.colors['action-link-inactive'],
  '> span': {
    border: theme.borders.input,
    width: $small ? theme.spacing.medium : theme.spacing.large,
    height: $small ? theme.spacing.medium : theme.spacing.large,
    borderRadius: '50%',
  },
  '*': {
    fill: theme.colors['action-primary'],
  },
  ':hover': {
    color: 'text',
    '> span': {
      backgroundColor: theme.colors['action-input-hover'],
    },
    '& *': {
      fill: theme.colors['action-primary-hover'],
    },
  },
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    '> span': {
      ...theme.partials.focus.outline,
    },
    '*': {
      fill: theme.colors['action-primary-hover'],
    },
  },
  '&.checked': {
    color: theme.colors.text,
    '&:not(:focus-visible) > span': {
      borderColor: theme.colors['border-selected'],
    },
  },
}))

const RadioCheckIcon = memo(({ small }: { small: boolean }) => {
  const checkWidth = small ? 10 : 16
  const checkRadius = checkWidth / 2

  return (
    <svg
      width={checkWidth}
      viewBox={`0 0 ${checkWidth} ${checkWidth}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={checkRadius}
        cy={checkRadius}
        r={checkRadius}
      />
    </svg>
  )
})

export type RadioProps = { small: boolean } & HonorableRadioProps

function Radio({ small, ...props }:RadioProps, ref:MutableRefObject<any>) {
  const [checked, setChecked] = useState<boolean>(!!props?.defaultChecked)

  return (
    <HonorableRadioStyled
      ref={ref}
      onChange={(e: any) => setChecked(!!e?.target?.checked)}
      className={classNames({ checked: checked || props.checked })}
      $small={small}
      iconChecked={<RadioCheckIcon small={small} />}
      iconUnchecked={null}
      {...props}
    />
  )
}

Radio.propTypes = {
  small: PropTypes.bool,
}

export default forwardRef(Radio)
