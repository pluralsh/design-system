import { Div, DivProps, Flex, Img, P } from 'honorable'
import PropTypes from 'prop-types'
import { Ref, forwardRef } from 'react'

import Tag from './Tag'

type RepositoryCardProps = DivProps & {
  title?: string
  publisher?: string
  description?: string
  imageUrl?: string
  tags?: string[]
}

const propTypes = {
  title: PropTypes.string,
  publisher: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}

function RepositoryCardRef({
  title,
  publisher,
  description,
  imageUrl,
  tags = [],
  ...props
}: RepositoryCardProps,
ref: Ref<any>
) {
  return (
    <Div
      ref={ref}
      p={1}
      borderRadius="large"
      border="1px solid border"
      backgroundColor="fill-one"
      cursor="pointer"
      _hover={{
        backgroundColor: 'fill-one-hover',
      }}
      {...props}
    >
      <Flex>
        <Img
          src={imageUrl}
          alt="Logo"
          width={50}
          height={50}
          borderRadius={4}
          objectFit="cover"
        />
        <Div ml={1}>
          <P
            body0
            fontWeight="bold"
          >
            {title}
          </P>
          <P color="text-xlight">
            {publisher}
          </P>
        </Div>
      </Flex>
      <P
        mt={0.5}
        color="text-light"
      >
        {description}
      </P>
      <Div mt={0.5}>
        {tags.map(tag => (
          <Tag
            key={tag}
            mr={0.5}
            backgroundColor="fill-two"
          >
            {tag}
          </Tag>
        ))}
      </Div>
    </Div>
  )
}

const RepositoryCard = forwardRef(RepositoryCardRef)

RepositoryCard.propTypes = propTypes

export default RepositoryCard
