import {
  ReactNode,
  Ref,
  forwardRef,
  useState,
} from 'react'
import {
  Div,
  Flex,
  FlexProps,
  Img,
  P,
} from 'honorable'
import PropTypes from 'prop-types'

import CheckRoundedIcon from './icons/CheckRoundedIcon'
import PlusIcon from './icons/PlusIcon'
import WrapWithIf from './WrapWithIf'
import Tooltip from './Tooltip'

type TagProps = FlexProps & {
  label: string
  imageUrl?: string
  checked?: boolean
  disabled? : boolean
  icon?: ReactNode
  tooltip?: string
}

const iconProps = {
  backgroundColor: 'fill-three',
  padding: 2,
  border: '1px solid border-input',
  borderRadius: 'medium',
  width: 24,
  height: 24,
}

function RepositoryChipRef({
  label,
  imageUrl = '',
  checked = false,
  disabled = false,
  icon = null,
  tooltip,
  ...props
}: TagProps, ref: Ref<any>) {
  const [hovered, setHovered] = useState(false)

  return (
    <WrapWithIf
      condition={!!tooltip}
      wrapper={<Tooltip label={tooltip} />}
    >
      <Flex
        ref={ref}
        padding="xsmall"
        align="center"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
        borderRadius="large"
        border={`1px solid ${checked ? 'border-outline-focused' : 'border-fill-two'}`}
        backgroundColor="fill-two"
        _hover={disabled ? {} : { backgroundColor: 'fill-two-hover' }}
        transition="background-color 200ms ease"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whiteSpace="nowrap"
        {...props}
      >
        {icon ? (
          <Flex
            align="center"
            justify="center"
            {...iconProps}
          >
            {icon}
          </Flex>
        ) : imageUrl ? (
          <Img
            src={imageUrl}
            objectPosition="center"
            {...iconProps}
          />
        ) : null}
        <P
          body2
          marginLeft="medium"
        >
          {label}
        </P>
        <Div flexGrow={1} />
        <CheckRoundedIcon
          color="border-outline-focused"
          visibility={checked ? 'visible' : 'hidden'}
          marginLeft="medium"
        />
        <PlusIcon
          color="text-light"
          display={hovered && !checked && !disabled ? 'visible' : 'none'}
          marginLeft="medium"
          height={16}
        />
      </Flex>
    </WrapWithIf>
  )
}

const RepositoryChip = forwardRef(RepositoryChipRef)

export default RepositoryChip
