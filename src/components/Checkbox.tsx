import {
  MutableRefObject, forwardRef, memo, useState,
} from 'react'
import {
  Checkbox as HonorableCheckbox,
  CheckboxProps as HonorableCheckboxProps,
} from 'honorable'
import classNames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const HonorableCheckboxStyled = styled(HonorableCheckbox)<{ $small: boolean }>(({ theme }) => ({
  padding: 8,
  color: 'action-link-inactive',
  '> span': {
    backgroundColor: 'transparent',
    border: theme.borders.input,
  },
  ':hover': {
    color: 'text',
    '> span': {
      backgroundColor: 'action-input-hover',
      // border: theme.borders.input,
    },
  },
}))

const CheckboxIcon = memo(() => (
  <svg
    width="50%"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 1L4 7L1 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))

export type CheckboxProps = { small: boolean } & HonorableCheckboxProps

function Checkbox({ small, ...props }: CheckboxProps,
  ref: MutableRefObject<any>) {
  const [checked, setChecked] = useState<boolean>(!!props?.defaultChecked)

  return (
    <HonorableCheckboxStyled
      ref={ref || undefined}
      onChange={(e: any) => setChecked(!!e?.target?.checked)}
      className={classNames({ checked: checked || props.checked })}
      $small={small}
      icon={<CheckboxIcon />}
      {...props}
    />
  )
}

Checkbox.propTypes = {
  small: PropTypes.bool,
}

export default forwardRef(Checkbox)
