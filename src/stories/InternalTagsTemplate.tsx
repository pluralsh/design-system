import { Flex } from 'honorable'
import { type ComponentProps, type Key, useMemo, useState } from 'react'
import Fuse from 'fuse.js'

import isEmpty from 'lodash-es/isEmpty'

import { isEqual, uniqWith } from 'lodash-es'

import { Card, Chip, ComboBox, ListBoxItem, TagIcon, WrapWithIf } from '..'

import { isNonNullable } from '../utils/isNonNullable'

import { ChipList, TagPicker } from './ComboBox.stories'

type Tag = {
  name: string
  value: string
}

const TAGS: Tag[] = [
  { name: 'local', value: 'true' },
  { name: 'local', value: 'false' },
  { name: 'stage', value: 'dev' },
  { name: 'stage', value: 'prod' },
  { name: 'stage', value: 'canary' },
  { name: 'route', value: 'some-very-very-long-tag-value' },
  { name: 'route', value: 'short-name' },
]
const tags = uniqWith(TAGS, isEqual)

function tagToKey(tag: Tag) {
  return `${tag.name}:${tag.value}`
}
function keyToTag(key: Key) {
  const split = `${key}`.split(':')

  return { name: split[0], value: split[1] }
}

export function InternalTagsTemplate({
  onFillLevel,
  withTitleContent,
  ...args
}: {
  onFillLevel: any
  withTitleContent: boolean
}) {
  const [selectedTagKeys, setSelectedTagKeys] = useState(new Set<Key>())
  const selectedTags = useMemo(
    () => [...selectedTagKeys].map(keyToTag),
    [selectedTagKeys]
  )
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const fuse = useMemo(
    () =>
      new Fuse(tags, {
        includeScore: true,
        shouldSort: true,
        threshold: 0.3,
        keys: ['name', 'value'],
      }),
    []
  )

  const searchResults = useMemo(() => {
    let ret: Fuse.FuseResult<Tag>[]

    if (inputValue) {
      ret = fuse.search(inputValue)
    } else {
      ret = tags.map((tag, i) => ({ item: tag, score: 1, refIndex: i }))
      console.log('ret', ret)
    }

    return ret.filter((tag) => !selectedTagKeys.has(tagToKey(tag.item)))
  }, [fuse, inputValue, selectedTagKeys])

  console.log('tags', tags)
  console.log('searchResults', searchResults)

  const onSelectionChange: ComponentProps<
    typeof ComboBox
  >['onSelectionChange'] = (key) => {
    if (key) {
      setSelectedTagKeys(new Set([...selectedTagKeys, key]))
      setInputValue('')
    }
  }

  const onInputChange: ComponentProps<typeof ComboBox>['onInputChange'] = (
    value
  ) => {
    setInputValue(value)
  }

  return (
    <WrapWithIf
      condition={onFillLevel > 0}
      wrapper={
        <Card
          display="flex"
          flexDirection="column"
          gap="large"
          padding="large"
          fillLevel={onFillLevel}
        />
      }
    >
      <Flex
        flexDirection="column"
        gap="large"
        maxWidth={512}
      >
        <TagPicker>
          <ComboBox
            isOpen={isOpen}
            inputValue={inputValue}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
            inputProps={{
              placeholder: 'Pick something',
            }}
            onOpenChange={(isOpen, _trigger) => {
              setIsOpen(isOpen)
            }}
            maxHeight={232}
            allowsEmptyCollection
            {...(withTitleContent
              ? {
                  titleContent: (
                    <>
                      <TagIcon marginRight="small" />
                      Tags
                    </>
                  ),
                }
              : {})}
            {...args}
          >
            {searchResults
              .map(({ item: tag, score: _score, refIndex: _refIndex }) => {
                const tagStr = tagToKey(tag)

                if (selectedTagKeys.has(tagStr)) {
                  return null
                }

                return (
                  <ListBoxItem
                    key={tagStr}
                    label={
                      <Chip
                        size="small"
                        label={tagStr}
                        textValue={tagStr}
                      >
                        {tagStr}
                      </Chip>
                    }
                    textValue={tagStr}
                  />
                )
              })
              .filter(isNonNullable)}
          </ComboBox>
          {!isEmpty(selectedTags) && (
            <ChipList
              maxVisible={Infinity}
              chips={[...selectedTagKeys].map((key) => (
                <Chip
                  size="small"
                  clickable
                  onClick={() => {
                    const newKeys = new Set(selectedTagKeys)

                    newKeys.delete(key)
                    setSelectedTagKeys(newKeys)
                  }}
                  closeButton
                >
                  {key}
                </Chip>
              ))}
            />
          )}
        </TagPicker>
      </Flex>
    </WrapWithIf>
  )
}
