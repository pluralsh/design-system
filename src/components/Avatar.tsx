import { Ref, forwardRef } from 'react'
import { Flex, FlexProps, Img, P } from 'honorable'
import PropTypes from 'prop-types'

type AvatarProps = FlexProps & {
  name?: string
  imageUrl?: string
  size?: number
}

const propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.number,
}

function extractInitials(name: string) {
  const words = name.split(' ')

  // Pick the first and last initials if any
  return words.map(word => word[0]).filter((_, i, a) => i === 0 || i === a.length - 1).join('').toUpperCase()
}

function AvatarRef({ name = '', imageUrl = '', size = 44, ...props }: AvatarProps, ref: Ref<any>) {
  function renderName() {
    return (
      <P
        body0
        fontWeight={500}
      >
        {extractInitials(name || '?')}
      </P>
    )
  }

  function renderImage() {
    return (
      <Img
        width="100%"
        height="100%"
        src={imageUrl}
        alt={name}
      />
    )
  }

  return (
    <Flex
      ref={ref}
      align="center"
      justify="center"
      backgroundColor={imageUrl ? 'transparent' : 'accent-blue'}
      flexShrink={0}
      width={size}
      height={size}
      borderRadius={4}
      overflow="hidden"
      userSelect="none"
      {...props}
    >
      {imageUrl ? renderImage() : renderName()}
    </Flex>
  )
}

const Avatar = forwardRef(AvatarRef)

Avatar.propTypes = propTypes

export default Avatar
