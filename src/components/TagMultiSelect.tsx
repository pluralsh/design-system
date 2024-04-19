import { Flex } from 'honorable'
import {
  type ComponentProps,
  type Key,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Fuse from 'fuse.js'

import { useTheme } from 'styled-components'

import { Chip, ComboBox, ListBoxItem, Select, SelectButton } from '..'

import { isNonNullable } from '../utils/isNonNullable'

export type MultiSelectTag = {
  name: string
  value: string
}

function tagToKey(tag: MultiSelectTag) {
  return `${tag.name}:${tag.value}`
}
const matchOptions = [
  { label: 'All', value: 'AND' },
  { label: 'Any', value: 'OR' },
]

export function TagMultiSelect({
  tags,
  loading,
  onChange,
}: {
  tags: MultiSelectTag[]
  loading: boolean
  onChange?: (keys: Set<Key>) => void
}) {
  const theme = useTheme()
  const [selectedTagKeys, setSelectedTagKeys] = useState(new Set<Key>())
  const selectedTagArr = useMemo(() => [...selectedTagKeys], [selectedTagKeys])
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [searchLogic, setSearchLogic] = useState<string>(matchOptions[0].value)

  const fuse = useMemo(
    () =>
      new Fuse(tags, {
        includeScore: true,
        shouldSort: true,
        threshold: 0.3,
        keys: ['name', 'value'],
      }),
    [tags]
  )

  const searchResults = useMemo(() => {
    let ret: Fuse.FuseResult<MultiSelectTag>[]

    if (inputValue) {
      ret = fuse.search(inputValue)
    } else {
      ret = tags.map((tag, i) => ({ item: tag, score: 1, refIndex: i }))
    }

    return ret.filter((tag) => !selectedTagKeys.has(tagToKey(tag.item)))
  }, [fuse, inputValue, selectedTagKeys, tags])

  const onSelectionChange: ComponentProps<
    typeof ComboBox
  >['onSelectionChange'] = (key) => {
    if (key) {
      setSelectedTagKeys(new Set([...selectedTagArr, key]))
      setInputValue('')
    }
  }

  useEffect(() => {
    onChange?.(selectedTagKeys)
  }, [selectedTagKeys, onChange])

  const onInputChange: ComponentProps<typeof ComboBox>['onInputChange'] = (
    value
  ) => {
    setInputValue(value)
  }

  return (
    <Flex
      flexDirection="row"
      width="100%"
    >
      <Select
        label="Pick search logic"
        selectedKey={searchLogic}
        onSelectionChange={(key: string) => {
          setSearchLogic(key)
        }}
        defaultOpen={false}
        triggerButton={
          <SelectButton
            css={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRight: `none`,
              width: '150px',
            }}
          >
            Match {matchOptions.find((el) => el.value === searchLogic).label}
          </SelectButton>
        }
      >
        {matchOptions.map(({ value, label }) => (
          <ListBoxItem
            key={value}
            label={label}
            textValue={label}
          />
        ))}
      </Select>
      <ComboBox
        isOpen={isOpen}
        startIcon={null}
        inputValue={inputValue}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
        chips={selectedTagArr.map((key) => ({
          key,
          children: key,
        }))}
        onDeleteChip={(chipKey) => {
          const newKeys = new Set(selectedTagKeys)

          newKeys.delete(chipKey)
          setSelectedTagKeys(newKeys)
        }}
        inputProps={{
          placeholder: 'Search Tags...',
          style: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: theme.colors['fill-one'],
          },
        }}
        onOpenChange={(isOpen, _trigger) => {
          setIsOpen(isOpen)
        }}
        maxHeight={232}
        allowsEmptyCollection
        loading={loading}
        containerProps={{ style: { flexGrow: 1 } }}
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
    </Flex>
  )
}
