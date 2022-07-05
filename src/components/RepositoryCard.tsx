import { Div, DivProps, Flex, H2, H3, Img, P } from 'honorable'
import PropTypes from 'prop-types'
import { Ref, forwardRef } from 'react'

import PadlockLockedIcon from './icons/PadlockLockedIcon'

import Tag from './Tag'

type RepositoryCardProps = DivProps & {
  title?: string
  publisher?: string
  priv?: boolean
  description?: string
  imageUrl?: string
  tags?: string[]
}

const propTypes = {
  title: PropTypes.string,
  publisher: PropTypes.string,
  priv: PropTypes.bool,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}

function RepositoryCardRef({
  title,
  publisher,
  priv,
  description,
  imageUrl,
  tags = [],
  ...props
}: RepositoryCardProps,
ref: Ref<any>
) {
  return (
    <Flex
      ref={ref}
      direction="column"
      padding="medium"
      borderRadius="large"
      border="1px solid border"
      backgroundColor="fill-one"
      cursor="pointer"
      _hover={{
        backgroundColor: 'fill-one-hover',
      }}
      {...props}
    >
      <Flex align="center">
        <Img
          src={imageUrl}
          alt="Logo"
          width={56}
          height={56}
          borderRadius="medium"
          objectFit="cover"
        />
        <Flex
          direction="column"
          marginLeft="small"
          width="100%"
        >
          <Flex
            width="100%"
            direction="row"
            justifyContent="space-between"
          >
            <H2
              subtitle2
              color="text"
            >
              {title}

            </H2>
            {!!priv && (
              <PadlockLockedIcon paddingRight="small" />
            )}
          </Flex>
          <H3
            body2
            color="text-xlight"
          >
            {publisher}
          </H3>
        </Flex>
      </Flex>
      {description && (
        <P
          body2
          marginTop="xsmall"
          color="text-light"
        >
          {description}
        </P>
      )}
      <Div flexGrow={1} />
      {tags && tags.length > 0 && (
        <Flex
          marginTop="xsmall"
          gap="xsmall"
          flexWrap="wrap"
        >
          {tags.map(tag => (
            <Tag
              key={tag}
              _last={{ marginRight: 0 }}
              backgroundColor="fill-two"
            >
              {tag}
            </Tag>
          ))}
        </Flex>
      )}
    </Flex>
  )
}

const RepositoryCard = forwardRef(RepositoryCardRef)

RepositoryCard.propTypes = propTypes

export default RepositoryCard
