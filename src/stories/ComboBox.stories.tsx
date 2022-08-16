import { Flex } from 'honorable'
import {
  ComponentProps, Key, useMemo, useState,
} from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import {
  Chip,
  ComboBox,
  IconFrame,
  ListBoxFooterPlus,
  ListBoxItem,
  ListBoxItemChipList,
  PersonIcon,
} from '../index'

export default {
  title: 'Combo Box',
  component: 'ComboBox',
}

const portrait = (
  <IconFrame
    spacing="none"
    size="xsmall"
    url="photo.png"
  />
)
const smallIcon = <PersonIcon size={16} />

const chipProps = {
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
    severity="error"
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

const items = [
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

const itemsByKey = items.reduce((obj, item) => ({ ...obj, [item.key]: item }),
  {})

const TagPicker = styled.div(({ theme }) => ({}))

function Template() {
  const shownStep = 4
  const [shownLimit, setShownLimit] = useState<number>(shownStep)
  const [isOpen, setIsOpen] = useState(false)

  const [selectedKeys, setSelectedKeys] = useState(new Set<Key>())
  const [inputValue, setInputValue] = useState('')
  const fuse = useMemo(() => new Fuse(items, {
    includeScore: true,
    shouldSort: true,
    threshold: 0.3,
    keys: ['label'],
  }),
  [])
  const searchResults = useMemo(() => {
    if (inputValue) {
      return fuse.search(inputValue)
    }

    return items.map((item, i) => ({ item, score: 1, refIndex: i }))
  }, [fuse, inputValue])

  const onSelectionChange: ComponentProps<
    typeof ComboBox
  >['onSelectionChange'] = key => {
    if (key) {
      setSelectedKeys(new Set([...selectedKeys, key]))
      setInputValue(null)
    }
  }

  const onInputChange: ComponentProps<typeof ComboBox>['onInputChange']
    = value => {
      setInputValue(value)
    }

  const onOpenChange: ComponentProps<typeof ComboBox>['onOpenChange'] = (isOpen,
    _menuTrigger) => {
    setIsOpen(isOpen)
  }

  const ChipList = styled(ListBoxItemChipList)(({ theme }) => ({
    marginTop: theme.spacing.small,
    justifyContent: 'start',
  }))

  return (
    <Flex
      flexDirection="column"
      gap="large"
      maxWidth={512}
    >
      <TagPicker>
        <ComboBox
          isOpen={isOpen}
          label="Pick something"
          onSelectionChange={onSelectionChange}
          onInputChange={onInputChange}
          onOpenChange={onOpenChange}
          inputValue={inputValue}
        >
          {searchResults.map(({ item, score: _score, refIndex: _refIndex }) => (
            <ListBoxItem
              key={item.key}
              label={item.label}
              leftContent={smallIcon}
              selected={selectedKeys.has(item.key)}
            />
          ))}
        </ComboBox>
        <ChipList
          maxVisible={Infinity}
          chips={[...selectedKeys].map(key => (
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
              {itemsByKey[key]?.label}
            </Chip>
          ))}
        />
      </TagPicker>
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {}
