import { type Ref, forwardRef } from 'react'
import { useTheme } from 'styled-components'

import { PrQueueIcon } from '../icons'

import Chip from './Chip'
import Card, { type CardProps } from './Card'
import AppIcon from './AppIcon'
import Flex from './Flex'

type CatalogCardProps = CardProps & {
  name?: string
  author?: string
  category?: string
  description?: string
  imageUrl?: string
  tags?: string[]
}

function RepositoryCardRef(
  {
    name,
    author,
    category,
    description,
    imageUrl,
    tags = [],
    ...props
  }: CatalogCardProps,
  ref: Ref<any>
) {
  const maxTags = 3

  const theme = useTheme()

  return (
    <Card
      ref={ref}
      clickable
      style={{
        flexDirection: 'column',
        padding: theme.spacing.medium,
        maxWidth: 456,
        minWidth: 256,
        width: '100%',
      }}
      {...props}
    >
      <Flex
        height="100%"
        align="flex-start"
        gap="large"
      >
        <Flex
          flexGrow={1}
          direction="column"
          height="100%"
        >
          <Flex align="center">
            <AppIcon
              size="xxsmall"
              url={imageUrl}
              icon={<PrQueueIcon />}
            />
            <Flex
              direction="row"
              marginLeft={theme.spacing.small}
              width="100%"
              align="flex-start"
              justify="space-between"
            >
              <Flex direction="column">
                <div
                  style={{
                    ...theme.partials.text.body2Bold,
                    color: theme.colors.text,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    ...theme.partials.text.caption,
                    color: theme.colors['text-xlight'],
                  }}
                >
                  by {author}
                </div>
              </Flex>
            </Flex>
          </Flex>
          {description && (
            <p
              style={{
                ...theme.partials.text.body2,
                margin: 0,
                marginTop: theme.spacing.xsmall,
                color: theme.colors['text-light'],
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </p>
          )}
          <div style={{ flexGrow: 1 }} />
          {(category || tags?.length > 0) && (
            <Flex
              marginTop={theme.spacing.medium}
              gap="xsmall"
              flexWrap="wrap"
            >
              {!!category && <Chip size="small">{category}</Chip>}
              <div
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  gap: theme.spacing.xsmall,
                  justifyContent: 'end',
                }}
              >
                {tags
                  ?.filter((_x, i) => i < maxTags)
                  .map((tag) => (
                    <Chip
                      size="small"
                      key={tag}
                      _last={{ marginRight: 0 }}
                    >
                      {tag}
                    </Chip>
                  ))}
              </div>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

const RepositoryCard = forwardRef(RepositoryCardRef)

export default RepositoryCard
