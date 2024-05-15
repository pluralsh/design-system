import { Flex } from 'honorable'
import { type ComponentProps, type Key, useMemo, useState } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import { isEqual, uniqWith } from 'lodash-es'

import {
  AppIcon,
  BrowseAppsIcon,
  Card,
  Chip,
  ComboBox,
  ListBoxFooterPlus,
  ListBoxItem,
  ListBoxItemChipList,
  WrapWithIf,
} from '..'

import { ClusterTagsTemplate } from './ClusterTagsTemplate'
import TagMultiSelectTemplate from './TagMultiselectTemplate'

export default {
  title: 'Combo Box',
  component: 'ComboBox',
  argTypes: {
    onFillLevel: {
      options: [0, 1, 2, 3],
      control: {
        type: 'select',
        labels: {
          0: '0',
          1: '1',
          2: '2',
          3: "3 - Shouldn't be used",
        },
      },
    },
  },
}

const portrait = (
  <AppIcon
    spacing="none"
    size="xsmall"
    url="photo.png"
  />
)

const chipProps: ComponentProps<typeof Chip> = {
  size: 'small',
  hue: 'lighter',
}
const chips = [
  <Chip
    severity="success"
    {...chipProps}
  >
    Installed
  </Chip>,
  <Chip
    severity="neutral"
    {...chipProps}
  >
    Warm
  </Chip>,
  <Chip
    severity="neutral"
    {...chipProps}
  >
    Latest
  </Chip>,
  <Chip
    severity="warning"
    {...chipProps}
  >
    Additional
  </Chip>,
  <Chip
    severity="danger"
    {...chipProps}
  >
    Extra
  </Chip>,
  <Chip
    severity="info"
    {...chipProps}
  >
    Another
  </Chip>,
]

type Item = {
  key: string
  label?: string
  description?: string
  chips?: JSX.Element[]
  version?: string
}

const items: Item[] = [
  {
    key: 'ratatouille',
    label: 'Ratatouille',
    description: 'With ham and cheese',
    chips: chips.slice(0, 1),
    version: '0.2.24',
  },
  {
    key: 'pizza',
    label: 'Pizza',
    description: 'With ham and cheese',
    chips: chips.slice(1, 3),
    version: '0.2.25',
  },
  {
    key: 'sushi',
    label: 'Sushi',
    description: 'With ham and cheese',
    chips: null,
    version: '0.2.26',
  },
  {
    key: 'couscous',
    label: 'Couscous',
    description: 'With ham and cheese',
    chips: chips.slice(4),
    version: '0.3.00',
  },
  {
    key: 'dim-sum',
    label: 'Dim sum',
    description: 'With ham and cheese',
    chips: chips.slice(4, 5),
    version: '0.3.01',
  },
  {
    key: 'hamburger',
    label: 'Hamburger',
    description: 'With ham and cheese',
    chips: [chips[0], chips[3], chips[5]],
    version: '0.3.02',
  },
  {
    key: 'fried-chicken',
    label: 'Fried chicken',
    description: 'With ham and cheese',
    chips: [chips[5], chips[0]],
    version: '0.3.05',
  },
  {
    key: 'taco',
    label: 'Taco',
    description: 'With ham and cheese',
    chips: chips.slice(0),
    version: '0.3.12',
  },
  {
    key: 'empanada',
    label: 'Empanada',
    description: 'With ham and cheese',
    chips: chips.slice(0).reverse(),
    version: '0.4.00',
  },
  {
    key: 'chow-mein',
    label: 'Chow mein',
    description: 'With ham and cheese',
    chips: chips.slice(5).reverse(),
    version: '0.4.01',
  },
]

const itemsByKey = items.reduce(
  (obj, item) => ({ ...obj, [item.key]: item }),
  {}
)
const itemKeys = items.map((item) => item.key)

const TagPicker = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.small,
}))

const ChipList = styled(ListBoxItemChipList)(({ theme: _ }) => ({
  justifyContent: 'start',
}))

function Template({
  onFillLevel,
  withTitleContent,
  ...args
}: {
  onFillLevel: any
  withTitleContent: boolean
}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set<Key>())
  const [inputValue, setInputValue] = useState('')

  const filteredItems = items.filter((item) => !selectedKeys.has(item.key))

  const fuse = useMemo(
    () =>
      new Fuse(filteredItems, {
        includeScore: true,
        shouldSort: true,
        threshold: 0.3,
        keys: ['label'],
      }),
    [filteredItems]
  )

  const searchResults = useMemo(() => {
    if (inputValue) {
      return fuse.search(inputValue)
    }

    return filteredItems.map((item, i) => ({ item, score: 1, refIndex: i }))
  }, [fuse, inputValue, filteredItems])

  const onSelectionChange: ComponentProps<
    typeof ComboBox
  >['onSelectionChange'] = (key) => {
    if (key) {
      setSelectedKeys(new Set([...selectedKeys, key]))
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
            inputValue={inputValue}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
            inputProps={{
              placeholder: 'Pick something',
            }}
            {...(withTitleContent
              ? {
                  titleContent: (
                    <>
                      <BrowseAppsIcon marginRight="small" />
                      Marketplace
                    </>
                  ),
                }
              : {})}
            {...args}
          >
            {searchResults.map(
              ({ item, score: _score, refIndex: _refIndex }) => (
                <ListBoxItem
                  key={item.key}
                  label={item.label}
                  textValue={`${item.label} – ${item.description}`}
                  description={item.description}
                  leftContent={portrait}
                  selected={selectedKeys.has(item.key)}
                />
              )
            )}
          </ComboBox>
          {!(selectedKeys.size === 0) && (
            <ChipList
              maxVisible={Infinity}
              chips={[...selectedKeys].map((key) => (
                <Chip
                  size="small"
                  clickable
                  onClick={() => {
                    const newKeys = new Set(selectedKeys)

                    newKeys.delete(key)
                    setSelectedKeys(newKeys)
                  }}
                  closeButton
                >
                  {(itemsByKey as any)[key]?.label}
                </Chip>
              ))}
            />
          )}
        </TagPicker>
      </Flex>
    </WrapWithIf>
  )
}

function TagsTemplate({
  onFillLevel,
  withTitleContent,
  ...args
}: {
  onFillLevel: any
  withTitleContent: boolean
}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set<Key>())
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const allItems = [...items]

  for (let key of selectedKeys) {
    if (typeof key === 'number') {
      key = String(key)
    }
    if (!(itemsByKey as any)[key]) {
      allItems.push({ key })
    }
  }

  const filteredItems = allItems.filter((item) => !selectedKeys.has(item.key))
  const allKeys = new Set([...selectedKeys, ...itemKeys])

  const fuse = useMemo(
    () =>
      new Fuse(filteredItems, {
        includeScore: true,
        shouldSort: true,
        threshold: 0.3,
        keys: ['key'],
      }),
    [filteredItems]
  )

  const searchResults = useMemo(() => {
    if (inputValue) {
      return fuse.search(inputValue)
    }

    return filteredItems.map((item, i) => ({ item, score: 1, refIndex: i }))
  }, [fuse, inputValue, filteredItems])

  const onSelectionChange: ComponentProps<
    typeof ComboBox
  >['onSelectionChange'] = (key) => {
    if (key) {
      setSelectedKeys(new Set([...selectedKeys, key]))
      setInputValue('')
    }
  }

  const onInputChange: ComponentProps<typeof ComboBox>['onInputChange'] = (
    value
  ) => {
    setInputValue(value)
  }

  let newKey = inputValue
    .toLowerCase()
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^a-z-]/g, '')

  if (allKeys.has(newKey)) {
    newKey = null
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
            onFooterClick={() => {
              setSelectedKeys(new Set([...selectedKeys, newKey]))
              setInputValue('')
              setIsOpen(false)
            }}
            onInputChange={onInputChange}
            inputProps={{ placeholder: 'Pick something' }}
            onOpenChange={(isOpen, _trigger) => {
              setIsOpen(isOpen)
            }}
            dropdownFooter={
              newKey ? (
                <ListBoxFooterPlus>
                  Create new tag, '{newKey}'
                </ListBoxFooterPlus>
              ) : undefined
            }
            maxHeight={232}
            allowsEmptyCollection={!!newKey}
            {...(withTitleContent
              ? {
                  titleContent: (
                    <>
                      <BrowseAppsIcon marginRight="small" />
                      Marketplace
                    </>
                  ),
                }
              : {})}
            {...args}
          >
            {searchResults.map(
              ({ item, score: _score, refIndex: _refIndex }) => (
                <ListBoxItem
                  key={item.key}
                  label={item.key}
                  textValue={`${item.key}`}
                  selected={selectedKeys.has(item.key)}
                />
              )
            )}
          </ComboBox>
          {!(selectedKeys.size === 0) && (
            <ChipList
              maxVisible={Infinity}
              chips={[...selectedKeys].map((key) => (
                <Chip
                  size="small"
                  clickable
                  onClick={() => {
                    const newKeys = new Set(selectedKeys)

                    newKeys.delete(key)
                    setSelectedKeys(newKeys)
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

export const Default = Template.bind({})

Default.args = {
  loading: false,
  withTitleContent: false,
}

export const Tags = TagsTemplate.bind({})
Tags.args = {
  loading: false,
  withTitleContent: false,
}

export const ClusterTags = ClusterTagsTemplate.bind({})
ClusterTags.args = {
  loading: false,
  withTitleContent: false,
}

const TAGS = [
  { name: 'local', value: 'true' },
  { name: 'local', value: 'false' },
  { name: 'stage', value: 'dev' },
  { name: 'stage', value: 'prod' },
  { name: 'stage', value: 'canary' },
  { name: 'route', value: 'some-very-very-long-tag-value' },
  { name: 'route', value: 'short-name' },
  { name: 'local2', value: 'true' },
  { name: 'local2', value: 'false' },
  { name: 'stage2', value: 'dev' },
  { name: 'stage2', value: 'prod' },
  { name: 'stage2', value: 'canary' },
  { name: 'route2', value: 'some-very-very-long-tag-value' },
  { name: 'route2', value: 'short-name' },
]
const tags = uniqWith(TAGS, isEqual)

export const TagMultiSelect = TagMultiSelectTemplate.bind({})
TagMultiSelect.args = {
  loading: false,
  options: tags.map((tag) => `${tag.name}:${tag.value}`),
  width: 100,
  onSelectedTagsChange: (keys: Set<Key>) => {
    console.log('Selected keys:', keys)
  },
  onFilterChange: (filter: string) => {
    console.log('Filter:', filter)
  },
  onChangeMatchType: (matchType: 'AND' | 'OR') => {
    console.log('Match type: ', matchType)
  },
}
